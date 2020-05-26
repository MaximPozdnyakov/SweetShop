const express = require("express");
const router = express.Router();
const { index, store, destroy } = require("../../controllers/CartController");

// Product Model
const CartItem = require("../../models/CartItem");

// @route   GET api/cart
// @desc    Get All Products In Cart
// @access  Public
router.get("/", index);

// @route   POST api/cart
// @desc    Add New Item In Cart
// @access  Public
router.post("/", store);

// @route   DELETE api/cart
// @desc    Delete Item From Cart
// @access  Public
router.delete("/:id", destroy);

// @route   PUT api/cart
// @desc    Update Quantity Of Item From Cart
// @access  Public
router.put("/:id", update);

module.exports = router;
