const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/admin_Auth');
const {getAllOrdersController, createOrderController,getOrderByIdController, deleteOrderController } = require('../controllers/order');


router.get('/', checkAuth, getAllOrdersController);


 router.post('/', createOrderController);
    

router.get('/:orderId', checkAuth,getOrderByIdController);

 router.delete('/:orderId', checkAuth, deleteOrderController);
   
 module.exports = router;