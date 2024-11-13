const express = require("express");
const productRouter = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const {
  getProductByCategoryId,
  getProductDetailsById,
  addProduct,
  deleteProduct,
  getAllProducts,
} = require("../controller/productController");
const blacklistMiddleware = require("../middleware/blacklistMiddleware");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Unique product ID
 *         title:
 *           type: string
 *           description: Product title
 *         imageUrl:
 *           type: string
 *           description: URL of the product image
 *         price:
 *           type: number
 *           description:
 *         categoryId:
 *           type: string
 *           description: ID of the product's category
 *         availability:
 *           type: boolean
 *           description: Product availability
 *         description:
 *           type: string
 *           description: Product description
 *       example:
 *         productId: "12345"
 *         title: "Sample Product"
 *         imageUrl: "https://example.com/sample-product.jpg"
 *         price: 19.99
 *         categoryId: "abc123"
 *         availability: true
 *         description: "This is a sample product."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewProduct:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Unique product ID
 *         title:
 *           type: string
 *           description: Product title
 *         imageUrl:
 *           type: string
 *           description: URL of the product image
 *         price:
 *           type: number
 *           description: Product price
 *         description:
 *           type: string
 *           description: Product description
 *         availability:
 *           type: boolean
 *           description: Product availability
 *         categoryName:
 *           type: string
 *           description: Name of the product's category
 *       required:
 *         - productId
 *         - title
 *         - imageUrl
 *         - price
 *         - description
 *         - availability
 *         - categoryName
 *       example:
 *         productId: "54321"
 *         title: "New Sample Product"
 *         imageUrl: "https://example.com/new-sample-product.jpg"
 *         price: 29.99
 *         description: "This is a new sample product."
 *         availability: true
 *         categoryName: "Electronics"
 */

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get products by category ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to filter products
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with a list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal Server Error
 */
productRouter.get("/category/:categoryId", getProductByCategoryId);

/**
 * @swagger
 * /products/getAll:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Successful response with a list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal Server Error
 */
productRouter.get("/getAll", getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal Server Error
 */
productRouter.get("/:id", getProductDetailsById);

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
productRouter.post(
  "/create",
  authenticateToken,
  blacklistMiddleware,
  addProduct
);

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal Server Error
 */
productRouter.delete(
  "/:productId",
  authenticateToken,
  blacklistMiddleware,
  deleteProduct
);

module.exports = { productRouter };
