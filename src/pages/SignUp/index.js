import React, { Component } from 'react';
import logo from "../../assets/logo.jpg";
import api from '../../services/api';

export default class User extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        error: ""
    };

    handleSignUp = async e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        if(!name || !email || !password){
            this.setState({ error: "Preencha todos os dados"});
        }else {
            try{
                const result = await api.post("/users", { name, email, password });
                this.props.history.push('/');
                console.log(result);
            } catch (err) {
                console.log(err);
                this.setState({ error: "Ocorreu erro ao registrar a conta" });
            }
        }
    }

  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSignUp}>
                <img src={logo} alt="logo" />
                <input
                    placeholder="Digite seu nome"
                    value={this.state.nexBox}
                    onChange={e => this.setState({ name: e.target.value })}
                />
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
