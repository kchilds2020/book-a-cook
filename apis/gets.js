const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');


//find all cooks
router.get('/api/get/cooks', (req,res) => {
    Cook.find()
    .then(cooks => res.json(cooks))
    .catch(err => console.log(err))
})





module.exports = router;