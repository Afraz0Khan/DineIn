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
    role:{
        type: String,
        required: true
    }
},
{collection: "user-data"})

module.exports = mongoose.model("SellerData", Seller);