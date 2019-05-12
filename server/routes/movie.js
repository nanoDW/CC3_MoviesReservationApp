const express = require('express');
const router = express.Router();
const {Movie, validateMovie} = require('../models/movie');
const {Screening} = require('../models/screening');

router.get("/", async (req, res) => {

    const compactRequest = {
        title: 1,
        releaseDate: 1,
        genre: 1,
        shortDescription: 1,
        ageGroup: 1,
        imageSmall: 1
    }
    const fullRequest = {
        title: 1,
        releaseDate: 1,
        genre: 1,
        durationInMinutes: 1,
        shortDescription: 1,
        fullDescription: 1,
        ageGroup: 1,
        imageLarge: 1
    }

    const reqGenre = new RegExp(req.query.genre || /./, "gi");
    const reqAge = new RegExp(req.query.age || /./, "gi");

    const movies = await Movie.find({genre: reqGenre, ageGroup: reqAge})
        .limit(parseInt(req.query.limit) || 12)
        .sort( { releaseDate: -1 } )
        .select((req.query.size === "compact" ? compactRequest : fullRequest));

    res.send(movies);
});

router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(400).send('No movie exists under given ID.');

    const screenings = await Screening.find({movieId: movie._id})
        .select({
            _id: 1,
            date: 1
        })
    
        movie.screenings = screenings;

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