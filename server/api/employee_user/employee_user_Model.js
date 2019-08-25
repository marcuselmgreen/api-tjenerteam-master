const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const EmployeeUserSchema = new Schema({

    facebookId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    job_type: {
        type: Array,
        required: true
    },

    canWorkLocations: {
        type: Array,
        required: true
    },

    profilePicture: {
        type: String,
    },

    city: {
        type: String,
        required: true
    },


    address: {
        type: String,
        required: true
    },

    zipCode: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    profileDescription: {
        type: String,
    },

    driversLicense: {
        type: String,
        required: true
    },

    ownsCar: {
        type: String,
        required: true
    },

    englishLanguageSkill: {
        type: String,
        required: true
    },

    danishLanguageSkill: {
        type: String,
        required: true
    },

    role: {
        type: Array,
        required: true
    }
});

EmployeeUserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    this.password = this.encryptPassword(this.password);
    next();
});

EmployeeUserSchema.methods = {

    // check the passwords on signin
    authenticate: function(plainTextPword) {
        return bcrypt.compareSync(plainTextPword, this.password);
    },

    // hash the passwords
    encryptPassword: function(plainTextPword) {
        if (!plainTextPword) {
            return ''
        } else {
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPword, salt);
        }
    },

    toJson: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
};


module.exports = mongoose.model('employee_users', EmployeeUserSchema);
