import React, { Component, useEffect, useState } from 'react';
import ItemCard from './card';
import jwtDecode from 'jwt-decode';
import { useNavigate, useRoutes } from 'react-router';
import axios from 'axios';



function Menu(){
    const [inAddCategory, setAddCategory] = useState(false)
    const [user_email, setUser_email] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem('token')
        if (token){
            const user = jwtDecode(token)
            if (!user){
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                setUser_email(user.email)
            }
        } else {
            navigate('/login')
        }
    })

    async function OnCategorySubmit(categoryName){
        const response = await axios.put('/api/seller/menu/initiate', {
            categoryName,
            user_email
        }).then((e) => {
            console.log(e)
        })
    }
    

    // use request parameters to send user_id
    function AddCategory(){

        const [categoryName, setCategoryName] = useState("")
        if (inAddCategory){
            return(
                <div>
                    <form type="submit" onSubmit={(e) => {
                        e.preventDefault()
                        OnCategorySubmit(categoryName)
                        setCategoryName("")
                        setAddCategory(false)
                    }
                    }>
                        <input type="text" 
                            placeholder='Category Name'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <input type="submit" value="Submit Category" />
                    </form>
                </div>
            );
        } 
    }

    // maybe create a list to store categories or change the data structure used
    // function createCat(obj, category){
    //     const l = [];
    //     const objs = obj[category].items
    //     for (let x in objs){
    //         const item = objs[x]
    //         l.push(
    //             <div>
    //                 <ItemCard
    //                     heading={item["heading"]}
    //                     description={item["description"]}
    //                     price={item["price"]}
    //                 />
    //                 <br />
    //             </div> 
    //         )
    //     }
    //     return l;
    // }

    return(
        <div>
            <h1>Menu</h1>
            <br />
            <button onClick={() => setAddCategory(true)}>Add Category</button>
            <br />
            {AddCategory()}
        </div>
    );
}




export default Menu;