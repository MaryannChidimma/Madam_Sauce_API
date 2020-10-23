const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'kitchen_dbs', required: true },
        quantity: { type: Number, default: 1 },
        customerName: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema)
