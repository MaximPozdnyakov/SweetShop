const mongoose = require("mongoose");

// Create Schema
const CartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

module.exports = CartItem = mongoose.model("CartItem", CartSchema);
