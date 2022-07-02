import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import LocationSearchInput from './placeComplete';
import axios from 'axios';
import SellerCard from './seller_card';




// idea: maybe use react bootstrap to create a carousel of restaurant cards ordered by 
// different properties like "near you" or "popular" etc.
function DashBoard(){


    const [pageReady, setPageReady] = useState(false)
    const [userDataReady, setUserDataReady] = useState(false)

    const [userDbLocation, setUserDbLocation] = useState([]);
    const [userLocation, setUserLocation] = useState(React.createRef());
    const [inLocation, setInLocation] = useState(false);
    const [nearby, setNearby] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('token')
        setPageReady(false)
        setUserDataReady(false)
        setUserDbLocation([])
        
        if (token){
            const user = jwtDecode(token)
            if (!user){
                localStorage.removeItem('token')
                navigate('/login')
            } else {
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
                            longitude: userDbLocation[1].lng,
                            latitude: userDbLocation[1].lat
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
                                />
                            ])
                            console.log(res.data[i])
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
                console.log(res.data)
                if (res.data.addresses.length != 0){
                    setUserDbLocation(prevArr => [...prevArr,
                        res.data.addresses[0].address
                    ])

                    setUserDbLocation(prevArr => [...prevArr,
                        res.data.addresses[0].coords
                    ])
                    console.log(userDbLocation)
                    setUserDataReady(true)
                }
                
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

    function GetUserLocation(){

        if (inLocation){
            return(
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        OnLocationSubmit()
                        setInLocation(false)
                    }}>
                        <LocationSearchInput ref={userLocation} />
                        <input type='submit' value='set' />
                    </form>
                </div>
            );
        }
    }

    return(
        <div>
            <h4>
                Your Location:
            </h4>
            <br />
            <h5>{userDbLocation[0]}</h5>
            <button onClick={() => setInLocation(true)}>Change Location</button>
            <GetUserLocation />
            
            <h1>
                hi customer
            </h1>
            <br />
            <h4>Showing restaurants near you:</h4><br />
            {nearby} <br />
            <input type='button' value="Logout" onClick={LogOut} />
        </div>
    );
}


export default DashBoard;