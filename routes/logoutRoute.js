const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/usersLogoutController');


router.post('/logout', logoutController.handleLogout);

module.exports = router;


