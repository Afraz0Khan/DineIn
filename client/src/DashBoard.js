import React, { createRef, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
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



class AddressInput extends React.Component {
    constructor(props) {
        super(props);
        this.newAddress = createRef();
        this.state={
            currentCoordinates: {},
            locationElements: [],
            inComponent: false,
            checkedIndex: 0,
            isAddressSet: false,
            toUpdate: false
        }
    }

    componentDidMount(){
        this.getAllAddresses()
    }

    componentDidUpdate(){
        if (this.state.toUpdate && this.state.locationElements.length!==0){
            this.setState({
                currentCoordinates: this.state.locationElements[this.state.checkedIndex].props.coordinates,
                toUpdate: false,
                isAddressSet: true
            })
        }
    }

    async getAllAddresses(){
        if (this.props.email){
            await axios.get(`/api/users/${this.props.email}`)
                .then((res) => {
                this.setState({locationElements: []})
                const data = res.data.addresses
                if (data){
                    const dummy = []
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        dummy.push((
                            <Form.Check type='radio'
                                value={i}
                                label={element.address}
                                coordinates={element.coords}
                                checked={this.state.checkedIndex === i}
                                onChange={(e) => {
                                    this.setState({checkedIndex: e.target.value})
                                }}
                            />
                        ))
                    }
                    this.setState({
                        locationElements: dummy,
                        toUpdate: true,
                    })
                } else {
                    this.setState({
                        toUpdate: false,
                        currentCoordinates: false
                    })
                }
                
                
            })
        }
    }

    render() { 
        return (
            <div>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    //AfterLocationSetOrSubmit()
                }}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Add a new address</Form.Label>
                        <LocationSearchInput ref={this.newAddress} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Select from previous addresses:</Form.Label>
                            {this.state.locationElements}
                    </Form.Group>
                    <Button type='submit'>Set</Button>
                </Form>
            </div>
        );
    }
}





function DashBoard(){

    const [customerEmail, setCustomerEmail] = useState('');
    const [currentUserLocation, setCurrentUserLocation] = useState(React.createRef());
    const [inLocation, setInLocation] = useState(false);
    const [nearby, setNearby] = useState([]);
    const [toLoop, setToLoop] = useState(false);
    const [childStateReady, setChildStateReady] = useState(false);
    const [addressExists, setAddressExists] = useState(true);
    

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
            }
        } else {
            navigate('/login')
        }
    }, [])


    useEffect(() => {
        async function getNearby(){
            await axios.get(`/api/customer/nearby`, {
                params: {
                    longitude: currentUserLocation.current.state.currentCoordinates.lng,
                    latitude: currentUserLocation.current.state.currentCoordinates.lat
                }
            }).then((res) => {
                setNearby([])
                const data = res.data
                console.log(data)
                data.forEach(element => {
                    setNearby(prev => [...prev, (
                        <SellerCard 
                            heading={element.resName}
                            address={element.resAddress}
                            resId={element._id}
                            customer_email={customerEmail}
                        />
                    )])
                });

            })
        }  

        const coords = currentUserLocation.current
        if (currentUserLocation.current){
            if (JSON.stringify(coords.state) !== '{}' && customerEmail &&  addressExists){
                if (!childStateReady){
                    setChildStateReady(true)
                }
                if (coords.state.currentCoordinates === false){
                    setAddressExists(false)
                } else if (JSON.stringify(coords.state.currentCoordinates) !== '{}'){
                    console.log(currentUserLocation.current.state.currentCoordinates)
                    getNearby()
                } else {
                    setToLoop(!toLoop)
                }
            } else {
                setToLoop(!toLoop)
            }
        }

    }, [customerEmail, toLoop, childStateReady, addressExists])


    
 

    //     // async function AfterLocationSetOrSubmit(){
    //     //     if (!checkedLocation){
                
    //     //         await axios.post(`/api/users/register/address/${customerEmail}`, {
    //     //             address: {
    //     //                 address: userLocation.current.state.address,
    //     //                 coords: {
    //     //                     lat: userLocation.current.state.coords.lat,
    //     //                     lng: userLocation.current.state.coords.lng
    //     //                 }
    //     //             }
    //     //         })
    //     //     }
    //     // }

    //     if (inLocation){
            
    //         return(
    //             <div>
    //                 <Form onSubmit={(e) => {
    //                     e.preventDefault()
    //                     //AfterLocationSetOrSubmit()
    //                     setInLocation(false)
    //                 }}>
    //                     <Form.Group className='mb-3'>
    //                         <Form.Label>Add a new address</Form.Label>
    //                         <LocationSearchInput ref={newAddress} />
    //                     </Form.Group>
    //                     <Form.Group className='mb-3'>
    //                         <Form.Label>Select from previous addresses:</Form.Label>
    //                             {locationElements}
    //                     </Form.Group>
    //                     <Button type='submit'>Set</Button>
    //                 </Form>
                    
    //             </div>
    //         );
        
    //     }
    // }

    function DineInNotif(){

        const [resName, setResName] = useState('');
        const [resAddress, setResAddress] = useState('');
        const [diningStatus, setDiningStatus] = useState('');
        const [resId, setResId] = useState('');
        
        useEffect(() => {
            async function GetUserDineNotif(){
                await axios.get(`/api/users/${customerEmail}`)
                .then((res) => {
                    const data = res.data
                    console.log(data)
                    if (data.dineStatus.restaurantId){
                        setResId(data.dineStatus.restaurantId)
                        setDiningStatus(data.dineStatus.status)
                    }
                })
            }

            if (customerEmail){
                GetUserDineNotif()
            }
        }, [customerEmail])

        useEffect(() => {
            if (resId){
                async function DineInInfo(){
                    console.log(resId)
                    await axios.get(`/api/users/id/${resId}`)
                    .then((res) => {
                        const user = res.data
                        setResAddress(user.resAddress)
                        setResName(user.resName)
                    })
                }
                DineInInfo()
            }
        }, [resId])
  
        if (resId){
            return(
                <div>
                    <h3>Dine Status</h3>
                    <Card>
                        <Card.Header as='h5'>{diningStatus}</Card.Header>
                        <Card.Body>
                            <Card.Title>{resName}</Card.Title>
                            <Card.Text>
                                {resAddress}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
        
    }

    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    // add routes for reservation, Dine in (for no reservation), Chat, Grocery (later), Budget
    // Dine-is is the default route for dashboard
    return(
        <div>
            <Button onClick={() => setInLocation(true)}>Change Location</Button>
            
            {customerEmail && <AddressInput email={customerEmail} ref={currentUserLocation} />}
            
            
            <h1>
                customer
            </h1>
            <DineInNotif />
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