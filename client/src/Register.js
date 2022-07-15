import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import LocationSearchInput from './placeComplete';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control type='text' 
            placeholder='Restaurant Name'
            value={resName}
            onChange={(e) => setResName(e.target.value)}
          />
          <br />
          <Form.Label>Restaurant address</Form.Label>
          <LocationSearchInput ref={resAddress} />
        </div>
      );
    } 
  }

  return (
    <div>
      <Form onSubmit={registerUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            {/* <input type="name" placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> */}

            <br />
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            {/* <input type="email" placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <br />

            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            {/* <input type="password" placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <br />
            
            <Form.Label>Account type</Form.Label>
            <Form.Check type='radio' value='customer'
              label='Customer'
              checked={role === 'customer'}
              onChange={(e) => {
                setRole(e.target.value)
              }}
            />
            {/* <input type='radio' value='customer' 
              checked={role === 'customer'}
              onChange={(e) => {
                setRole(e.target.value)
              }}
            /> */}

            <Form.Check type='radio' value='seller'
              label='Seller'
              checked={role === 'seller'}
              onChange={(e) => {
                setRole(e.target.value)
              }}
            />
            {/* <input type='radio' value='seller' 
              checked={role === 'seller'}
              onChange={(e) => {
                setRole(e.target.value)
              }}
            /> */}
            
            <br />

            {registerRestaurant()}

            <Button type='submit'>Register</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Register;
