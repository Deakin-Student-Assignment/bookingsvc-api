const express = require('express');
const router = express.Router();

var db = require("../../config/");


// INITIALISES & OPENS A DATABASE CONNECTION
db.open(function (callback) {

    if (error) {
        return error;
        console.log("Database already connected");
    }

});

isEmptyObject = function (obj, callback) {
    for (var _id in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, _id)) {
            callback = false;
            return callback;
        }
    }
    callback = true;
    return callback;
}

// CREATE OPERATION
router.post('/', (req, res, next) => {
    var booking;
    res.set('Access-Control-Allow-Origin', '*');
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

// READ OPERATION - by User ID
/*router.get('/:email', (req, res, next) => {
    var rBooking;

    rBooking = "{ \"_id\": \"" + req.params.email + "\"}";
    rBooking = JSON.parse(rBooking);

    try {
        db.getBooking(rBooking, function (err, result) {
            if (err) {
                throw err;
            } else {
                rBooking = result;

                if (isEmptyObject(rBooking)) {
                    res.status(200).json({
                        message: "No booking retrieved for: ",
                        booking: req.params.email
                    });
                } else {
                    res.status(200).json({
                        message: "Booking retrieved: ",
                        booking: rBooking
                    });
                }

            }
        });
    } catch (err) {
        throw err;
    }
});*/

// READ OPERATION - by Delivery Date
router.get('/:date', (req, res) => {
    var bookingdate;

    bookingdate = "{\"bookingdate.start\":\"" + req.params.date + "\"}"; // "{ \"start\": \"" + req.params.date + "\"}"

    bookingdate = JSON.parse(bookingdate);

    try {
        db.getBookingByDate(bookingdate, function (err, result) {
            var rBooking;
            if (err) {
                throw err;
            } else {
                if (isEmptyObject(req.params.date)) {
                    res.status(204).json({
                        message: "No booking retrieved."
                    });
                } else {
                    msg = result;
                    res.status(200).json({
                        message: "Booking retrieved for",
                        bookings: msg
                    });
                }
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
router.delete('/:email', (req, res, next) => {
    var rBooking;

    rBooking = "{ \"_id\": \"" + req.params.email + "\"}";
    rBooking = JSON.parse(rBooking);

    try {
        db.doDelete(rBooking, function (err, result) {
            if (err) {
                throw errr;
            } else {
                booking = result;
                res.status(200).json({
                    message: 'Booking deleted',
                    booking: rBooking
                });
            }

        });
    } catch (error) {
        throw error;
    }

});

module.exports = router;