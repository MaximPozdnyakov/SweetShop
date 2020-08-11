const express = require("express");
const router = express.Router();
const { index } = require("../../controllers/ProductController");

// @route   GET api/products
// @desc    Get All Products
// @access  Public
router.get("/", index);

module.exports = router;
