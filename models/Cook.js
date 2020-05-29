const mongoose = require('mongoose')

const Cook = new mongoose.Schema({
    firstName: {type: String, trim: true, default: ''},
    lastName: {type: String, trim: true, default: ''},
    email: {type: String, trim: true, default: ''},
    username: {type: String, trim: true, default: ''},
    password: {type: String, trim: true, default: ''},
    price: {type:Number, default: 0},
    hourly: {type:Boolean, default: false},
    description: {type: String, trim: true, default: ''}
})

module.exports = mongoose.model('Cook',Cook);