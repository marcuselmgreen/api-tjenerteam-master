const Booking = require('./bookingModel');
const _ = require('lodash');
const logger = require('../../util/logger');

exports.params = function (req, res, next, id) {
    Booking.findById(id)
        .populate('createdByUser', 'username')
        .exec()
        .then(function (booking) {
            if (!booking) {
                next(new Error('No booking with that id'));
            } else {
                req.booking = booking;
                next();
            }
        }, function (err) {
            next(err);
        });
};

exports.get = function (req, res, next) {

    Booking.find({})
        .populate('createdByUser', '-password')
        .exec()
        .then(function (bookings) {
            res.json(bookings);
        }, function (err) {
            next(err);
        });
};

exports.getOne = function (req, res, next) {
    var booking = req.post;
    res.json(booking);
};

exports.put = function (req, res, next) {

    let booking = req.booking;


    let update = req.body;

    _.merge(booking, update);

    booking.save(function (err, saved) {
        if (err) {
            next(err);
        } else {
            console.log(saved)
            res.json(saved);
        }
    })
};

exports.post = function (req, res, next) {
    let bookings = req.body;


    Booking.create(bookings)
        .then(function (booking) {
            res.json(booking);
        }, function (err) {
            logger.error(err);
            next(err);
        });
};

exports.delete = function (req, res, next) {
    req.booking.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
