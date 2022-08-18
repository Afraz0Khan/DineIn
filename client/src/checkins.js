import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';


function CheckIns(){

    const [dineIns, setDineIns] = useState([]);

    
    const [requestReady, setRequestReady] = useState(false);
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
                    setRequestReady(true)
                    setDineIns([])
                }
            } else {
                navigate('/login')
            }
    }, [])


    useEffect(() => {
        console.log('here')
        
        if (requestReady && userEmail.length != 0){
            console.log('inside')
            
            UserData(userEmail)
            if (dineIns.length != 0){
                setRequestReady(false)
            }
        }
    }, [userEmail && dineIns])



    async function UserData(user_email){
        await axios.get(`/api/users/${user_email}`)
            .then((res) => {
                const info = res.data.reservations
                setDineIns([])
                info.forEach(item => {
                    setDineIns(arr => [...arr, (
                        <Person 
                            email = {item.email}
                            time = {item.time}
                        />
                    )])
                })
                console.log(dineIns)
        }) 
    }


    

    function Person(props){

        async function CheckIn(){
            await axios.post(`/api/seller/checkIn/${props.email}`, {
                resEmail: userEmail
            })
            .then((res) => {
                console.log(res)
            })
        }

        return(
            <div>
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
            <h3>Check-ins</h3>
            <br />
            {dineIns}
        </div>
    );
}





export default CheckIns;