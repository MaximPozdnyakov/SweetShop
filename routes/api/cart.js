const express = require("express");
const router = express.Router();

// Product Model
const CartItem = require("../../models/CartItem");

// @route   GET api/cart
// @desc    Get All Products In Cart
// @access  Public
router.get("/", async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        return res.status(200).json(cartItems);
    } catch (err) {
        console.log("Error happened while try to get cart items");
    }
});

// @route   POST api/cart
// @desc    Add New Item In Cart
// @access  Public
router.post("/", async (req, res) => {
    try {
        const newCartItem = new CartItem({
            _id: req.body.id,
            title: req.body.title,
            price: req.body.price,
            srcToImg: req.body.srcToImg,
        });

        const savedCartItem = await newCartItem.save();

        return res.status(201).json(savedCartItem);
    } catch (err) {
        console.log("Error happened while try to add item to cart");
    }
});

// @route   DELETE api/cart
// @desc    Delete Item From Cart
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const infoAboutDelete = await CartItem.deleteOne({
            _id: req.params.id,
        });

        return res.status(200).json(infoAboutDelete);
    } catch (err) {
        console.log("Error happened while try to delete item from cart");
    }
});

// @route   PUT api/cart
// @desc    Update Quantity Of Item From Cart
// @access  Public
router.put("/:id", async (req, res) => {
    try {
        const infoAboutUpdate = await CartItem.updateOne(
            { _id: req.params.id },
            { quantity: req.body.quantity }
        );

        return res.status(200).json(infoAboutUpdate);
    } catch (err) {
        console.log("Error happened while try to update item from cart");
    }
});

module.exports = router;
