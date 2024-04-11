const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000; // You can choose any port

// mongoose.connect('mongodb://localhost:27017/shopify_db')

app.use(cors());

app.use(express.json());

// const UserSchema = mongoose.Schema({
//     name: String,
//     age: Number
// })

// const UserModel = mongoose.model("authentication", UserSchema)

// app.get('/getUsers', (req, res) => {
//     UserModel.find({}).then(function(authentication) {
//         res.json(authentication)
//     }).catch(function(err) {
//        console.log(err) 
//     })
// })

app.get('/', (req, res) => {
    res.send('Hello from the Node.js backend!');
});

app.post('/healthCheck', (req, res) => {
    res.send('Backend is Healthy');
});


app.post('/', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send('Data received successfully');
});


app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});