import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';





// idea: maybe use react bootstrap to create a carousel of restaurant cards ordered by 
//  different properties like "near you" or "popular" etc.
function DashBoard(){

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
    })

    function LogOut(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    return(
        <div>
            <h1>
                hi customer
            </h1>
            <br />
            <input type='button' value="Logout" onClick={LogOut} />
        </div>
    );
}


export default DashBoard;