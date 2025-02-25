// Models
const productsModel = require('../models/products');

const uploadProduct = async (req, res) => {
    const { title, images, description, price, address, category, shippingFee } = req.body;

    let address_details = []
    if (address) {
        address_details = [address.name, { lat: address.geometry.location.lat, lng: address.geometry.location.lng }];
    }

    try {
        const newProduct = new productsModel({
            title,
            images,
            description,
            price,
            address: address_details,
            category,
            shippingFee
        });
        await newProduct.save();
        res.status(200).send('Product uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading product');
    }
};

const updateProduct = async (req, res) => {
    const { id, title, images, description, price, address, category, shippingFee } = req.body;

    let address_details = []
    if (address && address.name) {
        address_details = [address.name, { lat: address.geometry.location.lat, lng: address.geometry.location.lng }];
    }

    try {
        await productsModel.updateOne({ _id: id }, {
            $set: {
                title: title,
                images: images,
                description: description,
                price: price,
                address: address_details,
                category: category,
                shippingFee: shippingFee
            }
        });

        res.status(200).send('Product updated successfully');

    } catch (error) {
        res.status(500).send('Error updating product');
    }
};

const getProducts = async (req, res) => {
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
};

const getSpecificProduct = async (req, res) => {
    const { product_id } = req.query;

    try {
        const productData = await productsModel.find({ _id: product_id });
        res.json(productData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { product_id } = req.body;

    await productsModel.findOneAndDelete({ _id: product_id });
    res.sendStatus(204);
};

module.exports = {
    uploadProduct,
    updateProduct,
    getProducts,
    getSpecificProduct,
    deleteProduct
};