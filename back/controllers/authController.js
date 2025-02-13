const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

// Models
const RefreshToken = require('../models/refreshToken');
const User = require('../models/user');

// JWT tokens
const JWT_SECRET = process.env.ACCESS_TOKEN_SECERT;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Generate access token
const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role, email: user.email, username: user.username, cartInfo: user.cartInfo }, JWT_SECRET, { expiresIn: '30m' });
};

const register = async (req, res) => {
    try {
        const { email, username, password, cartInfo } = req.body;
        let role = 'user'
        const existingUser = await User.findOne({ username }); // checks if user exist in db
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }

        const existingEmail = await User.findOne({ email }); // checks if email exist in db
        if (existingEmail) {
            return res.status(400).json({ error: "Email already registered." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            role,
            username,
            password: hashedPassword,
            cartInfo
        });

        const savedUser = await user.save();
        res.json({
            message: "User registered successfully",
            userId: savedUser._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        const accessToken = generateAccessToken(user);

        res.json({ message: 'User Has Logged In Successfuly', accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyToken = (req, res) => {
    res.send({ message: 'Token is valid', decoded: req.decodedToken });
};

const verifyRole = (req, res) => {
    res.send({ message: 'Authorized', decoded: req.decodedToken });
};

const logout = async (req, res) => {
    const { token } = req.body;
    await RefreshToken.findOneAndDelete({ token });
    res.sendStatus(204);
};

module.exports = {
    register,
    login,
    verifyToken,
    verifyRole,
    logout,
};