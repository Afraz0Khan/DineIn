const mongoose = require('mongoose');


const Seller = new mongoose.Schema({
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
    resName: {
        type: String,
        required: true
    },
    resAddress: {
        type: String,
        required: true
    },
    loc: {
        type: Object,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    reservations:{
        type: Array,
        required: false
    },
    dineIns: {
        type: Array,
        required: false
    }
},
{collection: "user-data"})

module.exports = mongoose.model("SellerData", Seller);