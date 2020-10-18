const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/orderSchema')
const Menu = require('../models/foodMenu');
const checkAuth = require('../middleware/user_Auth');
const orderController = require('../controllers/order');


router.get('/', checkAuth, orderController.orders_get_all)


router.post('/',checkAuth , orderController.order_create_orders);
    

router.get('/:orderId', checkAuth, orderController.order_get_order);

router.delete('/:orderId', checkAuth, orderController.order_delete_order)
   
module.exports = router;