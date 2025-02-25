const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    title: String,
    images: [String],
    price: String,
    address: [mongoose.Schema.Types.Mixed],
    description: String,
    category: String,
    shippingFee: Number
})

const productsModel = mongoose.model('products', productsSchema)
module.exports = productsModel