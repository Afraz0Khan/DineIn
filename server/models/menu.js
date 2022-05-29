const mongoose = require('mongoose');


const Menu = new mongoose.Schema({
    item:{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }
})


module.exports = mongoose.model('Menu', Menu);