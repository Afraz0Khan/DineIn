import React, { Component } from 'react';




// ItemCard props: Heading, description, Price, Image, ID


function ItemCard(props){
    return(
        <div>
            <h4>{props.heading}</h4>  
            <br />
            <div style={{display: 'flex'}}>
                <div style={{marginLeft: '20px'}}>
                    <p>{props.description}</p>
                    <p>{props.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;