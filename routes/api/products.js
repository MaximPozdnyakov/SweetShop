const express = require("express");
const router = express.Router();

// Item Model
const Product = require("../../models/Product");

// @route GET api/products
// @desc Get All Products
// @access Public
router.get('/', (res, req) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => console.log(err))
})

module.exports = router;
