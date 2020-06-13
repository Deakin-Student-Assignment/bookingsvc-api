// MongoDB driver
var MongoClient = require("mongodb").MongoClient;
//var ObjectId = require("mongodb").ObjectID;

require("dotenv").config();

var database, collection;

module.exports.open = function (callback) {
    //console.log("Connecting to database");
    MongoClient.connect(process.env.CONNECTION_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (error, client) => {
        if (error) {
            throw error;
            console.log("Error initialising database");
        }
        database = client.db(process.env.DB_NAME);
        collection = database.collection(process.env.DB_COLLECTION_NAME);

        console.log("Connected to database: " + process.env.DB_NAME + " collection: " + process.env.DB_COLLECTION_NAME);

    });
};

module.exports.doInsertOne = function (request, callback) {
    var booking;

    booking = collection.insertOne(request, function (err, result) {
        if (err) {
            return status(500).send(error);
        } else {
            booking = result;
            return callback(null, booking);

        }

    });
};


module.exports.getBooking = function (request, callback) {
    var booking;
    booking = collection
        .find(request, function (err, cursor) {
            if (err) {
                throw err
            } else {
                cursor.toArray(function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        booking = result;
                    }
                    return callback(null, booking);
                });
            }

        });
};

module.exports.getBookingByDate = function (request, callback) {
    var booking;
    collection
        .find(request, function (err, cursor) {
            if (err) {
                throw err;
            } else {
                cursor.toArray(function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        booking = result;
                    }
                    return callback(null, booking);
                });
            };
        });

};

module.exports.doUpdate = function (request, newvalues, callback) {
    var booking;

    booking = collection
        .replaceOne(request, newvalues, function (err, result) {
            if (err) {
                callback(err);
            } else {

                booking = result;

            }
            return callback(null, JSON.parse(result));
        });
}

module.exports.doDelete = function (request, callback) {
    var booking;

    booking = collection
        .deleteOne(request, function (err, result) {
            if (err) {
                callback(err);
            } else {
                booking = result;
            }
            return callback(null, JSON.parse(result));
        });
}