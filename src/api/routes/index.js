const express = require('express');
const router = express.Router();
var jsonDiff = require('json-diff');

var db = require("../../config/");


// INITIALISES & OPENS A DATABASE CONNECTION
db.open(function (callback) {

    if (error) {
        return error;
        console.log("Database already connected");
    }

});


// CREATE OPERATION
router.post('/', (req, res, next) => {
    var booking;

    try {
        db.doInsertOne(req.body, function (err, result) {
            if (err) {
                throw err;
            } else {
                booking = result;
                res.status(200).json({
                    message: "Booking created.",
                    booking: booking.ops
                });
            }
        });
    } catch (error) {
        throw error;
    }
});

// READ OPERATION
router.get('/', (req, res, next) => {
    var rBooking;
    try {
        db.getBooking(req.body, function (err, result) {
            if (err) {
                throw err;
            } else {
                rBooking = result;
                res.status(200).json({
                    message: "Booking retrieved: ",
                    booking: rBooking
                });
            }
        });
    } catch (err) {
        throw err;
    }
});


// UPDATE OPERATION
router.put('/', (req, res, next) => {
    var booking;

    var newbooking = JSON.stringify(req.body);
    var bookingObj = JSON.parse(newbooking);

    var key = "{\"_id\":\"" + bookingObj._id + "\"}"
    var keyObject = JSON.parse(key);


    try {
        db.getBooking(keyObject, function (err, result) {

            if (err) {
                throw err;
            } else {
                booking = result;

                db.doUpdate(keyObject, bookingObj, function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        msg = result;
                        res.status(200).json({
                            message: "Booking updated.",
                            booking: msg.ops
                        });
                    }
                });
            }
        });
    } catch (err) {
        throw err;
    }

});


// DELETE OPERATION
router.delete('/', (req, res, next) => {

    try {
        db.doDelete(req.body, function (err, result) {
            if (err) {
                throw errr;
            } else {
                booking = result;
                res.status(200).json({
                    message: 'Booking deleted.'
                });
            }

        });
    } catch (error) {
        throw error;
    }

});

module.exports = router;