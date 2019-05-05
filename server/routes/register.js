const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const _ = require('lodash');

const { User, validateNewUser } = require('../models/user');

router.use(cookieParser());

router.post("/", async (req, res) => {
    try {
        const {
            error
        } = validateNewUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({
            email: req.body.email
        });
        if (user) return res.status(400).send('User already registered.');

        // creating new user in the database
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashed,
            phone: req.body.phone
        })
        const result = await user.save();

        const token = user.generateAuthToken();

        res.cookie('token', token, {
            maxAge: 900000
        }).status(201).send(_.pick(result, ['_id', 'name', 'surname', 'email']));
    }
    catch(err) {
        res.send(err) 
    }
});


module.exports = router;