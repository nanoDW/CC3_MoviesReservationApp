const mongoose = require('mongoose');
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ScreeningSchema = new mongoose.Schema({
    screeningRoomId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    seats: []
});

const Screening = mongoose.model('Screening', ScreeningSchema);

function validateScreening(screening) {
    const schema = {
        screeningRoomId: Joi.string(),
        movieId: Joi.string(),
        date: Joi.date().min('now')
    };

    return Joi.validate(screening, schema)
}

module.exports = {
    Screening: Screening,
    validateScreening: validateScreening
}
