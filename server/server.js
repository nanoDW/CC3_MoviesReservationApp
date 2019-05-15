const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const loginRouter = require('./routes/login');
const registrRouter = require('./routes/register');
const movieRouter = require('./routes/movie');
const screeningRouter = require('./routes/screening');
const screeningRoomRouter = require('./routes/screeningRoom');

const app = express();
require('./prod')(app);
require('./db')();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('tiny'));

// serving frontend
app.use(express.static(path.join(__dirname, '../client/build')));

// CORS config
app.use(cors({ 
    credentials: true,
    origin: true
 }));


// Routes
app.use('/login', loginRouter);
app.use('/register', registrRouter);
app.use('/api/movies', movieRouter);
app.use('/api/screenings', screeningRouter);
app.use('/api/screeningrooms', screeningRoomRouter);

//server PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
