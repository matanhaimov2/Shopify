const express = require('express');
const app = express();
const port = 5000; // You can choose any port

app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});