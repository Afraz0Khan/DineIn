import React, { Component, useEffect, useState } from 'react';
import ItemCard from './card';
import testdata from './test.json';

function Menu(){

    // useEffect(() => {
    //     console.log(testdata)
    //     onLoad()
    //     createCat(testdata.menu.categories, "breakfast")
    // })
    const [inAddCategory, setAddCategory] = useState(false)

    function AddCategory(){
        console.log('here')
        const [categoryName, setCategoryName] = useState("")
        if (inAddCategory){
            return(
                <div>
                    <form type="submit" onSubmit={(e) => {
                        e.preventDefault()
                        setAddCategory(false)
                    }
                    }>
                        <input type="text" 
                            placeholder='Category Name'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <input type="submit" value="Add Category" />
                    </form>
                </div>
            );
        } 
    }

    // maybe create a list to store categories or change the data structure used
    function createCat(obj, category){
        const l = [];
        const objs = obj[category].items
        for (let x in objs){
            const item = objs[x]
            l.push(
                <div>
                    <ItemCard
                        heading={item["heading"]}
                        description={item["description"]}
                        price={item["price"]}
                    />
                    <br />
                </div> 
            )
        }
        return l;
    }

    function onLoad(){
        const x = [];
        const categories = testdata.menu.categories
        for (let category in categories){
            x.push(
                <div style={{marginLeft: '10px'}}>
                    <br />
                    <h2>{category}</h2>
                    <br />
                    {createCat(categories, category)}
                </div>
            )
        }
        return x;
    }

    return(
        <div>
            <h1>Menu</h1>
            <br />
            <button onClick={() => setAddCategory(true)}>Add Category</button>
            <br />
            {onLoad()}
            <br />
            {AddCategory()}
        </div>
    );
}




export default Menu;