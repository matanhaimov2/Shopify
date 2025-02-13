const express = require('express')
const router = express.Router()

// Controllers
const { uploadProduct, updateProduct, deleteProduct, getProducts, getSpecificProduct } = require('../controllers/productsController');

router.post('/uploadProduct', uploadProduct);
router.post('/updateProduct', updateProduct);
router.get('/getProducts', getProducts);
router.get('/getSpecificProduct', getSpecificProduct);
router.delete('/deleteProduct', deleteProduct);

module.exports = router;