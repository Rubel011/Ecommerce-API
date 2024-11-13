const { Category } = require("../models/categoryModel");
const { Product } = require("../models/productModel");

const getProductByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const product= await Product.find({categoryId });
        res.status(200).json({
            success: true,
            message: 'Retrieved All Products by category Id successful',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            message: 'Retrieved all products successfully',
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const getProductDetailsById = async (req, res) => {
    try {
        const id = req.params.id;

        console.log(id);
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Retrieved Product Details successfully',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        });
    }
};

const addProduct = async (req, res) => {
    try {
        const { productId,title, price, description, availability, categoryName, imageUrl} = req.body;

        const existingProduct = await Product.findOne( {productId} );
        const existingCategory = await Category.findOne({categoryName});

        if (!existingCategory) {
            return res.status(400).json({
                success: false,
                error: 'Category does not exist'
            });
        }
        if(existingProduct){
            return res.status(400).json({
                success: false,
                error: 'Product Id already exist, use different product id instead'
            });
        }

        const newProduct = new Product({
            productId,
            title,
            price,
            description,
            availability,
            categoryId: existingCategory._id,
            imageUrl,
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        const result = await Product.deleteOne({ _id: productId });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }

        res.status(204).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

module.exports = { getProductByCategoryId, getProductDetailsById, addProduct, deleteProduct, getAllProducts };