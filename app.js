const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const bookingRoute = require("./src/api/routes/");

const cors = require("cors");

require("dotenv").config();

const CorsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
};

app.use(cors(CorsOptions));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

// ROUTES
app.use('/', bookingRoute);
app.use('/booking', bookingRoute);


module.exports = app;