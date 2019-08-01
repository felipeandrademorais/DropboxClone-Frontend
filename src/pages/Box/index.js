import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import api from '../../services/api';
import {distanceInWords} from 'date-fns';
import pt from 'date-fns/locale/pt';
import logo from "../../assets/logo.jpg";
import Dropzone from 'react-dropzone';
import "./styles.css";
import socket from "socket.io-client";
import {getUserId} from '../../services/auth';

export default class Box extends Component {
  state = { box: {}}

  async componentDidMount(){
    this.subscribeToNewFiles();
    const box = getUserId();
    const response = await api.get(`boxes/${box}`); 
    this.setState({ box: response.data });
  }

  subscribeToNewFiles = () => {
    const box = getUserId();

    try{

      const io = socket('http://localhost:3001');
      io.emit('connectRoom', box);
      io.on('file', data => {
        this.setState({ box: {... this.state.box, files: [data, ... this.state.box.files ] }});
      });

    } catch(err){
      console.log(err);
    }
    
  }

  handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const box = getUserId();

      data.append('file', file);
      api.post(`boxes/${box}/files`, data);
      this.subscribeToNewFiles();
    
    });
  };

  render() {
    return (
        <div id="box-container">
          <header>
              <img src={logo} alt="" />
              <h1>{this.state.box.title}</h1> 
          </header> 

          <Dropzone onDropAccepted={this.handleUpload}>
            {({getRootProps, getInputProps}) => (

              <div className="upload" {... getRootProps()}>
                <input {... getInputProps()} />

                <p>Arraste arquivos ou clique aqui</p>
              </div>

            )}
          </Dropzone>

          <ul>
            { this.state.box.files && this.state.box.files.map(file => (
                <li key={file._id}>
                <a className="fileInfo" href={file.url} target="_blank">
                  <MdInsertDriveFile size={24} color="#a5cfff" />
                  <strong>{file.title}</strong>
                </a>
  
                <span>há{""} {distanceInWords(file.createdAt, new Date(), {
                  locale: pt
                })}</span>
              </li>
            )) }
          </ul>   
        </div>
    );
  }
}
