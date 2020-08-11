// Product Model
const Product = require("../models/Product");

index = (req, res) => {
    Product.find()
        .then((products) => res.status(200).json(products))
        .catch((err) => console.log(err));
};

module.exports = {
    index,
};
