const express = require("express");
const orderRouter = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const {
  newOrderPlace,
  getOrderHistoryByUserId,
  getOrderDetailsByOrderId,
} = require("../controller/orderController");

orderRouter.post("/order_place", authenticateToken, newOrderPlace);

orderRouter.get("/order_history", authenticateToken, getOrderHistoryByUserId);

orderRouter.get("/:orderId", authenticateToken, getOrderDetailsByOrderId);

module.exports = { orderRouter };
