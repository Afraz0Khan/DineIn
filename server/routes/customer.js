const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Menu = require('../models/menu');
const jwt = require('jsonwebtoken');


// get user coordinates
router.get('/nearby', async (req, res) => {

    function KmstoRadian(kms){
        return kms/6371;
    }

    const restaurants = await User.find({role: "seller", "loc": {
        $geoWithin: {
            $centerSphere:[
                [req.query.longitude, req.query.latitude],
                KmstoRadian(12)
            ]
        }
    }}, {
        password: 0
    })
    res.status(200).send(restaurants)
})













module.exports = router;