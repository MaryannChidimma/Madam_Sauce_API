const Order = require('../models/orderSchema');
const mongoose = require('mongoose');
const { getMenuById } = require('../services/menu')

const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        Order.find()
            .select("foodId quantity _id, customerName, createdAt")
            .exec()
            .then(order => {
                resolve(order);

            }).catch(err => {
                reject(err)
            });
    })
}

const createOrder = (data) => {
    return new Promise((resolve, reject) => {
        const { quantity, foodId, customerName } = data;
        getMenuById(foodId)
            .then(food => {
                if (!food) {
                    const err = new Error('food not found')
                    err.satus = 404;
                    return reject(err);
                }
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    customerName: customerName,
                    quantity: quantity,
                    foodId: foodId
                });
                order.save()
                    .then(order => {
                        resolve(order);
                    }).catch(err => {
                        reject(err)
                    })
            })

    });
}

const getOrderById = (id) => {
    return new Promise((resolve, reject) => {
        Order.findById(id)
            .exec()
            .then(order => {
                resolve(order);
            }).catch(err => {
                reject(err);
            });
    })

}
const deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        Order.remove({ _id: id })
            .exec()
            .then(order => {
                resolve(order)
            }).catch(err => {
                reject(err)
            })


    })
}

module.exports = { getAllOrders, createOrder, getOrderById, deleteOrder };