import axios from 'axios';
import React, { Component, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import jwtDecode from 'jwt-decode';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
        <Card>
            <Card.Body>
                <Card.Title>{props.heading}</Card.Title>
                <Card.Text>{props.address}</Card.Text>
                <Button variant='primary' onClick={OnDineIn}>Dine In</Button>
                <Button variant='primary'>Reserve</Button>
            </Card.Body>
        </Card>
    );
}


export default SellerCard;