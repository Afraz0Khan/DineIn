const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Menu = require('../models/menu');
const jwt = require('jsonwebtoken');


// get user coordinates
router.get('/nearby', async (req, res) => {
    console.log(req.body, req.query)
    console.log('joe')
    const user_coords = 'joe'
    // const restaurants = await User.find({role: 'seller', resAddress: {
    //     $near: {
    //         $goemetry: {
    //             type: "Point",
    //             coordinates: user_coords
    //         }
    //     }
    // }})
    res.status(200).send({success: "true"})
})













module.exports = router;