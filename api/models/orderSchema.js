const mongoose = require('mongoose');
//const kitchen_dbs = require('./foodMenu')


 const orderSchema = mongoose.Schema({
 _id : mongoose.Schema.Types.ObjectId,
 foodId: {type: mongoose.Schema.Types.ObjectId, ref: 'kitchen_dbs', required: true},
 quantity: {type: Number, default: 1} ,

});

module.exports = mongoose.model('Order', orderSchema)
