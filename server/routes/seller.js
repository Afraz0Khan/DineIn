const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Menu = require('../models/menu');




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
        return
    }
})




module.exports = router;