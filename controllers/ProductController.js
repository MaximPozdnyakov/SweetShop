index = (req, res) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((err) => console.log(err));
};

store = (req, res) => {
  console.log(req.body);
  const newProduct = new Product({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    srcToImg: req.body.srcToImg,
  });
  newProduct.save().then((product) => res.json(product));
};

module.exports = {
  index,
  store,
};
