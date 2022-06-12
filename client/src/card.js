import React, { Component, useState } from 'react';




// ItemCard props: Heading, description, Price, Image, ID


function ItemCard(props){
    const [category, setCategory] = useState(props.category)
    return(
        <div style={{marginLeft: '10px'}}>
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