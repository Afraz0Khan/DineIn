import axios from 'axios';
import React, { useState, useEffect } from 'react';




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
    const email = props.email

    const [itemFragments, setItemFragments] = useState([]);
    const [inAddItem, setInAddItem] = useState(false)

    async function DeleteCategory(){
        const mama = await axios.post(`/api/seller/menu/${email}/deleteCategory/${category}`)
            .then((e) => {
                console.log(e)
            })
    }


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
    }, [])

    function PromptItem(){
        const [heading, setHeading] = useState("")
        const [description, setDescription] = useState("")
        const [price, setPrice] = useState("")

        const item = {
            heading,
            description,
            price
        }


        async function AddItem(){
            const joe = await axios.post(`/api/seller/menu/${email}/AddItem/${category}`, item)
            .then(() => {
                console.log("request sent successfully")
            })
        }



        if (inAddItem){
            return(
                <div>
                    <form type="submit" onSubmit={(e) => {
                        e.preventDefault()
                        AddItem(item)
                        setHeading("")
                        setDescription("")
                        setPrice("")
                        setInAddItem(false)
                    }}>
                        <input type="text"
                            placeholder='Heading'
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />

                        <input type="text"
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input type="text"
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <input type="submit" value="submit item" /> 

                    </form>
                </div>
            );
        }
    }

    return(
        <div>
            <h2>
                {category}
            </h2>
            <br />
            <button onClick={DeleteCategory}>Delete category</button>
            <br />
            <button onClick={() => setInAddItem(true)}>Add Item</button>
            <br />
            {PromptItem()}
            {itemFragments}
        </div>
    );

}




export default MenuFragment;