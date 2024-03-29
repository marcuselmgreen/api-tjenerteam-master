var corporation_user = require('./corporation_user_Model');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;

exports.params = function (req, res, next, id) {

    corporation_user.findById(id)
        .select('-password')
        .exec()
        .then(function (user) {
            if (!user) {
                next(new Error('No staff_user with that id'));
            } else {
                req.user = user;
                next();
            }
        }, function (err) {
            next(err);
        });
};

exports.changePassword = function (req, res, next) {
    let id = req.user.id;

    let oldPassword = req.body.user.oldPassword;
    let newPassword = req.body.user.newPassword;

    corporation_user.findById(id)
        .select('-password')
        .exec()
        .then(function (user) {
            if (!user) {
                next(new Error('No staff_user with that id'));
            } else {
                if (user.comparePassword(oldPassword, req.user.password)) {
                    var user = req.user;
                    user.password = newPassword;
                    var update = req.body;

                    _.merge(user, update);
                    user.save(function (err, saved) {
                        if (err) {
                            next(err);
                        } else {
                            res.json(saved.toJson());
                        }
                    })
                } else {
                    next(new Error('Old password is incorrect'));
                }
            }
        }, function (err) {
            next(err);
        });
};

exports.get = function (req, res, next) {

    corporation_user.find({})
        .select('-password')
        .exec()
        .then(function (users) {
            res.json(users.map(function (user) {
                return user.toJson();
            }));
        }, function (err) {
            next(err);
        });
};

exports.getOne = function (req, res, next) {
    var user = req.user.toJson();
    res.json(user.toJson());
};


exports.put = function (req, res, next) {
    var user = req.user;
    var update = req.body;

    _.merge(user, update);

    user.save(function (err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved.toJson());
        }
    })
};

exports.post = function (req, res, next) {

    var newUser = new corporation_user(req.body);

    newUser.save(function (err, user) {
        if (err) { return next(err); }

        var token = signToken(user._id);
        res.json({ token: token, user: user });
    });
};

exports.delete = function (req, res, next) {
    req.user.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed.toJson());
        }
    });
};

exports.me = function (req, res) {
    res.json(req.user.toJson());
};



