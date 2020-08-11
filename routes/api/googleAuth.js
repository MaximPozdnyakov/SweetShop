const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// auth login
router.get("/login", (req, res) => {
    jwt.verify(req.session.token, "secretkey", (err, authData) => {
        if (err) {
            res.json({ msg: "Forbidden" });
        } else {
            return res.json(authData);
        }
    });
});

// auth logout
router.get("/logout", (req, res) => {
    jwt.verify(req.session.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            req.logout();
            req.session.token = undefined;
            return res.json({ msg: "You are logout" });
        }
    });
});

// auth with google+
router.get(
    "/",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get("/redirect", passport.authenticate("google"), (req, res) => {
    jwt.sign(
        { user: req.user },
        "secretkey",
        { expiresIn: "1000000s" },
        (err, token) => {
            if (err) {
                console.log("err", err);
            }
            req.session.token = token;
            return res.redirect("http://localhost:3000/store");
        }
    );
});

module.exports = router;
