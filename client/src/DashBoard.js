import React, { useEffect, useState } from 'react';
import {useNavigate, useResolvedPath} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import LocationSearchInput from './placeComplete';
import axios from 'axios';
import SellerCard from './seller_card';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';

// idea: maybe use react bootstrap to create a carousel of restaurant cards ordered by 
// different properties like "near you" or "popular" etc.
function DashBoard(){

    const [pageReady, setPageReady] = useState(false)
    const [userDataReady, setUserDataReady] = useState(false)
    const [customerEmail, setCustomerEmail] = useState('')

    const [userDbLocations, setUserDbLocations] = useState([]);
    const [currentUserLocation, setCurrentUserLocation] = useState({});
    
    const [inLocation, setInLocation] = useState(false);
    const [nearby, setNearby] = useState([]);
    

    const navigate = useNavigate()

    useEffect(() => {

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



    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    

    function GetUserLocation(customer_email = customerEmail){

        const [locationElements, setLocationElements] = useState([]);
        const [checkedLocation, setCheckedLocation] = useState('');
        const [newAddress, setNewAddress] = useState('');
        const [userLocation, setUserLocation] = useState(React.createRef());

        async function AllLocations(){
            await axios.get(`/api/users/${customerEmail}`)
            .then((res) => {

            })
        }

        useEffect(() => {
            setLocationElements([])
            console.log(userDbLocations)
            userDbLocations.forEach(address => {
                const value = address.address
                setLocationElements(arr => [...arr, (
                    <Form.Check type='radio' 
                        value={address.address}
                        label={address.address}
                        checked={checkedLocation===address.address}
                        onChange={(e) => {
                            setCheckedLocation(e.target.value)
                            console.log('tatti')
                        }}
                    />
                )])
                if (locationElements.length == 1){
                    setCheckedLocation(value)
                    setCurrentUserLocation(address.coords)
                }
                
            })
            
        }, [userDbLocations])

        async function AfterLocationSetOrSubmit(){
            if (!checkedLocation){
                
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