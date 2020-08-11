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
// @desc    Get Existed User
// @access  Public
router.get("/", verifyToken, index);

// @route   POST api/user
// @desc    Register new user
// @access  Public
router.post("/", store);

// Login Handle
router.post("/login", login);

// Logout Handle
router.post("/logout", verifyToken, logout);

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = router;
