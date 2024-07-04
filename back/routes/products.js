const express = require('express')
const router = express.Router()

// Models
const productsModel = require('../models/products')

router.post('/uploadProduct', async (req, res) => {
  try {
    const { title, images, description, price, address, category, shippingFee } = req.body;
    
    const newProduct = new productsModel({
      title,
      images,
      description,
      price,
      address: address.name,
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
  const { id, title, images, description, price, address, category, shippingFee } = req.body;

  try {
    await productsModel.updateOne({ _id: id }, {
      $set: {
        title: title,
        images: images,
        description: description,
        price: price,
        address: address.name,
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
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const { category, search } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  try {
    let query = {};

    if (category && category !== 'ALL') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }
      ];
    }

    const totalAmountOfProducts = await productsModel.countDocuments(query).exec();

    results.results = await productsModel.find(query).limit(limit).skip(startIndex).exec();

    if (endIndex < totalAmountOfProducts) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    res.json({
      results: results,
      totalAmount: totalAmountOfProducts
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
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


module.exports = router;