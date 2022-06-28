import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import LocationSearchInput from './placeComplete';



function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seller");
  const [resName, setResName] = useState("");
  const [resAddress, setResAddress] = useState(React.createRef());


  async function registerUser(e){
    e.preventDefault();
    if (role === 'seller'){     
      const restaurantAddress = resAddress.current
      console.log(restaurantAddress.state.address, resName, resAddress.current.state)
      const response = await axios.post('/api/users/register', 
        {
          name,
          email,
          password,
          resName,
          resAddress: resAddress.current.state.address,
          coordinates: {
            lng: resAddress.current.state.coords.lng,
            lat: resAddress.current.state.coords.lat
          },
          role
        }
      ).then(
        res => {
          console.log(res.data)
        }
      )
    } else if(role === 'customer'){
        const response = await axios.post('/api/users/register', {
          name, 
          email,
          password, 
          role
        }).then((res) => {
          console.log(res.data)
        })
    }
      
  }


  function registerRestaurant(){
    if (role === 'seller'){
      return(
        <div>
          <h4>Restaurant Name:</h4> <br />
          <input type='text' 
            placeholder='Restaurant Name'
            value={resName}
            onChange={(e) => setResName(e.target.value)}
          />
          <br />
          <LocationSearchInput ref={resAddress} />
        </div>
      );
    } 
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <input type="name" placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

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


        <input type='radio' value='customer' 
          checked={role === 'customer'}
          onChange={(e) => {
            setRole(e.target.value)
          }}
        />
        customer
        <br />

        <input type='radio' value='seller' 
          checked={role === 'seller'}
          onChange={(e) => {
            setRole(e.target.value)
          }}
        />
        seller
        <br />

        {registerRestaurant()}

        <input type='submit' value='Register' />
      </form>
    </div>
  );
}

export default Register;
