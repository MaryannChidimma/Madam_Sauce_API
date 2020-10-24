const express = require('express');
const router = express.Router();
const {adminSignup, adminLogin, deleteAdmin} = require('../controllers/admin');
const checkAuth = require('../middleware/admin_Auth');

router.post('/signup',adminSignup);
   
router.post('/login', adminLogin);

router.delete('/:adminId', checkAuth, deleteAdmin);

module.exports = router;