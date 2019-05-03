const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('./db')();
const login = require('./routes/login');


const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// CORS config
app.use(cors({ credentials: true }));

// Routes
app.use('/login', login);




//server PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})