const Order = require('../models/orderSchema');
const Menu = require('../models/menuSchema')
const mongoose = require('mongoose');
const { response } = require('express');

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

const createOrder = (id, data) => {
    return new Promise((resolve, reject) => {
        const { quantity, foodId } = data;
        Menu.findById(id)
            .then(food => {
                
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: quantity,
                    foodId: foodId
                });
                return order
                    .save()
                    .then(result => {
                        const response = {
                            message: 'order was created',
                            createdProperty: {
                                _id: result._id,
                                foodId: result.foodId,
                                quantity: result.quantity,
                                request: {
                                    type: "GET",
                                    url: "http://localhost:5000/order/" + result._id
                                }
                            }
                        }
                        resolve(response);
                    }).catch(err => {
                        reject({ error: err })
                    })
            })

    });
}

const getOrderById = (id) => {
    return new Promise((resolve, reject) => {
        Order.findById(id)
            .exec()
            .then(order => {
                const response = {
                    Order: order,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ORDER',
                        url: "http://localhost:5000/order"
                    }
                }

                resolve(response);

            }).catch(err => {
                reject({ error: err });
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