const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./utils/db');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectDB();

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