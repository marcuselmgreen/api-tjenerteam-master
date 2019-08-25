var employee_user = require('./employee_user_Model');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;
var request = require('request');

exports.params = function (req, res, next, id) {

    employee_user.findById(id)
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

exports.get = function (req, res, next) {

    employee_user.find({})
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
    let fbUserInfo, newUser, tempUser, userObject;


    request('https://graph.facebook.com/me?fields=name,email,picture&access_token=' + req.body.fbToken, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fbUserInfo = JSON.parse(body);

            employee_user.find()
                .select('-password')
                .exec()
                .then(function (users) {

                    tempUser = users.find(u => u.email === fbUserInfo.email);

                    if (tempUser) {
                        newUser = {
                            user: tempUser,
                            exist: true,
                            jwt: signToken(tempUser._id)
                        };
                        res.json(newUser);

                    } else {
                        userObject = fillUserInformation(fbUserInfo);
                        userObject.role.push('staff');

                        employee_user.create(userObject)
                            .then(function (user) {

                                let newUser = {
                                    user: user,
                                    exist: false,
                                    jwt: signToken(user._id)
                                };
                                res.json(newUser);

                            }, function (err) {
                                console.log('There was an error in creating employee user. Err: ' + err)
                            });

                    }
                }, function (err) {
                    console.log('Problem in finding users in db. Error: ' + err)
                });
        } else {
            console.log('Error when getting FB profile information. Error: ' + error);
        }

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


function fillUserInformation(fbUserInfo) {

    let user = {};
    if (fbUserInfo) {
        user = {
            facebookId: fbUserInfo.id,
            name: fbUserInfo.name,
            email: fbUserInfo.email,
            job_type: [],
            canWorkLocations: [],
            profilePicture: '0',
            city: '0',
            address: '0',
            zipCode: '0',
            phoneNumber: '0',
            profileDescription: '0',
            driversLicense: '0',
            ownsCar: '0',
            englishLanguageSkill: '0',
            danishLanguageSkill: '0',
            role: []
        };
        return user;

    } else {
        return user;
    }
}
