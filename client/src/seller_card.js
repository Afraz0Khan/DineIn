import axios from 'axios';
import React, { Component, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import jwtDecode from 'jwt-decode';


function SellerCard(props){
    // takes in:
    // 1. Restaurant name (or heading) and address
    // 2. Restaurant rating
    // 3. Restaurant description (optional)
    // 4. Restaurant pic (not for now)

    // Displays:
    // 1. Reserve button 
    // 2. Dine in button

    const [willReserve, setWillReserve] = useState(false);
    const [reservation, setReservation] = useState({});


    async function OnDineIn(){
        const token = localStorage.getItem('token')
        const user = jwtDecode(token)
        const date = new window.Date();
        const reservationDate = date.toString()
        const reservationPost = await axios.post(`/api/seller/reserve/${props.customer_email}`, {
            resId: props.resId,
            time: reservationDate,
            email: user.email
        }).then((res) => {
            console.log(res)
        })
    }


    return(
        <div style={{marginLeft: '10px'}}>
            <h4>{props.heading}</h4>  
            <br />
            <div style={{display: 'flex'}}>
                <div style={{marginLeft: '20px', display: 'flex'}}>
                    <p>{props.address}</p>
                    {/* <p>{props.rating}</p> */}
                    <button onClick={OnDineIn}>Dine In</button>
                    <button>Reserve</button>
                </div>
            </div>
        </div>
    );
}


export default SellerCard;