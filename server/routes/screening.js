const express = require('express');
const router = express.Router();
const {Screening, validateScreening} = require('../models/screening');

router.get("/", async (req, res) => {

    const screenings = await Screening.find()

    res.send(screenings);
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