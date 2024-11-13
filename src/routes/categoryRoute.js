const express = require("express");
const categoryRouter = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const {
  getAllCategories,
  addCategory,
  deleteCategoryById,
} = require("../controller/categoryController");
const blacklistMiddleware = require("../middleware/blacklistMiddleware");

categoryRouter.get(
  "/getAll",
  authenticateToken,
  blacklistMiddleware,
  getAllCategories
);

categoryRouter.post(
  "/create",
  authenticateToken,
  blacklistMiddleware,
  addCategory
);

categoryRouter.delete(
  "/:categoryId",
  authenticateToken,
  blacklistMiddleware,
  deleteCategoryById
);

module.exports = { categoryRouter };
