const mongoose = require('mongoose');
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ScreeningRoomSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    cinema: {
        type: String,
        required: true
    },
    screeningRoom: {
        type: String,
        required: true
    },
    seats: {
        type: Object
    }
});

const ScreeningRoom = mongoose.model('ScreeningRoom', ScreeningRoomSchema);

function validateScreeningRoom(screeningRoom) {
    const schema = {
        city: Joi.string(),
        cinema: Joi.string(),
        screeningRoom: Joi.string(),
        seats: Joi.object(),
    };

    return Joi.validate(screeningRoom, schema)
}

module.exports = {
    ScreeningRoom: ScreeningRoom,
    validateScreeningRoom: validateScreeningRoom
}