const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.ACCESS_TOKEN_SECERT;

const verifyTokenMiddleware = (req, res, next) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).send({ message: 'Token is required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid token' });
        }
        req.decodedToken = decoded; // Attach the decoded token to the request object
        next(); // Call the next middleware/route handler
    });
};

module.exports = verifyTokenMiddleware;
