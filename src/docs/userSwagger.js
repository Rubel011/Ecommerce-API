/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email, password, and name.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request or email already registered.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in user
 *     description: Log in a user with email and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Get the profile of the authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out user and blacklist token
 *     description: Log out the authenticated user and blacklist the token.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *       required:
 *         - _id
 *         - name
 *         - email
 *
 *     UserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *       required:
 *         - email
 *         - password
 *         - name
 *
 *     UserLoginInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
