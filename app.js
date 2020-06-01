const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const bookingRoute = require("./src/api/routes/");
require("dotenv").config();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

// ROUTES
app.use('/', bookingRoute);
app.use('/booking', bookingRoute);


module.exports = app;