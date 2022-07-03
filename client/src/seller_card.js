import React, { Component, useState } from 'react';



function SellerCard(props){
    // takes in:
    // 1. Restaurant name (or heading) and address
    // 2. Restaurant rating
    // 3. Restaurant description (optional)
    // 4. Restaurant pic (not for now)

    // Displays:
    // 1. Reserve button
    // 2. Dine in button


    const [resID, setResID] = useState('');




    return(
        <div style={{marginLeft: '10px'}}>
            <h4>{props.heading}</h4>  
            <br />
            <div style={{display: 'flex'}}>
                <div style={{marginLeft: '20px', display: 'flex'}}>
                    <p>{props.address}</p>
                    <p>{props.rating}</p>
                </div>
            </div>
        </div>
    );
}


export default SellerCard;