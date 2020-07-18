require('dotenv/config');
const express = require('express');
const path = require('path');
const cors = require('cors');
const gets = require('./apis/gets');
const posts = require('./apis/posts');
const emailConfirmation = require('./apis/emailConfirmation');
const completeOrder = require('./apis/completeOrder');
const routes = require('./routes/routing')
const mongoose =require('mongoose');
const PORT = process.env.PORT || 5000;
let bodyParser = require('body-parser');
let session = require('express-session');
var MemoryStore = require('memorystore')(session)
let fs = require('fs');

var https = require('https');



const app = express();




app.use(bodyParser.json());
app.use(cors());




app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 2},
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
}));

 app.use(express.static(path.join(__dirname,'client/build')));
/*app.use(express.static(path.join(__dirname,'public'))); */

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
app.use(gets);
app.use(posts);
app.use(emailConfirmation)
app.use(completeOrder)
app.use(routes);


/* app.listen(PORT, () => {console.log(`**SERVER STARTED**  PORT: ${PORT}`);}) */
console.log('ENVIRONMENT: ', process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production'){
    var options = {
      
      key: fs.readFileSync('./certs/server-key.pem'),
      cert: fs.readFileSync('./certs/server-cert.pem'),
  };
  var server = https.createServer(options, app).listen(port, function(){
    console.log("Express server listening on port " + port);
  });
}else{
  app.listen(PORT, () => {console.log(`**SERVER STARTED**  PORT: ${PORT}`);})
}