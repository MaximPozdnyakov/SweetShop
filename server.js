const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

const app = express();

//Bodyparser middleware
app.use(express.json());

// CORS middleware
var corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const products = require("./routes/api/products");
const cart = require("./routes/api/cart");
const users = require("./routes/api/users");

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
