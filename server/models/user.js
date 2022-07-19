const mongoose = require('mongoose');


const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    addresses: {
        type: Array
    },
    dineStatus: {
        type: Object
        // (customer can send only one request at a time)
        // {
        //      status: 'pending/dining/(off) -> default',
        //      restaurantId: 'xyzabc123456'
        // }
    },
    reservations: {
        type: Array,
        required: false
    },
    role:{
        type: String,
        required: true
    }
},
{collection: "user-data"})

module.exports = mongoose.model("UserData", User);