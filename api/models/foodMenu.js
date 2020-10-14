const mongoose = require('mongoose');


 const menuSchema = mongoose.Schema({
category : String,
name : {type:String, required: true},
price: {type: Number, required: true} ,
quantity: Number
});

module.exports = mongoose.model('kitchen_db', menuSchema)
