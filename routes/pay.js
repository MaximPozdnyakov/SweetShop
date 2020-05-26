const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/charge", (req, res) => {
  const { product, token } = req.body;

  const idempotency_key = uuidv4();

  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges
        .create(
          {
            amount: product.price * 100,
            description: "SweetShop",
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          {
            idempotency_key,
          }
        )
        .then((charge) => {
          console.log(charge);
          return res.json({
            errors: [],
            status: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({
            errors: err,
            status: "failure",
          });
        })
    );
});

module.exports = router;
