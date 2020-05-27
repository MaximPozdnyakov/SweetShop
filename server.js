const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./config/config.env" });

const app = express();

// Passport Config
require("./config/passport")(passport);

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Bodyparser middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Apply routes
const products = require("./routes/api/products");
const cart = require("./routes/api/cart");
const users = require("./routes/api/users");
const pay = require("./routes/pay");

//Connect to mongo
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/users", users);
app.use("/pay", pay);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
