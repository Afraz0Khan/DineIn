const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Menu = require('../models/menu');
const Seller = require('../models/seller');



router.post('/menu/initiate', async(req, res) => {
    const user = await User.findOne({email: req.body.user_email})
    const userId = user._id.valueOf()

    const updatedCategory = await Menu.updateOne({user_id: userId}, {$push: {"menu.categories": {category: req.body.categoryName, items: []}}})

    res.status(200).send('category updated')
})



router.get('/menu', async (req, res) => {

    if (req.query.user_email.length>0){
        const user = await User.findOne({email: req.query.user_email})
        const userId = user._id.valueOf()

        const data = await Menu.findOne({user_id: userId})

        res.status(200).send(data.menu)
    }
})

router.post('/menu/:email/:action/:target', async (req, res) => {
    const action = req.params.action
    const email = req.params.email

    console.log(req.params)

    const user = await User.findOne({email: email})
    const userId = user._id.valueOf()
    console.log(user)
    console.log(userId)

    if (action === 'deleteCategory'){
        const target = req.params.target
        
        const updatedCategory = await Menu.updateOne({user_id: userId}, {$pull: {"menu.categories": {"category": target}}})
        console.log(updatedCategory)
        res.status(200).send(`deleted ${req.params.target}`)

    } else if (action === 'AddItem'){
        const target = req.params.target
        const body = req.body
        console.log(body)
        const obj = {
            "heading": body.heading,
            "description": body.description,
            "price": body.price
        }

        const push_obj = {}
        push_obj["items"] = obj
        
        const addedItem = await Menu.updateOne({user_id: userId, "menu.categories.category": target},
            {$push: 
                {"menu.categories.$.items": obj}
            }
        )
        console.log(addedItem)
    }
})


router.post('/reserve/:customerEmail', async (req, res) => {
    const resId = req.body.resId
    const customer_email = req.params.customerEmail
    const reservation = {
        email: req.body.email,
        time: req.body.time
    }
    console.log(resId, reservation)

    const restaurant = await Seller.updateOne({_id: resId}, {$push: {"reservations": reservation}})
    if (req.body.type === 'dineIn'){
        const user = await User.updateOne({email: customer_email}, {$set: {
            dineStatus: {
                status: 'pending',
                restaurantId: resId
            }
        }})
        res.send(user).status(200)
    } else if (req.body.type === 'reservation'){
        const user = await User.updateOne({email: customer_email}, {$push: {
            reservations: reservation
        }})
        res.send(user).status(200)
    }
    
    
})

router.post('/checkIn/:customer_email', async (req, res) => {

    console.log(req.params.customer_email, req.body.resEmail)

    const restaurant = await Seller.findOne({email: req.body.resEmail})

    const resId = restaurant._id.valueOf()

    console.log(resId)

    const customer = await User.updateOne({email: req.params.customer_email}, {$set: {
        dineStatus: {
            status: 'dining',
            restaurantId: resId
        }
    }})

    res.send(customer).status(200)
})





module.exports = router;