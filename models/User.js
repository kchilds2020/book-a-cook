const mongoose = require('mongoose')

const User = new mongoose.Schema({
    firstName: {type: String, trim: true, default: ''},
    lastName: {type: String, trim: true, default: ''},
    email: {type: String, trim: true, default: ''},
    username: {type: String, trim: true, default: ''},
    password: {type: String, trim: true, default: ''},
    cook: {type: Boolean, default: false}, 
    cookDescription: {type: String, trim: true, default: ''},
    cookSpecialty: {type: String, trim: true, default: ''},
    cookPrice: {type: String, trim: true, default: ''},

},
{
    collection: 'users'
})

module.exports = mongoose.model('User', User);