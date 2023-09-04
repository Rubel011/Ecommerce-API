const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    availablity: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    }

}
)

const ProductModel = mongoose.model("Product", productSchema)
module.exports = { ProductModel }