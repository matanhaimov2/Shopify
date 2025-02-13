const express = require('express');

// Controllers
const { register, login, verifyToken, verifyRole, logout } = require('../controllers/authController');

// Middlewares
const { verifyTokenMiddleware, verifyRoleMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-token', verifyTokenMiddleware, verifyToken);
router.post('/verify-role', verifyRoleMiddleware, verifyRole);
router.delete('/logout', logout);

module.exports = router;