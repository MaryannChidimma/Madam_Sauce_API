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
     const id = req.body.foodId;
     //const status = res.status(500).json({ message: "Food not found" });
     createOrder(id, req.body)
    .then(response => {
        if (response.message.includes('Food not found')) {
           return res.status(500).json(response);
        }
        res.status(201).json(response)
    })
    .catch(error => {
        res.status(500).json(error)
    })
}


  


 const getOrderByIdController = (req, res, next) => {
    const id = req.params.orderId;
    getOrderById(id)
    .then(response => {
        res.status(201).json(response)
    })
    .catch(error => {
        res.status(500).json(error)
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

module.exports = {getAllOrdersController, createOrderController, getOrderByIdController, deleteOrderController};