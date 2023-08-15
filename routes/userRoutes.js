const express = require('express');
const router = express.Router();
const userRegisterController = require('../controllers/userRegisterController');

/* router.route('/')
.get(userController.getAllUsers)
.patch(userController.updateUser)
.delete(userController.deleteUser)
 */

router.post('/register', userRegisterController.handleNewUser);



module.exports = router;