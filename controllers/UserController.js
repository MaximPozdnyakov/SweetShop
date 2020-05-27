const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

index = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log("Error happened while try to get users");
  }
};

store = async (req, res) => {
  try {
    const { email, password1, password2 } = req.body;

    User.findOne({ email })
      .then((doc) => {
        if (doc) return res.json({ msg: "Sorry, that email is already taken" });

        if (
          validatePassword(password1) &&
          validateEmail(email) &&
          password1 === password2
        ) {
          const newUser = new User({
            email,
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
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Bad request" });
  }
};

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

// Login
login = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.json({
        msg: "Password and email don`t match",
      });
    }

    if (!user) {
      return res.json({
        msg: "Password and email don`t match",
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.json({
          msg: "Password and email don`t match",
        });
      }

      jwt.sign({ user }, "secretkey", { expiresIn: "3600s" }, (err, token) => {
        if (err) throw err;
        return res.json({
          token,
          link: "/",
          userId: user._id,
        });
      });
    });
  })(req, res, next);
};

// Logout
logout = (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/login");
};

module.exports = {
  index,
  store,
  login,
  logout,
};
