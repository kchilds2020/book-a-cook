const mongoose = require('mongoose')

const JobPost = new mongoose.Schema({
    summary: {type: String, trim: true, default: ''},
    description: {type: String, trim: true, default: ''},
    peopleAmount: {type: String, trim: true, default: ''},
    location: {type: String, trim: true, default: ''},
    date: {type:Date, default: ''},
    username: {type: String, trim: true, default: ''},
    applications: {type: Array, default: []}
},
{
    collection: 'job-posts'
})

module.exports = mongoose.model('JobPost',JobPost);