const express = require("express");
const router = express.Router();
const {
    index,
    store,
    destroy,
    destroyByOwner,
} = require("../../controllers/CartController");

// @route   GET api/cart
// @desc    Get All User Products In Cart
// @access  Public
router.post("/", index);

// @route   POST api/cart
// @desc    Add New Item In Cart
// @access  Public
router.post("/store", store);

// @route   DELETE api/cart
// @desc    Delete Item From Cart
// @access  Public
router.delete("/owner", destroyByOwner);

// @route   DELETE api/cart
// @desc    Delete Item From Cart
// @access  Public
router.delete("/:id", destroy);

// @route   PUT api/cart
// @desc    Update Quantity Of Item From Cart
// @access  Public
router.put("/:id", update);

module.exports = router;
