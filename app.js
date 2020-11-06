const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('config');

if(app.get('env')==='production'){
    mongoose.connect( process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("logged to database"))
    .catch(err => console.error('could not connect to mongo db....', err))
}
if(app.get('env')==='development'){
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("logged to database"))
    .catch(err => console.error('could not connect to mongo db....', err))
}

const menuRoute = require('./api/routes/menu');
const orderRoute = require('./api/routes/order');
const adminRoute = require('./api/routes/admin');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
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

app.use('/menu', menuRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
        success: false
    });
});



module.exports = app;