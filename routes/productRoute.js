const express = require('express');
const productRouter = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const { getProductByCategoryId, getProductDetailsById, addProduct, deleteProduct, getAllProducts } = require('../controller/productController');
const blacklistMiddleware = require('../middleware/blacklistMiddleware');

productRouter.get('/category/:categoryId', authenticateToken,blacklistMiddleware, getProductByCategoryId);

productRouter.get('/getAll', authenticateToken,blacklistMiddleware, getAllProducts);

productRouter.get('/:id', authenticateToken, blacklistMiddleware,getProductDetailsById);

productRouter.post('/create', authenticateToken, blacklistMiddleware,addProduct);

productRouter.delete('/:productId', authenticateToken,blacklistMiddleware, deleteProduct);

module.exports = { productRouter };