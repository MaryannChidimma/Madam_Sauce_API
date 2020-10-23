const Order = require('../models/orderSchema');
const mongoose = require('mongoose');
const { response } = require('express');
const { getMenuById } = require('../services/menu')

const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        Order.find()
            .select("foodId quantity _id")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    orders: docs.map(doc => {
                        return {
                            foodId: doc.foodId,
                            _id: doc._id,
                            quantity: doc.quantity,
                            request: { type: 'GET', url: 'http://localhost:5000/order/' + doc._id }
                        }
                    })
                }

                resolve(response);

            }).catch(err => {
                reject({ error: err })
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
                    err.satus = 400;
                    return reject(err);
                }
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    customerName:customerName,
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
            .then(result => {

                const response = {
                    message: "order deleted"
                }
                resolve(response)
            }).catch(err => {
                reject({ error: err })
            })


    })
}



module.exports = { getAllOrders, createOrder, getOrderById, deleteOrder };