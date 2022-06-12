const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Menu = require('../models/menu');




router.put('/menu/initiate', async(req, res) => {

    console.log(req.body)

    const user = await User.findOne({email: req.body.user_email})

    const user_id = user._id.valueOf()

    console.log(user_id)

    const cat = await Menu.findOneAndUpdate({user_id: user_id}, {$push: {categories: {category: req.body.categoryName, items: []}}})

    console.log(cat)

    res.status(200).send('category updated')
})



module.exports = router;