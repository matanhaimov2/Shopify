const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000; // You can choose any port

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/shopify_db')

// Routes
const authRoutes = require('./routes/auth')
const productsRoute = require('./routes/products')
const cartRoute = require('./routes/cart')
const payment = require('./routes/payment')

app.use('/auth', authRoutes)
app.use('/products', productsRoute)
app.use('/cart', cartRoute)
app.use('/payment', payment)

// HealthCheck
app.post('/healthCheck', (req, res) => {
    res.send('Backend is Healthy');
});

app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});