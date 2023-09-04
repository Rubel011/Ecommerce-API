const express = require('express');
const { authenticateToken } = require('../middleware/authentication');
const { getAllUsers, registerUser, loginUser, userProfile, logoutAndBlacklistUser } = require('../controller/userController.js');
const blacklistMiddleware = require('../middleware/blacklistMiddleware');
const userRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *       required:
 *         - _id
 *         - name
 *         - email
 *     UserRegistration:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * securitySchemes:
 *   BearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: Your authorization token
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */


/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
userRouter.get("/",authenticateToken,blacklistMiddleware,getAllUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User registration information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */


/**
 * @route   POST /users/register
 * @desc    Register a new user
 * @access  Public
 */
userRouter.post("/register", registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in user
 *     description: Log in a user with the provided credentials.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User login information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

/**
 * @route   POST /users/login
 * @desc    Log in user
 * @access  Public
 */
userRouter.post("/login", loginUser);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile of the authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */


/**
 * @route   GET /users/profile
 * @desc    Get user profile (protected route)
 * @access  Private
 */
userRouter.get("/profile", authenticateToken,blacklistMiddleware, userProfile);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out user and blacklist token
 *     description: Log out the authenticated user and blacklist their token.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       500:
 *         description: Internal server error.
 */



/**
 * @route   POST /users/logout
 * @desc    Log out user and blacklist token
 * @access  Private
 */
userRouter.post('/logout', authenticateToken,blacklistMiddleware, logoutAndBlacklistUser);

module.exports = { userRouter };
