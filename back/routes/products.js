const express = require('express')
const router = express.Router()

// Models
const productsModel = require('../models/products')

router.post('/uploadProduct', async (req, res) => {
    try {
        const { title, images, description, price, shippingFee } = req.body;
        
        const newProduct = new productsModel({
            title,
            images,
            description,
            price,
            shippingFee,
        });
        await newProduct.save();
        res.status(200).send('Product uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading product');
    }
});


module.exports = router;