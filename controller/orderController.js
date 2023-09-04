const { Order } = require("../models/orderModel");
const { Product } = require("../models/productModel");
const { User } = require("../models/userModel");

const newOrderPlace = async (req, res) => {
    try {
        const { products } = req.body;
        const {userId} = req.user;

        const productIds = products.map((product) => product.productId);
        const existingProducts = await Product.find({ _id: { $in: productIds } });

        if (existingProducts.length !== productIds.length) {
            return res.status(400).json({
                success: false,
                error: 'Products not found'
            });
        }

        const totalPrice = products.reduce((total, product) => {
            const matchingProduct = existingProducts.find((p) => p._id.toString() === product.productId);
            return total + matchingProduct.price * product.quantity;
        }, 0);
        console.log(totalPrice)
        const newOrder = new Order({ userId, products, totalPrice });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: newOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};


const getOrderHistoryByUserId = async (req, res) => {
    try {
        const { userId } = req.user;
        const orders = await Order.find({ userId });

        res.status(200).json({
            success: true,
            message: 'Order history retrieved successfully',
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            msg: error.message
        });
    }
};

const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const userId = req.user.userId;

        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.json({
            success: true,
            message: 'Order details retrieved successfully',
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

module.exports = {
    newOrderPlace,
    getOrderHistoryByUserId,
    getOrderDetailsByOrderId,
};