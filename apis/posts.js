const express = require('express');
const router = express.Router();
const User = require('../models/User');
const JobPost = require('../models/JobPost');
const Menu = require('../models/Menu');
const formidable = require('formidable');
const fileUpload = require('express-fileupload');
const path = require('path');
let fs = require('fs');
var bcrypt = require('bcrypt');
const saltRounds = 10;


router.use(fileUpload());
router.post('/upload-img', (req,res) => {    
    console.log("USERNAME",req.body.username);
    console.log(req.files);
    if(req.files === null){
        return res.status(400).json({msg: 'no file uploaded'});
    }

    console.log('req.files.file',req.files.file);
     const file = req.files.file;

    file.mv(`${__dirname}/uploads/${req.body.username}-${file.name}`, err=> {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }

        res.json({fileName: `${req.body.username}-${file.name}`, filePath: `/../public/uploads/${req.body.username}-${file.name}`});
    }); 
});

router.post('/post/add-menu-items', (req, res) => {

    req.body.map(element =>{
        Menu.create({
            title: element.title,
            rating: element.rating,
            longitude: element.longitude,
            latitude: element.latitude,
            username: element.username,
            description: element.description,
            price: element.price,
            picture: element.picture
        })
        .then(results => {
            console.log(`New MENU ITEM: ${results}`);
            res.json(results);
        })
        .catch(error => console.error(error))
    })
});

router.post('/post/create-post', (req, res) => {
        JobPost.create({
            summary: req.body.summary,
            description: req.body.description,
            peopleAmount: req.body.peopleAmount,
            location: req.body.location,
            date: req.body.date,
            username: req.body.username,
            cook: req.body.cook
        })
        .then(results => {
            console.log(`New POST: ${results}`);
            res.json(results);
        })
        .catch(error => console.error(error))
});

router.post('/api/post/apply/job-post', (req, res) => {
    console.log(req.body.username, req.body.uniqueID)
    JobPost.updateOne({_id: req.body.uniqueID},{
        $push: {
            applications: req.body.username,
        }
        
    })
    .then(results => {
        console.log(`New Application: ${results}`);
        res.json(results);
    })
    .catch(error => console.error(error)) 
});

router.post('/api/post/confirm-cook', (req, res) => {
    console.log(req.body.cook, req.body.postID)
    JobPost.updateOne({_id: req.body.postID},{
        $set: {
            cook: req.body.cook,
        }
        
    })
    .then(results => {
        console.log(`application updated: ${results}`);
        res.json(results);
    })
    .catch(error => console.error(error)) 
});




router.post('/update-user', (req, res) => {
    console.log('BODY',req.body);
    User.updateOne({username: req.body.username}, {
        $set: {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            cook: req.body.cook,
            cookSpecialty: req.body.cookSpecialty,
            cookDescription: req.body.cookDescription,
            cookPrice: req.body.cookPrice,
            picture: req.body.picture,
            photos: req.body.photos
        }
    })
    .then(results =>{
        console.log(results);
        res.json(results)
    })
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