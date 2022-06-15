import React, { Component, useEffect, useState } from 'react';
import ItemCard from './card';
import jwtDecode from 'jwt-decode';
import { useNavigate, useRoutes } from 'react-router';
import axios from 'axios';
import { ReactDOM } from 'react';



function Menu(){
    const [inAddCategory, setAddCategory] = useState(false)
    const [user_email, setUser_email] = useState("")
    const [menuReady, setMenuReady] = useState(false)
    const [cats, setCats] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        console.log('here')
        GetMenu()
    }, [menuReady])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token){
            const user = jwtDecode(token)
            if (!user){
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                setUser_email(user.email)
                setMenuReady(true)
            }
        } else {
            navigate('/login')
        }
    }, [])


    async function GetMenu(){
        const joe = await axios.get('/api/seller/menu', {
            params: {
                user_email: user_email
            }
        }).then(res => {
            console.log('then')
            console.log(menuReady)
            if (menuReady){
                const data = res.data
                data.categories.slice(1).forEach(element => {
                    setCats(prevArray => [...prevArray, (<div>
                        <h2>
                            {element.category}
                        </h2>
                    </div>)])
                    console.log(element)
                });
                console.log(cats)
            }
        })
    }



    async function OnCategorySubmit(categoryName){
        const response = await axios.post('/api/seller/menu/initiate', {
            categoryName,
            user_email
        }).then((e) => {
            console.log(e)
        })
    }

   
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

    return(
        <div>
            <h1>Menu</h1>
            <br />
            <button onClick={() => setAddCategory(true)}>Add Category</button>
            <br />
            {AddCategory()}
            {cats}
        </div>
    );
}




export default Menu;