const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookingSchema = new Schema({

    staffType: {
        type: String,
        required: true
    },

    numberOfStaff: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    contactPerson: {
        type: String,
        required: true
    },

    bookingPerson: {
        type: String,
        required: true
    },

    phoneNumber: {
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

    arrangementType: {
        type: String,
        required: true
    },

    arrangementTypeOther: {
        type: String,
    },

    extraWorkHours: {
        type: String,
        required: true
    },

    foodIncluded: {
        type: String,
        required: true
    },

    jobDescription: {
        type: String,
    },

    accessInformation: {
        type: String,
    },

    upperDressCode: {
        type: String,
        required: true
    },

    upperDressCodeOther: {
        type: String,
    },

    lowerDressCode: {
        type: String,
        required: true
    },

    lowerDressCodeOther: {
        type: String,
    },

    shoesDressCode: {
        type: String,
        required: true
    },

    shoesDressCodeOther: {
        type: String,
    },

    itemToBring: {
        type: String,
    },

    languageSkill: {
        type: String,
    },

    staffGender: {
        type: String,
    },

    jobExperience: {
        type: String,
    },

    transportWage: {
        type: String,
        required: true
    },

    hourlyWage: {
        type: String,
        required: true
    },

    wageTotal: {
        type: String,
        required: true
    },

    priceTotal: {
        type: String,
        required: true
    },

    selectedStaff: {
        type: Array,
        required: true
    },

    appliedStaff: {
        type: Array,
        required: true
    },

    createdByCorporation_user: {type: Schema.Types.ObjectId, ref: 'corporation_user'}

});

module.exports = mongoose.model('booking', BookingSchema);

