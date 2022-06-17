import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';




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



function MenuFragment(props){
    const items = props.props.items // list of objects
    const category = props.props.category // string
    

    const [itemFragments, setItemFragments] = useState([]);

    // async function DeleteCategory(){
    //     const mama = await axios.post(`/api/seller/menu/${}`)
    // }

    useEffect(() => {
        items.forEach(item => {
            setItemFragments(arr => [...arr, (
                <ItemCard category={category}
                    heading= {item.heading}
                    description= {item.description}
                    price= {item.price}
                />
            )])
        })
    })

    return(
        <div>
            <h2>
                {category}
            </h2>
            <br />
            <button onClick={DeleteCategory}>Delete category</button>
            <br />
            {itemFragments}
        </div>
    );

}




export default MenuFragment;