const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './config/config.env' });

const products = require('./routes/api/products');

const app = express();

//Bodyparser midlewear
app.use(express.json());

//Connect to mongo
mongoose.connect( process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/products', products);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

