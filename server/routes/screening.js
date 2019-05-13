const express = require('express');
const router = express.Router();
const {Screening, validateScreening} = require('../models/screening');
const {ScreeningRoom, validateScreeningRoom} = require('../models/screeningRoom');

router.get("/", async (req, res) => {

    const screenings = await Screening.find()

    res.send(screenings);
});

router.get("/:id", async (req, res) => {
    const screening = await Screening.findById(req.params.id);
    if (!screening) return res.status(400).send('No screening exists under given ID.');

    res.send(screening);
});

router.post("/", async (req, res) => {
    const { error } = validateScreening(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const screening = new Screening(req.body);
    const screeningRoom = await getScreeningRoom(req.body.screeningRoomId);

    const arr = Object.entries(screeningRoom.seats)

    const myHeadHurts = [];
    
    for(let i = 0; i < arr.length; i++) {
        for(seat of arr[i][1]) {
            if(arr[i][0]==="F") break;
            if(Number.parseInt(arr[i][0]) > 7) continue;
            myHeadHurts.push({
                row: arr[i][0],
                seat: seat,
                isOccupied: false,
                userID: ""
            });
        }
    };

    screening.seats = myHeadHurts;

        await screening.save();
        res.send(screening);
});

router.delete("/:id", async (req, res) => {

    const result = await Screening.findByIdAndRemove(req.params.id);
    if (!result) return res.status(400).send('No screening exists under given ID.')
    
    res.send('Screening deleted successfully');
});

router.put("/:id", async(req, res) => {
        const { seats } = await Screening.findById(req.params.id);
        const selectedSeats = req.body.selectedSeats;

        for(let i = 0; i < seats.length; i++) {
            selectedSeats.map( item => {
                if(seats[i].row === item[0] && seats[i].seat === item[1]) {
                    seats[i].isOccupied = req.body.isOccupied;
                    seats[i].userID = req.body.user;
                }
            });
        }

    const result = await Screening.findByIdAndUpdate(req.params.id, {
        $set: {
            seats: seats,
            isOccupied: req.body.isOccupied,
            userID: req.body.user
        }
    }, { new: true });

    if (!result) return res.status(400).send('No screening exists under given ID.');

    res.send(result);
});

module.exports = router;

async function getScreeningRoom(id){
    const result = ScreeningRoom.findById(id);
    return result
}