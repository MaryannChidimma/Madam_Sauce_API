const express = require('express');
const router = express.Router(); 
const checkAuth = require('../middleware/admin_Auth');
const {
    getAllMenuController,
    getMenuByIdController, 
    createMenuController,
    updateMenuController, 
    deleteMenuController
    } = require('../controllers/menu');

router.post('/', checkAuth, createMenuController); 

router.get('/', getAllMenuController)

router.get('/:foodId', getMenuByIdController);

 router.patch('/:foodId', checkAuth, updateMenuController)
   
 router.delete('/:foodId', checkAuth,deleteMenuController)
     
module.exports = router;