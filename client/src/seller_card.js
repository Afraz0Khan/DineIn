import React, { Component } from 'react';



function SellerCard(props){
    // takes in:
    // 1. Restaurant name (or heading) and address
    // 2. Restaurant rating
    // 3. Restaurant description (optional)
    // 4. Restaurant pic (not for now)
    return(
        <div style={{marginLeft: '10px'}}>
            <h4>{props.heading}</h4>  
            <br />
            <div style={{display: 'flex'}}>
                <div style={{marginLeft: '20px'}}>
                    <p>{props.address}</p>
                    <p>{props.rating}</p>
                </div>
            </div>
        </div>
    );
}


export default SellerCard;