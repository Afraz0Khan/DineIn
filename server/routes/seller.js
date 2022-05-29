const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Menu = require('../models/menu');


// create/edit menu


router.post('/menu', async(req, res) => {
    console.log(req.body)
    const menu = await Menu.create(req.body)
    res.status(200).send('ok')
})



module.exports = router;