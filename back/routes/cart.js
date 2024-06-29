const express = require('express')
const dotenv = require('dotenv');
const router = express.Router()

dotenv.config();

// Models
const User = require("../models/user");
const productsModel = require('../models/products')

// Add product to cart
router.post("/addToCart", async (req, res) => {
    const { user_id, product_id, title, image, price, shippingFee, quantityValue } = req.body;

    try {
        let newProductData = {
            product_id,
            title,
            image,
            price,
            shippingFee,
            quantityValue
        }

        const userData = await User.findOne({ _id: user_id });

        if (userData && userData.cartInfo) {

            let isDuplicate = false;

            for (let item of userData.cartInfo) {
                // Check for duplicate
                if (item.product_id === newProductData.product_id) {
                    isDuplicate = true;
                    let updatedQuantityValue = item.quantityValue + newProductData.quantityValue;

                    try {
                        // duplicate occured - update the quantity of the existing product
                        await User.findOneAndUpdate(
                            { _id: user_id, "cartInfo.product_id": product_id },
                            { $set: { "cartInfo.$.quantityValue": updatedQuantityValue } }
                        );

                    } catch (error) {
                        console.error('Error updating quantity:', error);
                    }

                    break;
                }
            }

            // no duplicate occured - push new product
            if (!isDuplicate) {
                await User.updateOne({ _id: user_id }, {
                    $push: {
                        cartInfo: newProductData
                    }
                });
            }
        }
        else {
            // first product uploaded to cart
            await User.updateOne({ _id: user_id }, {
                $set: {
                    cartInfo: newProductData
                }
            });
        }

        res.json(202);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// Set cart with his updates
router.post("/setCart", async (req, res) => {
    const { user_id, cartInfo } = req.body;

    try {
        const userData = await User.findOne({ _id: user_id });

        if (userData) {
            await User.updateOne({ _id: user_id }, {
                $set: {
                    "cartInfo": cartInfo
                }
            }
            );
        }
        else {
            res.status(500).json({ error: error.message });
        }

        res.json(202);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// Fetch cartInfo
router.get('/getFromCart', async (req, res) => {
    const { user_id } = req.query;

    try {
        const cartInfo = await User.findById(user_id, 'cartInfo');
        let priceValues = cartInfo.cartInfo.map(a => a.price);
        let sumPrice = 0
        for (let i of priceValues) {
            sumPrice = +sumPrice + +i
        }

        let shippingFeeValues = cartInfo.cartInfo.map(b => b.shippingFee)
        let sumShippingFees = 0
        for (let i of shippingFeeValues) {
            sumShippingFees = +sumShippingFees + i
        }

        let overallPrice = sumPrice + sumShippingFees

        let data = {
            cartInfo: cartInfo.cartInfo,
            sumPrice: sumPrice,
            sumShippingFees: sumShippingFees,
            overallPrice: overallPrice
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify frontend prices with db
router.get('/verifyPrices', async (req, res) => {
    const { cartInfo, overallPrice } = req.query;

    try {
        let check = true;
        let totalSum = 0;

        // Go through each product and validate it
        for (let cartProduct of cartInfo) {

            const validProduct = await productsModel.findById(cartProduct.product_id);

            if (validProduct.price !== cartProduct.price || parseFloat(validProduct.shippingFee) !== parseFloat(cartProduct.shippingFee)) {
                check = false;
            }

            // Calculate total sum
            totalSum += parseFloat(cartProduct.price) * parseFloat(cartProduct.quantityValue) + parseFloat(cartProduct.shippingFee)
        }

        // Check that calculated sum and overallprice are the smae
        if (parseFloat(totalSum) !== parseFloat(overallPrice)) {
            check = false;
        }

        if (check) {
            res.json(true);
        }
        else {
            res.status(500).json({ error: error.message });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;