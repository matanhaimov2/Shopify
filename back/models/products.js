const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: String,
    description: String
})

const productsModel = mongoose.model('products', productsSchema)
module.exports = productsModel