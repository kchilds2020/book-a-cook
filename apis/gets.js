const express = require('express');
const router = express.Router();
const JobPost = require('../models/JobPost');
const User = require('../models/User');



//find all job posts
router.get('/api/get/jobs', (req,res) => {
    JobPost.find()
    .then(posts => {
        console.log(posts);
        res.json(posts)
    })
    .catch(err => console.log(err))
})

//find all cooks
router.get('/api/get/cooks', (req,res) => {
    User.find({cook: true})
    .then(cooks => res.json(cooks))
    .catch(err => console.log(err))
})

//get user with username
router.get('/api/get/username/:username', (req,res) => {
    console.log(req.params.username)
    User.findOne({username: req.params.username})
    .then(cooks => {
        console.log(cooks)
        res.json(cooks)})
    .catch(err => console.log(err))
})
//get user with id
router.get('/api/get/userid/:id', (req,res) => {
    /* console.log(req.params.id) */
    User.findOne({_id: req.params.id})
    .then(user => {
        /* console.log(user) */
        res.json(user)})
    .catch(err => console.log(err))
})

//get user with email
router.get('/api/get/email/:email', (req,res) => {
    console.log(req.params.email)
    User.findOne({email: req.params.email})
    .then(cooks => {
        console.log(cooks)
        res.json(cooks)})
    .catch(err => console.log(err))
})


//find user login

router.get('/get-session', (req,res) => {
    res.send(`${req.session.userID}`);
})






module.exports = router;