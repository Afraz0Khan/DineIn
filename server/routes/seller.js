const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Menu = require('../models/menu');




router.put('/menu/initiate', async(req, res) => {

    console.log(req.body)

    const user = await User.findOne({email: req.body.user_email})

    const userId = user._id.valueOf()

    console.log(userId)

    const updatedCategory = await Menu.updateOne({user_id: userId}, {$push: {"menu.categories": {category: req.body.categoryName, items: []}}})

    console.log(updatedCategory)

    res.status(200).send('category updated')
})



module.exports = router;