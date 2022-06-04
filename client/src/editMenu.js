import React, { Component, useEffect } from 'react';
import ItemCard from './card';
import testdata from './test.json';

function Menu(){

    // useEffect(() => {
    //     console.log(testdata)
    //     onLoad()
    //     createCat(testdata.menu.categories, "breakfast")
    // })




    // maybe create a list to store categories or change the data structure used
    function createCat(obj, category){
        const l = [];
        const objs = obj[category].items
        for (let x in objs){
            const item = objs[x]
            console.log(item)
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
                <div>
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
            {onLoad()}
        </div>
    );
}




export default Menu;