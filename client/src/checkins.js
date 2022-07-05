import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';


function CheckIns(){

    const [currentDineIns, setCurrentDineIns] = useState([]);

    const navigate = useNavigate();

    useEffect( async () => {
        // auth cuz protected route
        
        const token = localStorage.getItem('token')
            if (token){
                const user = jwtDecode(token)
                if (!user){
                    localStorage.removeItem('token')
                    navigate('/login')
                } else {
                    const user = await axios.get(`/api/users/${user.email}`)
                        .then((res) => {
                            const info = res.data.dineins
                        })  
                }
            } else {
                navigate('/login')
            }
        const user = await axios.get('/api/users/')
    })

    return(
        <div>
            <h3>hi</h3>
        </div>
    );
}



export default CheckIns;