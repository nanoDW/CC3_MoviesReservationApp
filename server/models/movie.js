const mongoose = require('mongoose');
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        maxlength: 213,
        required: true
    },
    releaseDate: {
        type: date,
        required: true
    },
    genre: {
        type: String, //maybe array? eg. [comedy, action]
        required: true
    },
    durationInMinutes: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String
    },
    ageGroup: {
        type: String,
        required: true
    },
    imageSmall: {
        type: String
    },
    imageLarge: {
        type: String
    }
});

const Movie = mongoose.model('Movie', MovieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(1).max(213).required(),
        releaseDate: Joi.date().required(),
        genre: Joi.string().max(50).required(),
        durationInMinutes: Joi.number().integer().max(51420).required(),
        shortDescription: Joi.string().required(),
        fullDescription: Joi.string(),
        ageGroup: Joi.string().required(),
        imageSmall: Joi.string(),
        imageLarge: Joi.string()
    };

    return Joi.validate(movie, schema)
}

module.exports = {
    Movie: Movie,
    validateMovie: validateMovie
}