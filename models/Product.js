const mongoose = require('mongoose');

// Create Schema
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgName: {
        type: String,
        required: true
    }
});

module.exports = Product = mongoose.model('Products', ProductSchema);

