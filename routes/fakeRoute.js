const express = require('express');
const router = express.Router();
const fake = require('../controllers/fakeController');



router.get('/', fake.handleFake);



module.exports = router;