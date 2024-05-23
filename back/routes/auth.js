const express = require('express')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router = express.Router()

dotenv.config();

// Models
const User = require("../models/user");
const RefreshToken = require('../models/refreshToken');


// JWT tokens
const JWT_SECRET = process.env.ACCESS_TOKEN_SECERT;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
        return res.status(400).send("Invalid username or password."); // if user is not found

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
        return res.status(400).send("Invalid username or password.");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.send({ message: 'User Has Logged In Successfuly', token: token });

});

router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username }); // checks if user exist in db
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists." });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        username,
        password: hashedPassword,
      });
  
      const savedUser = await user.save();
      res.json({
        message: "User registered successfully",
        userId: savedUser._id, // from where did it get an id!?
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


module.exports = router;