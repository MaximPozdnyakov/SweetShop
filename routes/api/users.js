const express = require("express");
const {
  index,
  store,
  login,
  logout,
} = require("../../controllers/UserController");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../../config/auth");

const router = express.Router();

// Product Model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Get All Users
// @access  Public
router.get("/", index);

// @route   POST api/user
// @desc    Register new user
// @access  Public
router.post("/", store);

// Login Handle
router.post("/login", login);

// Logout Handle
router.post("/logout", logout);

module.exports = router;
