const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('./db')();
const { loginRouter, createUser } = require('./routes/login');


const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// CORS config
app.use(cors({ 
    credentials: true,
    origin: true
 }));


// Routes
app.use('/login', loginRouter);


//server PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})


//createUser();