const express = require("express");
const router = express.Router();

// Product Model
const Product = require("../../models/Product");

// @route   GET api/products
// @desc    Get All Products
// @access  Public
router.get("/", (req, res) => {
    Product.find()
        .then((products) => res.status(200).json(products))
        .catch((err) => console.log(err));
});

module.exports = router;
