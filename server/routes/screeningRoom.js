const express = require('express');
const router = express.Router();
const {ScreeningRoom, validateScreeningRoom} = require('../models/screeningRoom');
const auth = require('../middleware/auth');
const cookieParser = require('cookie-parser');

router.use(cookieParser())

router.get("/", async (req, res) => {
    const screeningRooms = await ScreeningRoom.find()

    res.send(screeningRooms);
});

router.get("/:id", async (req, res) => {
    const screeningRoom = await ScreeningRoom.findById(req.params.id);
    if (!screeningRoom) return res.status(400).send('No screeningRoom exists under given ID.');

    res.send(screeningRoom);
});

router.post("/", auth, async (req, res) => {
    const { error } = validateScreeningRoom(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const screeningRoom = new ScreeningRoom(req.body);
    
        await screeningRoom.save();
        res.send(screeningRoom);
});

router.delete("/:id", auth, async (req, res) => {

    const result = await ScreeningRoom.findByIdAndRemove(req.params.id);
    if (!result) return res.status(400).send('No screeningRoom exists under given ID.')
    
    res.send('ScreeningRoom deleted successfully');
});

router.put("/:id", auth, async (req, res) => {
	const { error } = validateScreeningRoom(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const result = await ScreeningRoom.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true });

    if (!result) return res.status(400).send('No screening exists under given ID.');

    res.send(result);
});

module.exports = router;