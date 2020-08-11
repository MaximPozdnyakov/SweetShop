const mongoose = require("mongoose");

// Create Schema
const GoogleUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = GoogleUser = mongoose.model("GoogleUsers", GoogleUserSchema);
