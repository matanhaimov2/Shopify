const express = require('express')
const router = express.Router()

// Models
const productsModel = require('../models/products')

router.post('/uploadProduct', async (req, res) => {
  try {
    const { title, images, description, price, category, shippingFee } = req.body;

    const newProduct = new productsModel({
      title,
      images,
      description,
      price,
      category,
      shippingFee
    });
    await newProduct.save();
    res.status(200).send('Product uploaded successfully');
  } catch (error) {
    res.status(500).send('Error uploading product');
  }
});

router.post('/updateProduct', async (req, res) => {
  const { id, title, images, description, price, category, shippingFee } = req.body;
  try {
    await productsModel.updateOne({ _id: id }, {
      $set: {
        title: title,
        images: images,
        description: description,
        price: price,
        category: category,
        shippingFee: shippingFee
      }
    });

    res.status(200).send('Product updated successfully');

  } catch (error) {
    res.status(500).send('Error updating product');
  }
});

router.post('/deleteProduct', async (req, res) => {
  const { product_id } = req.body;

  await productsModel.findOneAndDelete({ _id: product_id });
  res.sendStatus(204);
});

router.get('/getProducts', async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < await productsModel.countDocuments().exec()) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }
  try {
    results.results = await productsModel.find().limit(limit).skip(startIndex).exec()
    res.paginatedResults = results
    res.json(res.paginatedResults)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
});

router.get('/getSpecificProduct', async (req, res) => {
  const { product_id } = req.query;

  try {
    const productData = await productsModel.find({ _id: product_id });
    res.json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/updateImg', async (req, res) => {
  const { product_id, newImages } = req.body;
  console.log(product_id)
  console.log(newImages)

  try {
    await productsModel.updateOne({ _id: product_id }, {
      $set: { 
        images: newImages 
      }
    })

    res.json(202)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;