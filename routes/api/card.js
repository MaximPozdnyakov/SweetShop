const express = require("express");
const router = express.Router();

// Product Model
const CardItem = require("../../models/CardItem");

// @route   GET api/card
// @desc    Get All Products In Card
// @access  Public
router.get("/", async (req, res) => {
    try {
        const cardItems = await CardItem.find();
        return res.status(200).json(cardItems);
    } catch (err) {
        console.log("Error happened while try to get card items");
    }
});

// @route   POST api/card
// @desc    Add New Item In Card
// @access  Public
router.post("/", async (req, res) => {
    try {
        const newCardItem = new CardItem({
            title: req.body.title,
            price: req.body.price,
            srcToImg: req.body.srcToImg,
        });

        const savedCardItem = await newCardItem.save();

        return res.status(201).json(savedCardItem);
    } catch (err) {
        console.log("Error happened while try to add item to card");
    }
});

// @route   DELETE api/card
// @desc    Delete Item From Card
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const infoAboutDelete = await CardItem.deleteOne({
            _id: req.params.id,
        });

        return res.status(200).json(infoAboutDelete);
    } catch (err) {
        console.log("Error happened while try to delete item from card");
    }
});

// @route   PUT api/card
// @desc    Update Quantity Of Item From Card
// @access  Public
router.put("/:id", async (req, res) => {
    try {
        const infoAboutUpdate = await CardItem.updateOne(
            { _id: req.params.id },
            { quantity: req.body.quantity }
        );

        return res.status(200).json(infoAboutUpdate);
    } catch (err) {
        console.log("Error happened while try to update item from card");
    }
});

module.exports = router;
