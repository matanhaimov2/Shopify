const express = require('express')
const router = express.Router()

// Controllers
const { addToCart, setCart, getFromCart, verifyPrices } = require('../controllers/cartController');

router.post('/addToCart', addToCart);
router.post('/setCart', setCart);
router.get('/getFromCart', getFromCart);
router.get('/verifyPrices', verifyPrices);

module.exports = router;