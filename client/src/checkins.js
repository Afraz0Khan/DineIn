import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';


function CheckIns(){

    const [dineIns, setDineIns] = useState([]);
    const [GETready, setGETready] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {

        const token = localStorage.getItem('token')
            if (token){
                const user = jwtDecode(token)
                if (!user){
                    localStorage.removeItem('token')
                    navigate('/login')
                } else {
                    setUserEmail(user.email)
                    setGETready(true)
                }
            } else {
                navigate('/login')
            }
    }, [])



    useEffect(() => {
        async function UserData(user_email){
            const user_data = await axios.get(`/api/users/${user_email}`)
                .then((res) => {
                    const info = res.data.reservations
                    setDineIns(info)
                    console.log(dineIns)
                    // res.data.dineins: [{name: 'joe', email: 'joe@gmail.com', time: '6413684639'}, ]
            }) 
        }

        if (GETready){
            console.log('joe')
            UserData(userEmail)
            console.log('hoe')
        }    

    }, [GETready])

    function CheckIn(){
        return 
    }

    function Person(props){
        return(
            <div>
                <h3>{props.name}</h3>
                <br />
                <h4>{props.email}</h4>
                <br />
                <h5>time: {props.time}</h5>
                <br />
                <button onClick={CheckIn}>Check-in</button>
            </div>
        );
    }

    return(
        <div>
            <h3>hi</h3>
        </div>
    );
}



export default CheckIns;