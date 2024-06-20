const express = require('express')
const dotenv = require('dotenv');
const router = express.Router()

dotenv.config();

// Models
const User = require("../models/user");

// JWT tokens
const JWT_SECRET = process.env.ACCESS_TOKEN_SECERT;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;


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


module.exports = router;