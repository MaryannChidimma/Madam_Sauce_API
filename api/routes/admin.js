const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const checkAuth = require('../middleware/admin_Auth');

router.post('/signup', adminController.admin_signup);
   
router.post('/login', adminController.admin_login);

router.delete('/:adminId', checkAuth, adminController.admin_delete_admin);

module.exports = router;