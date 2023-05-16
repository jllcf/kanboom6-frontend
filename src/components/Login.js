import React, { useState } from 'react';
import logo from '../images/Wimv6FO - Imgur 1 (1).png';
import './Login.css';

import api from '../config/configApi';

function Login() {
  const [users, setDados] = useState({
    email: '',
    password: ''
  });

  const valorInput = e => setDados({...users, [e.target.name]: e.target.value});

  const loginSubmit = async e => {
    e.preventDefault();
    //enviar dados para API

    const headers = {
      'Content-Type': 'application/json'
    }
    
    await api.post("/login", users, {headers})
    .then((response) => {
      console.log(response);
    }).catch((err) => {
      newFunction();


      function newFunction() {
        console.log("Erro: tente novamente.");
      }
    });
  }

  return (
    <div className='container'>
        <img className='img' src={logo} alt='logo' />
        <h3>Log In</h3> 
        <div className='wrap-form'>
            <form className='form' onSubmit={loginSubmit}>
                <div>
                <input type='email' 
                name='email' 
                placeholder='e-mail' 
                onChange={valorInput} />
                </div>
                <div>
                <input type='text' 
                name='password' 
                placeholder='Senha' 
                onChange={valorInput} />
                </div>
                <div>
                <button className='button' type='submit'>Entrar</button>
                </div>
                <div>
                <button className='button' type='reset'>Limpar</button>
                </div>                
            </form>
        </div>              
    </div>
  );
}

export default Login;