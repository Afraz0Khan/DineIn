import React, { useEffect, useState } from 'react';
import MenuFragment from './card';
import jwtDecode from 'jwt-decode';
import { useNavigate} from 'react-router';
import axios from 'axios';



function Menu(){
    const [inAddCategory, setAddCategory] = useState(false)
    const [user_email, setUser_email] = useState("")
    const [menuReady, setMenuReady] = useState(false)
    const [cats, setCats] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        GetMenu()
        console.log('updated menu')
    }, [menuReady])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token){
            const user = jwtDecode(token)
            console.log(user)
            if (!user){
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                setUser_email(user.email)
                setMenuReady(true)
                setCats([])
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
            if (menuReady){
                const data = res.data
                const main = data.categories.slice(1)
                main.forEach(element => {
                    setCats(prevArray => [...prevArray, 
                    (
                        <MenuFragment props= {element} email= {user_email} />
                    )])
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
        }).then(() => {
            console.log('setmenu false')
            setMenuReady(false)
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