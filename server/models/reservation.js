const mongoose = require('mongoose');
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    screeningRoomId: {
        type: String,
        required: true
    },
    seat: {
        type: String, //maybe array? eg. [comedy, action]
        required: true
    },
    date: {
        type: date,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

function validateReservation(reservation) {
    const schema = {
        screeningRoomId: Joi.string().required(),
        date: Joi.date().min('now').required(),
        seat: Joi.string().required()
    };

    return Joi.validate(reservation, schema)
}

module.exports = {
    Reservation: Reservation,
    validateReservation: validateReservation
}