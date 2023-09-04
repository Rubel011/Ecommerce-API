const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        require: true
    }
}, {
    versionKey: false
});

const Category = new mongoose.model('Category', categorySchema)
module.exports = { Category }