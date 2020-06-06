const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const storage = require('./storage');
const multer = require('multer');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const upload = multer({storage});


router.post('/upload', upload.single('file'), (req, res) => {
    res.json({file: req.file});
});

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
    console.log(username, password);
    User.findOne( {username: username} )
    .then(results => {
        if(results !== null){
            bcrypt.compare(password, results.password, function(err, isMatch) {
                if(isMatch === true){
                    req.session.userID = results._id
                    res.json(results)
                }else{
                    console.log('invalid password');
                    res.send('invalid password');
                }
            })
        }else{
            console.log('invalid username');
            res.send('invalid username');
        }

    })
    .catch(err => console.log(err)) 
         
})

module.exports = router;