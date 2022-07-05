import React from 'react';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router';
import axios from 'axios';



function DashBoard2(){

    const navigate = useNavigate();

    useEffect(
        () => {
            const token = localStorage.getItem('token')
            if (token){
                const user = jwtDecode(token)
                if (!user){
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            } else {
                navigate('/login')
            }
        }
    )

    function toCreate(){
        navigate('/menu')
    }

    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    return(
        <div>
            <h1>
                Welcome seller
            </h1>
            <br />
            <br />
            <button>View Menu</button>
            <br />
            <br />
            <button onClick={toCreate}>Edit Menu</button>
            <br />
            <br />
            <button>View Orders</button>
            <br />
            <br />
            <button onClick={() => {
                navigate('/checkins')
            }}>Check ins</button>
            <br />
            <br />
            
            <button onClick={LogOut}>Log Out</button>
        </div>
    );
}



export default DashBoard2;