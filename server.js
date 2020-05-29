require('dotenv/config');
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./apis/gets');

const PORT = process.env.PORT || 5000;
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
var bodyParser = require('body-parser');
var session = require('express-session');


const config = {
    static: 'build',
    db: {
        url: '',
        type: 'mongo',
        onError: (err) => {
            console.log('DB Connection Failed!');
        },
        onSuccess: () =>{
            console.log('DB CONNECTED');
        }
    }
}

const app = express(config);

app.use(bodyParser.json());


app.use(cors())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 2}
}));

/* app.use(express.static(path.join(__dirname,'build'))); */

app.use(router);

app.listen(PORT, () => {console.log(`Server started on ${PORT}`);})