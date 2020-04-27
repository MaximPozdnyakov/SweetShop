const mongoose = require("mongoose");

// Create Schema
const CartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    srcToImg: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

module.exports = CartItem = mongoose.model("CartItem", CartSchema);
