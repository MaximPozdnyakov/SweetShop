const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("Users", UserSchema);
