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

// @route   POST api/products
// @desc    post new Product
// @access  Private
router.post("/", (req, res) => {
  console.log(req.body);
  const newProduct = new Product({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    srcToImg: req.body.srcToImg,
  });
  newProduct.save().then((product) => res.json(product));
});

module.exports = router;
