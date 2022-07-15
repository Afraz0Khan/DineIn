import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      <Form onSubmit={registerUser}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Enter your email</Form.Label>
          <Form.Control type="email" placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' value='Login'>Login</Button>

      </Form>
    </div>
  );
}

export default Login;
