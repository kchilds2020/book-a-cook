const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');
const User = require('../models/User');
var bcrypt = require('bcrypt');


//find all cooks
router.get('/api/get/cooks', (req,res) => {
    Cook.find()
    .then(cooks => res.json(cooks))
    .catch(err => console.log(err))
})

//find user login

router.get('/get-session', (req,res) => {
    res.send(`${req.session.userID}`);
})





module.exports = router;