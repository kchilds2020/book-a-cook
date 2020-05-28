const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const dbName = "book-a-cook";
const { redirectHome  } = require('./middleware.js');

MongoClient.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true } ,function(err, client) {
    if(err) { 
        return console.log('Failed connecting to server: ', err);
    }else{
        const db = client.db(dbName);

        router.get('/api/get-all-cooks', redirectHome ,async (req,res,next) => {
            console.log('call established');
            let games = await db.collection('cooks').find( ).toArray();
            console.log(games);
            res.json(games);
        })

    }
});





module.exports = router;