import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import LocationSearchInput from './placeComplete';
import axios from 'axios';




// idea: maybe use react bootstrap to create a carousel of restaurant cards ordered by 
// different properties like "near you" or "popular" etc.
function DashBoard(){

    const [userDbLocation, setUserDbLocation] = useState("");
    const [userLocation, setUserLocation] = useState(React.createRef());
    const [inLocation, setInLocation] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (token){
            const user = jwtDecode(token)
            if (!user){
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                GetUserData()
            }
        } else {
            navigate('/login')
        }

    }, [])

    async function GetUserData(){
        const jj = jwtDecode(localStorage.getItem('token'))
        const user_email = jj.email
        console.log(user_email)
        console.log('email extracted')
        const joe = await axios.get(`/api/users/${user_email}`)
            .then((res) => {
                console.log(res.data)
                setUserDbLocation(res.data.addresses[0].address)
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
            <h5>{userDbLocation}</h5>
            <button onClick={() => setInLocation(true)}>Change Location</button>
            <GetUserLocation />
            
            <h1>
                hi customer
            </h1>
            <br />
            <input type='button' value="Logout" onClick={LogOut} />
        </div>
    );
}


export default DashBoard;