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

// Generate access token
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '10s' });
};


router.post("/register", async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ username }); // checks if user exist in db
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: hashedPassword,
      isAdmin
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

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const validPassword = await user.verifyPassword(password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const accessToken = generateAccessToken(user);

    res.json({ message: 'User Has Logged In Successfuly', accessToken, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }


});


router.delete('/logout', async (req, res) => {
  const { token } = req.body;
  await RefreshToken.findOneAndDelete({ token });
  res.sendStatus(204);
});

module.exports = router;