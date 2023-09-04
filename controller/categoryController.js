const { Category } = require("../models/categoryModel");

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            message: "Retrieved all categories successfully",
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const existingCategory = await Category.findOne({ categoryName });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                error: "Category already exists, add different category"
            });
        }

        const newCategory = new Category({ categoryName });
        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            msg: error.message
        });
    }
};



const deleteCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const category = await Category.deleteOne({ _id: categoryId });

        if (category.deletedCount === 0) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: "Category not found"
                });
        }

        res.status(204).json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            msg: error.message
        });
    }
};

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategoryById
};