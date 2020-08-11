// Product Model
const CartItem = require("../models/CartItem");

index = async (req, res) => {
    try {
        const cartItems = await CartItem.find({ ownerId: req.body.userId });
        return res.status(200).json(cartItems);
    } catch (err) {
        console.log("Error happened while try to get cart items");
    }
};

store = async (req, res) => {
    try {
        const newCartItem = new CartItem({
            productId: req.body.productId,
            ownerId: req.body.userId,
            quantity: 1,
        });

        const savedCartItem = await newCartItem.save();

        return res.status(201).json(savedCartItem);
    } catch (err) {
        console.log("Error happened while try to add item to cart");
        console.log(err);
    }
};

destroy = async (req, res) => {
    try {
        const infoAboutDelete = await CartItem.deleteOne({
            _id: req.params.id,
            ownerId: req.body.userId,
        });

        return res.status(200).json(infoAboutDelete);
    } catch (err) {
        console.log("Error happened while try to delete item from cart");
    }
};

destroyByOwner = (req, res) => {
    CartItem.deleteMany({
        ownerId: req.body.userId,
    })
        .then((result) => {
            return res.json(result.data);
        })
        .catch((err) => console.log(err));
};

update = async (req, res) => {
    try {
        const infoAboutUpdate = await CartItem.updateOne(
            { _id: req.params.id, ownerId: req.body.userId },
            { quantity: req.body.quantity }
        );
        return res.status(200).json(infoAboutUpdate);
    } catch (err) {
        console.log("Error happened while try to update item from cart");
    }
};

module.exports = {
    index,
    store,
    destroy,
    destroyByOwner,
    update,
};
