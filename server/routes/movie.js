const express = require('express');
const router = express.Router();
const {Movie, validateMovie} = require('../models/movie');

router.get("/", async (req, res) => {

    const movies = await Movie.find();

    res.send(movies);
});

router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) res.status(400).send('No movie exists under given ID.');

    res.send(movie);
});

router.post("/", async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const movie = new Movie({
            title: req.body.title,
            releaseDate: req.body.releaseDate,
            genre: req.body.genre,
            durationInMinutes: req.body.durationInMinutes,
            shortDescription: req.body.shortDescription,
            fullDescription: req.body.fullDescription,
            ageGroup: req.body.ageGroup,
            imageSmall: req.body.imageSmall,
            imageLarge: req.body.imageLarge
        });

        await movie.save();
        res.send(movie);
});

router.delete("/:id", async (req, res) => {

    const result = await Movie.findByIdAndRemove(req.params.id);
    if (!result) res.status(400).send('No movie exists under given ID.')
    
    res.send('Movie deleted successfully');
});

router.put("/:id", async(req, res) => {
    const { error } = validateMovie(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const result = await Movie.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            releaseDate: req.body.releaseDate,
            genre: req.body.genre,
            durationInMinutes: req.body.durationInMinutes,
            shortDescription: req.body.shortDescription,
            fullDescription: req.body.fullDescription,
            ageGroup: req.body.ageGroup,
            imageSmall: req.body.imageSmall,
            imageLarge: req.body.imageLarge
        }
    }, { new: true });

    if (!result) res.status(400).send('No movie exists under given ID.');

    res.send(result);
});

module.exports = router;