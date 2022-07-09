const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Seller = require('../models/seller');
const Menu = require('../models/menu');



router.post('/register', async (req, res) => {
    const pwd = await bcrypt.hash(req.body.password, 10)
    console.log(pwd)

    try{
        if (req.body.role === 'customer'){
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: pwd,
                role: req.body.role,
                dineStatus: {
                    status: '',
                    restaurantId: ''
                }
            })
            
            res.status(200).send('customer created')
        } else if (req.body.role === 'seller'){
            console.log(req.body.resAddress)
            const seller = await Seller.create({
                name: req.body.name,
                email: req.body.email,
                password: pwd,
                resName: req.body.resName,
                resAddress: req.body.resAddress,
                loc: {
                    type: "Point",
                    coordinates: [req.body.coordinates.lng, req.body.coordinates.lat]
                },
                role: req.body.role
            })
            
            const this_user = await Seller.findOne({email: req.body.email})

            const menu = await Menu.create({
                user_id: this_user._id.valueOf(),
                menu: {
                    categories: {}
                }
            })
            res.status(200).send('seller and menu created')
        }
    } catch(err){

        if (await User.findOne({email: req.body.email})){
            
            return res.json({user: 'exists'})
        } else {
            console.log(err)
        }
    }
    
})



router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    const pwdIsValid = await bcrypt.compare(req.body.password, user.password)

    if (pwdIsValid){
        const token = jwt.sign({
            email: req.body.email,
            password: req.body.password
        }, 'secretOrKey')
        return res.status(200).json({user: token, role: user.role})
    } else {
        return res.json({user : false, status: 'not ok'})
    }

})

router.post('/register/address/:email', async (req, res) => {
    const address_obj = req.body.address
    
    console.log(address_obj)
    const momo = await User.updateOne({email: req.params.email}, {$push: {"addresses": address_obj}})
        .then(() => {
            res.status(200).send('addresses updated')
        })
})


router.get('/:email', async (req, res) => {
    const user = await User.findOne({"email": req.params.email})

    res.status(200).send(user)
})








module.exports = router;