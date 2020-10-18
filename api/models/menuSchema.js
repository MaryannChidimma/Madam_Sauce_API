const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: String,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: Number
});


module.exports = mongoose.model('kitchen_dbs', menuSchema)
