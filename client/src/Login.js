import './App.css';
import React, { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser(e){
    e.preventDefault();
    const response = await axios.post('/api/users/login', 
      {
        email,
        password
      }
    ).then(
      res => {
        if (res.data.user){
            localStorage.setItem('token', res.data.user)
            alert('login successful')
            if (res.data.role === 'customer'){
              navigate('/dashboard')
            } else if (res.data.role === 'seller'){
              navigate('/seller_dashboard')
            } else {
              alert('could not find user role')
            }
            
        } else{
            alert('error')
        }
      }
    )
  }

  return (
    <div>
      <form onSubmit={registerUser}>

        <input type="email" placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />


        <input type="password" placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <input type='submit' value='Login' />

      </form>
    </div>
  );
}

export default Login;
