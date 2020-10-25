const { response } = require('express');
const { getAllOrders, createOrder, getOrderById, deleteOrder } = require('../services/order');

const getAllOrdersController = (req, res, next) => {
    getAllOrders()
        .then(result => {
            const response = {
                count: result.length,
                order: result,
                success: true
            }

            res.status(200).json(response)
        })
        .catch(err => {
           next(err)
        })
}

const createOrderController = (req, res, next) => {
    createOrder(req.body)
        .then(result => {
            const response = {
                message: 'order was created',
                createdProperty: result,
                success: true
            }
            res.status(201).json(response)
        })
        .catch(err => {
           next(err)
        })
}

const getOrderByIdController = (req, res, next) => {
    const id = req.params.orderId;
    getOrderById(id)
        .then(result => {
            const response = {
                Order: result,
                success: true
            }
            res.status(200).json(response)
        })
        .catch(err => {
           next(err)
        })
};

const deleteOrderController = (req, res, next) => {
    const id = req.params.orderId;
    deleteOrder(id)
        .then(result => {
            const response = {
                message: "order was deleted",
                success: true
            }
            res.status(200).json(response)
        })
        .catch(err => {
           next(err)
        })
}

module.exports = { getAllOrdersController, createOrderController, getOrderByIdController, deleteOrderController };