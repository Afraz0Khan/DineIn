import React, { useEffect, useState } from 'react';
import {useNavigate, useResolvedPath} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import LocationSearchInput from './placeComplete';
import axios from 'axios';
import SellerCard from './seller_card';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Slider from "react-slick";
import Form from 'react-bootstrap/Form';

// idea: maybe use react bootstrap to create a carousel of restaurant cards ordered by 
// different properties like "near you" or "popular" etc.
function DashBoard(){

    const [pageReady, setPageReady] = useState(false)
    const [userDataReady, setUserDataReady] = useState(false)
    const [customerEmail, setCustomerEmail] = useState('')

    const [userDbLocations, setUserDbLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(React.createRef());
    
    const [inLocation, setInLocation] = useState(false);
    const [nearby, setNearby] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({});

    const [dineRes, setDineRes] = useState('');
    const [dineStatus, setDineStatus] = useState('');

    const navigate = useNavigate()

    useEffect(() => {

        // setPageReady(false)
        // setUserDataReady(false)
        // setUserDbLocation([])
        

        const token = localStorage.getItem('token')
        
        if (token){
            const user = jwtDecode(token)
            if (!user){
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                setCustomerEmail(user.email)
                setPageReady(true)
            }
        } else {
            navigate('/login')
        }

    }, [])


    useEffect(() => {
        if (pageReady){
            GetUserData()
            .then(async () => {
                if (userDataReady){
                    console.log('in data ready')
                    const locations = await axios.get(`/api/customer/nearby`, {
                        params: {
                            longitude: userDbLocations[1].lng,
                            latitude: userDbLocations[1].lat
                        }
                    })
                    .then((res) => {
                        setNearby([])
                        for(let i = 0; i<res.data.length; i++){
                            const element = res.data[i];
                            setNearby(arr => [
                                ...arr, <SellerCard
                                    heading={element.resName}
                                    address={element.resAddress}
                                    resId={element._id}
                                    customer_email={customerEmail}
                                />
                            ])
                        }
                    })
            }})
        }
    }, [pageReady, userDataReady])



    async function GetUserData(){
        const jj = jwtDecode(localStorage.getItem('token'))
        const user_email = jj.email
        console.log('email extracted')
        const joe = await axios.get(`/api/users/${user_email}`)
            .then((res) => {
                const addresses = res.data
                
                    setUserDbLocations(addresses.addresses)

                    const status = res.data.dineStatus
                    
                    if (status.status !== ''){
                        setDineRes(status.restaurantId)
                        setDineStatus(status.status)
                    }
                    
                    setUserDataReady(true)
                
                
            })
    }


    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    async function OnLocationSubmit(){
        const email = jwtDecode(localStorage.getItem('token')).email
        console.log(email)
        console.log(userLocation)
        const sent = await axios.post(`api/users/register/address/${email}`, {
            address: userLocation.current.state
        }).then((res) => {
            console.log(res)
        })
    }
    

    function GetUserLocation(customer_email = customerEmail){

        const [locationElements, setLocationElements] = useState([]);
        const [checkedLocation, setCheckedLocation] = useState('');
        const [newAddress, setNewAddress] = useState('');
        const [userLocation, setUserLocation] = useState(React.createRef());

        useEffect(() => {
            setLocationElements([])
            console.log(userDbLocations)
            userDbLocations.forEach(address => {
                setLocationElements(arr => [...arr, (
                    <Form.Check type='radio' value={address.address}
                        label={address.address}
                        checked={checkedLocation===address.address}
                        onChange={(e) => {
                            setCheckedLocation(e.target.value)
                        }}
                    />
                )])
                console.log(address)
                
            })
        }, [userDbLocations])

        async function AfterLocationSetOrSubmit(){
            if (!checkedLocation){
                console.log('sup')
                await axios.post(`/api/users/register/address/${customerEmail}`, {
                    address: {
                        address: userLocation.current.state.address,
                        coords: {
                            lat: userLocation.current.state.coords.lat,
                            lng: userLocation.current.state.coords.lng
                        }
                    }
                })
            }
        }

        if (inLocation){
            
            return(
                <div>
                    {/* <form onSubmit={(e) => {
                        e.preventDefault()
                        OnLocationSubmit()
                        setInLocation(false)
                    }}>
                        <LocationSearchInput ref={userLocation} />
                        <br />
                        <h5>Or Choose from saved addresses</h5>
                        <br />

                        <Button type='submit'>Set</Button>
                    </form> */}
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        AfterLocationSetOrSubmit()
                        setInLocation(false)
                    }}>
                        <Form.Group className='mb-3' controlId='formBasicLocation'>
                            <Form.Label>Add a new address</Form.Label>
                            <LocationSearchInput ref={userLocation} />
                        </Form.Group>
                        <Form.Group className='mb-3' constrolId='formBasicAddress'>
                            <Form.Label>Select from previous addresses:</Form.Label>
                            {locationElements}
                        </Form.Group>
                        <Button type='submit'>Set</Button>
                    </Form>
                    
                </div>
            );
        
        }
    }

    // function DineInNotif(){

    //     const [resName, setResName] = useState('');
    //     const [resAddress, setResAddress] = useState('');


    //     useEffect(() => {
    //         if (dineRes !== ''){
    //             async function DineInInfo(){
    //                 console.log(dineRes)
    //                 const url = `/api/users/id/${dineRes}`
    //                 const data = await axios.get(url)
    //                 .then((res) => {
    //                     const user = res.data
    //                     setResAddress(user.resAddress)
    //                     setResName(user.resName)
    //                 })
    //             }

    //             DineInInfo()
                
    //         }
    //     }, [dineRes])
  
    //     return(
    //         <div>
    //             <Card>
    //                 <Card.Header as='h5'>{dineStatus}</Card.Header>
    //                 <Card.Body>
    //                     <Card.Title>{resName}</Card.Title>
    //                     <Card.Text>
    //                         {resAddress}
    //                     </Card.Text>
    //                 </Card.Body>
    //             </Card>
    //         </div>
    //     );
    // }


    // add routes for reservation, Dine in (for no reservation), Chat, Grocery (later), Budget
    // Dine-is is the default route for dashboard
    return(
        <div>
            <h4>
                Your Location:
            </h4>
            <br />
            {/* <h5>{userDbLocations[0]}</h5> */}
            <Button onClick={() => setInLocation(true)}>Change Location</Button>
            <GetUserLocation />
            
            <h1>
                hi customer
            </h1>
            {/* <DineInNotif /> */}
            <br />
            <Button onClick={() => {
                navigate('/dashboard/reserve')
            }}>Reservations</Button>
            <h2>Let's Dine-in!</h2>
            <br />
            <h4>Showing restaurants near you:</h4><br />
            <div>
                <CardGroup>
                    {nearby}
                </CardGroup>
            </div>
            <br />
            <Button variant='danger' onClick={LogOut}>Logout</Button>
        </div>
    );
}


export default DashBoard;