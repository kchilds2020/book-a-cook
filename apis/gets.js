const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const dbName = "book-a-cook";
const { redirectHome  } = require('./middleware.js');
const Cook = require('../models/Cook');

router.get('/cook', (req,res) => {
    Cook.find()
    .then(cooks =>{
        res.json({
            success: true,
            text: 'Testing Mongoose'
        })
    })
    .catch(err => {
        console.log(err);
    })
})





module.exports = router;