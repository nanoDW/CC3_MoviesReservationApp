const express = require('express');
const cors = require('cors');
const login = require('./routes/login');


const app = express();
app.use(express.json());


//server PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

// CORS config
app.use(cors());

// Routes
app.use('/login', login);
