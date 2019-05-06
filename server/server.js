const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('./db')();
const loginRouter = require('./routes/login');
const registrRouter = require('./routes/register');
const movieRouter = require('./routes/movie');

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
app.use('/register', registrRouter);
app.use('/api/movies', movieRouter);

//server PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
