const express = require('express');
const router = express.Router(); 
const checkAuth = require('../middleware/user_Auth');
const menuController = require('../controllers/menu');

router.post('/', checkAuth, menuController.menu_create_menu); 

router.get('/', menuController.menu_get_all)

router.get('/:foodId', menuController.menu_get_menu);

router.patch('/:foodId', checkAuth, menuController.menu_patch_menu)
   
router.delete('/:foodId', checkAuth, menuController.menu_delete_menu)
     
module.exports = router;