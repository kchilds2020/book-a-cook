const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/post/register', (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        User.create({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: hash
        })
        .then(results => {
            console.log(`New ID: ${results}`);
            req.session.userID = results._id;
            res.json(results);
        })
        .catch(error => console.error(error))
        })
});

module.exports = router;