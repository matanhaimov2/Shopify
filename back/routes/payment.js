const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();

// Controllers
const { pay, execute, cancel } = require('../controllers/paymentController');

dotenv.config();

router.post('/pay', pay);
router.post('/execute', execute);
router.post('/cancel', cancel);

module.exports = router;