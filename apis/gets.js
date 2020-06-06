const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');
const User = require('../models/User');
const Grid = require('gridfs-stream');
const multer = require('multer');
const methodOverride = require('method-override');
const mongoose = require('mongoose')



//create mongo connection
const conn = mongoose.createConnection(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//initialize gfs
let gfs;

conn.once('open', () =>{
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

//find all cooks
router.get('/api/get/cooks', (req,res) => {
    Cook.find()
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


router.get('/image/:filename', (req,res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
     //check if file
         if(!file || file.length === 0){
             return res.status(404).json({
                 err: 'No file exists'
             });
         }
 
         //check if image
         if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
             const readstream = gfs.createReadStream(file.filename);
             readstream.pipe(res);
         }else{
             res.status(404).json({
                 err: 'No file exists'
             });
         }
 
 
     })
 })




module.exports = router;