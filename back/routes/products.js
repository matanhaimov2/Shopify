const express = require('express')
const router = express.Router()

// Models
const productsModel = require('../models/products')

router.post('/', (req, res) => {
    productsModel.create(req.body)
    .then(products => res.json(products))
    .catch(err => res.json(err))
});


module.exports = router;