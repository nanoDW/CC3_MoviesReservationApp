const express = require('express');
const router = express.Router();
const {Reservation, validateReservation} = require('../models/reservation');

/*its all unfinished yet*/

router.get("/", async (req, res) => {

    const reservations = await Reservation.find();
    if (!reservations[0]) res.status(400).send('You have not made any reservations yet.');

    res.send(reservations);
});

router.get("/:id", async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) res.status(400).send('No such reservation exists.');

    res.send(reservation);
});

router.post("/", async (req, res) => {
    const { error } = validateReservation(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const reservation = new Reservation({
            userId: req.user,
            screeningRoomId: req.body.screeningRoomId,
            seat: req.body.seat,
            date: req.body.date
        });

        await reservation.save();
        res.send(reservation);
});

router.put("/:id", async(req, res) => {
    const { error } = validateReservation(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const result = await Reservation.findByIdAndUpdate(req.params.id, {
        $set: {
            seat: req.body.seat,
            active: req.body.active
        }
    }, { new: true });

    if (!result) res.status(400).send('No such reservation exists.');

    res.send(result);
});

module.exports = router;