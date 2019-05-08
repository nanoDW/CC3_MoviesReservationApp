const express = require('express');
const router = express.Router();
const {Movie, validateMovie} = require('../models/movie');

router.get("/", async (req, res) => {

    const selection = {
        title: 1,
        releaseDate: 1,
        genre: 1,
        durationInMinutes: 1,
        shortDescription: 1,
        fullDescription: 1,
        ageGroup: 1,
        imageSmall: 1,
        imageLarge: 1
    }

    const movies = await Movie.find()
        .limit(parseInt(req.query.limit) || 10)
        .sort( { releaseDate: -1 } )
        .select(req.query.selection || selection);

    res.send(movies);
});

router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(400).send('No movie exists under given ID.');

    res.send(movie);
});

router.post("/", async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = new Movie(req.body);

        await movie.save();
        res.send(movie);
});

router.delete("/:id", async (req, res) => {

    const result = await Movie.findByIdAndRemove(req.params.id);
    if (!result) return res.status(400).send('No movie exists under given ID.')
    
    res.send('Movie deleted successfully');
});

router.put("/:id", async(req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const result = await Movie.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true });

    if (!result) return res.status(400).send('No movie exists under given ID.');

    res.send(result);
});

module.exports = router;