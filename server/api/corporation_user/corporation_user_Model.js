const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const CorporationUserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    cvr: {
        type: String,
        required: true
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

    contactPerson: {
        type: String,
        required: true
    },

    department: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    billingEmail: {
        type: String,
        required: true
    },

    ean: {
        type: String
    },

    gdpr: {
        type: Boolean,
        required: true
    },
    role: {
        type: Array,
        required: true
    }
});

CorporationUserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    this.password = this.encryptPassword(this.password);
    next();
});

CorporationUserSchema.methods = {
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
    },

    comparePassword: function(plaintext, currentPassword) {
        return bcrypt.compareSync(plaintext, currentPassword);
    }
};


module.exports = mongoose.model('corporation_users', CorporationUserSchema);
