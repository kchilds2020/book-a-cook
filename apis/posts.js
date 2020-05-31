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

router.post('/login-user', async (req,res) => {
    const {username, password} = req.body;

    let user = await User.find( {username: username} ).toArray(); 
    console.log(user[0]._id);
    bcrypt.compare(password, user[0].password, function(err, isMatch) {
        if (err) {
            throw err
        } else if (!isMatch) {
            res.status('404');
        } else {
            console.log(user[0]._id)
            req.session.userID = user[0]._id
            console.log(req.session.userID);
            res.json(user);
        } 
    })          
})

module.exports = router;