// import { Express } from 'express';
// const cors = require('cors')
import cors from 'cors';
import express from 'express'

const app = express();
const PORT = 3100


// Middleware 
app.use(express.json());
app.use(cors());

// Routes
import loginRoute from './routes/loginRoute.js'
console.log(loginRoute)
app.use('/login', loginRoute);

import userInfoRoute from './routes/userInfoRoute.js'
app.use('/userInfo', userInfoRoute);

import playlistInfo from './routes/playlistInfoRoute.js'
app.use('/playlist', playlistInfo)

import songInfo from './routes/songInfo.js'
app.use('/song', songInfo)

// Initialize server 
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})