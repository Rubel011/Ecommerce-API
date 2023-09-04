const { User } = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlackList');
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
const jwtSecret = process.env.JWT_SECRET || 'masai';

async function getAllUsers(req, res) {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // Respond with the list of users
        res.status(200).json({ data: users });
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: "Internal server error" });
    }

}

async function registerUser(req, res) {
    try {
        // Extract user information from the request body
        const { email, password, name } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Email is already registered
            return res.status(400).json({ error: "Email already registered, Use different email or Login" });
        }

        // Hash the password using bcrypt
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                // Handle password hashing error
                return res.status(500).json({ error: "Password hashing failed" });
            }

            // Create a new user document with hashed password
            const newUser = new User({ name, email, password: hash });

            // Save the new user to the database
            await newUser.save();

            // Respond with a success message
            res.status(201).json({ success: `${name} has been registered successfully with _Id-${newUser._id}` });
        });
    } catch (error) {
        // Handle bad request
        res.status(400).json({ error: "Bad request" });
    }
}


const loginUser = async (req, res) => {
    try {
        // Extract user information from the request body
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If user doesn't exist or password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1day" });

        // Respond with a success message and the JWT token
        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: "Internal server error" });
    }
}

const userProfile = async (req, res) => {
    try {
        // Access authenticated user data using req.user
        const user = await User.findById(req.user.userId);

        // Respond with user data
        res.status(200).json({ data: user });
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: "Internal server error" });
    }
}

const logoutAndBlacklistUser =async (req, res) => {
    try {
        // Extract token from request headers
        const token = req.header('Authorization');
        // // Decode the token to get user ID
        const decodedToken = jwt.decode(token);

        // Calculate token's expiration date
        const expiry = new Date(decodedToken.exp * 1000);

        // Add token to the blacklist collection
        const blacklistToken = new TokenBlacklist({
            token,
            userId: decodedToken.userId,
            expiry
        });
        await blacklistToken.save();

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

// Export the functions
module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    userProfile,
    logoutAndBlacklistUser
};