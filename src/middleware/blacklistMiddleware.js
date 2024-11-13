const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlackList');
const blacklistMiddleware = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.header('Authorization');

        // Check if token is blacklisted
        const blacklistedToken = await TokenBlacklist.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ error: 'Token is blacklisted' });
        }
        // console.log("blacklisted token")

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = blacklistMiddleware;
