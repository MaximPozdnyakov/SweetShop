const express = require("express");
const router = express.Router();
const { index, store } = require("../../controllers/ProductController");

// Product Model
const Product = require("../../models/Product");

// @route   GET api/products
// @desc    Get All Products
// @access  Public
router.get("/", index);

// @route   POST api/products
// @desc    post new Product
// @access  Private
router.post("/", store);

module.exports = router;
