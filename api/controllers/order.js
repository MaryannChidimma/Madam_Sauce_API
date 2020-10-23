const { getAllOrders, createOrder, getOrderById, deleteOrder } = require('../services/order');

const getAllOrdersController = (req, res, next) => {
    getAllOrders()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
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
            res.status(err.status || 500).json({error: err})
        })
}





const getOrderByIdController = (req, res, next) => {
    const id = req.params.orderId;
    getOrderById(id)
        .then(result => {
            const response = {
                Order: order,
                success: true
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err, success: false })
        })
};




const deleteOrderController = (req, res, next) => {
    const id = req.params.orderId;
    deleteOrder(id)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json(error)
        })

}

module.exports = { getAllOrdersController, createOrderController, getOrderByIdController, deleteOrderController };