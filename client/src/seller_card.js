import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
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
    const [reservation, setReservation] = useState(new Date());
    const [resId, setResId] = useState(props.resId);



    function ReservationTaker(){
        if (willReserve){
            return(
                <div>
                    <DateTimePicker onChange={setReservation} value={reservation} />
                    <Button onClick={makeReservation()}>Reserve</Button>
                </div>
            );
        }
    }

    async function makeReservation(){
        await axios.post(`/api/seller/reserve/${props.customer_email}`, {
            resId: props.resId,
            time: reservation.toString(),
            type: 'reservation'
        }).then((res) => {
            console.log(res)
            setWillReserve(false)
        })
    }


    async function OnDineIn(){
        await axios.post(`/api/seller/reserve/${props.customer_email}`, {
            resId: props.resId,
            type: 'dineIn'
        })
        .then((res) => {
            console.log(res)
        })
    }


    return(
        <Card>
            <Card.Body>
                <Card.Title>{props.heading}</Card.Title>
                <Card.Text>{props.address}</Card.Text>
                <Button variant='primary' onClick={OnDineIn}>Dine In</Button>
                <Button variant='primary' onClick={() => {
                    setWillReserve(current => !current)
                }}>Reserve</Button>
            </Card.Body>
            <ReservationTaker />
        </Card>
    );
}


export default SellerCard;