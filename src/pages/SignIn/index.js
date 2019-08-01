import React, { Component } from 'react';
import logo from "../../assets/logo.jpg";
import api from '../../services/api';
import { login, saveUserId } from '../../services/auth';

import "./styles.css";

export default class Main extends Component {

  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    if(!email || !password){
      this.setState({ error: "Preencha o e-mail e a senha" });
    } else {
      try {
        const response = await api.post('sessions', { email, password });
        const user_id = response.data.user._id;
        saveUserId(user_id);
        login(response.data.token);  
        this.props.history.push(`/box/${user_id}`);
      
      } catch (err) {
        this.setState({ error: "Houve um problema com o login" });
      }
    }
  }

  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value });
  }

  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src={logo} alt="logo" />
                <input 
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={this.state.nexBox}
                    onChange={e => this.setState({ email: e.target.value })}
                />
                <input 
                    type="password"
                    placeholder="Digite sua senha"
                    value={this.state.nexBox}
                    onChange={e => this.setState({ password: e.target.value })}
                />
                <button type="submit">Criar</button>                
            </form>
        </div>
    );
  }
}
