import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';



function ReservationCard(props){
    return(
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{props.resName}</Card.Title>
                    <Card.Text>{props.resAddress}</Card.Text>
                    <Card.Text>{props.time}</Card.Text>
                    <Button variant='primary'>Cancel</Button>
                </Card.Body>
            </Card>
        </div>
    );
}


function Reservation(){

    const [customerEmail, setCustomerEmail] = useState('');
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const decoded = jwtDecode(token)
        setCustomerEmail(decoded.email)
    }, [])

    useEffect(() => {
        async function getReservations(){
            await axios.get(`/api/users/${customerEmail}`)
            .then((res) => {
                setReservations([])
                const data = res.data.reservations
                data.forEach(element => {
                    setReservations(prev => [...prev, (
                        <ReservationCard 
                            resName={element.resName}
                            resAddress={element.resAddress}
                            time={element.time}
                        />
                    )])
                });
            })
        }
        if (customerEmail){
            getReservations()
        }

    }, [customerEmail])


    return(
        <div>
            <h1>Reservations:</h1>
            <br />
            {reservations || <h1>You have no reservations at this time</h1>}
        </div>
    );
}



export default Reservation;
