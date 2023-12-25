const express = require('express');
const app = express();
const PORT = 3100
const cors = require('cors')

// Middleware 
app.use(express.json());
app.use(cors());

// Routes
const loginRoute = require('./routes/loginRoute')
app.use('/login', loginRoute);

const userInfoRoute = require('./routes/userInfoRoute')
app.use('/userInfo', userInfoRoute);

const playlistInfo = require('./routes/playlistInfoRoute')
app.use('/playlist', playlistInfo)

const songInfo = require('./routes/songInfo')
app.use('/song', songInfo)

// Initialize server 
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})