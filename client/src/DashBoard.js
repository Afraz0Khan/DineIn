import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import LocationSearchInput from './placeComplete';




// idea: maybe use react bootstrap to create a carousel of restaurant cards ordered by 
// different properties like "near you" or "popular" etc.
function DashBoard(){

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
            }
        } else {
            navigate('/login')
        }
    }, [])

    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    function GetUserLocation(){
        if (inLocation){
            return(
                <div>
                    <LocationSearchInput ref={userLocation} />
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
            <h5>
                {userLocation.current}
            </h5>
            <button onClick={() => setInLocation(true)}>joe</button>
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