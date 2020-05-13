const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

// Product Model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Get All Users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log("Error happened while try to get users");
  }
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const regex = /^[A-Za-z]\w{7,14}$/;
  return password.match(regex);
  // password between 7 to 16 characters which contain only characters,
  // numeric digits, underscore and first character must be a letter
}

// @route   POST api/user
// @desc    Register new user
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { email, address, password1, password2 } = req.body;
    if (
      validatePassword(password1) &&
      validateEmail(email) &&
      address !== "" &&
      password1 === password2
    ) {
      const newUser = new User({
        email,
        address,
        password: password1,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((data) => {
              return res.status(201).json(data);
            })
            .catch((err) => console.log(err));
        });
      });
    } else {
      return res.status(400).json({ msg: "Bad request" });
    }
  } catch (err) {
    console.log("Error happened while try to register user");
    return res.status(400).json({ msg: "Bad request" });
  }
});

// @route   PUT api/cart
// @desc    Update Quantity Of Item From Cart
// @access  Public
// router.put("/:id", async (req, res) => {
//   try {
//     const infoAboutUpdate = await User.updateOne(
//       { _id: req.params.id },
//       { quantity: req.body.quantity }
//     );

//     return res.status(200).json(infoAboutUpdate);
//   } catch (err) {
//     console.log("Error happened while try to update item from cart");
//   }
// });

module.exports = router;
