const mongoose = require("mongoose");
const Joi = require('joi');
const config = require('config');
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true
    },
    surname: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 300,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 1500,
        required: true,
    },
    phone: {
        type: String,
    },
    reservations: [],
    isAdmin: Boolean
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
    }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
    const schema = {
        email: Joi.string().min(5).max(300).required().email(),
        password: Joi.string().min(4).max(1500).required()
    };

    return Joi.validate(user, schema);
}

function validateNewUser(user) {
    const schema = {
        name: Joi.string().min(4).max(50).required(),
        surname: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(5).max(300).required().email(),
        password: Joi.string().min(4).max(1500).required(),
        phone: Joi.string()
        };

    return Joi.validate(user, schema);
}

module.exports = {
    User: User,
    validateUser: validateUser,
    validateNewUser: validateNewUser
}
