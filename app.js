const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//require('dotenv').config();

mongoose.connect('mongodb://localhost/Kitchen_DB',  { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("logged to database"))
.catch(err => console.error('could not connect to mongo db....', err))
const kitchenRoute = require('./api/routes/kitchen');

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
    
});
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/kitchen', kitchenRoute);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(( error, req, res, callack)=>{
    
    res.status(error.status || 500);
   res.json({
       error: {message: error.message}
   });
});
module.exports = app;