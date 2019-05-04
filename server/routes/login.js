const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');

const { User, validateUser } = require('../models/user');


router.use(cookieParser());

router.post("/", async (req, res) => {
    const {
        error
    } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();

    res.cookie('token', token, { maxAge: 900000} ).send('Cookie is set');
});

// to będzie do usunięcia jak zrobimy rejestrację
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    let user = new User({
        name: 'test',
        email: 'testuser@gmail.com',
        password: hashed
    })
    let result = await user.save();
    console.log(result);
}

module.exports = {
    loginRouter: router,
    createUser: createUser
}

