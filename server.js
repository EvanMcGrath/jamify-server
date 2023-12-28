import cors from 'cors';
import express from 'express'

const app = express();
const PORT = 3100

// Middleware 
app.use(express.json());
app.use(cors());

// Routes
import loginRoute from './routes/loginRoute.js'
import userInfoRoute from './routes/userInfoRoute.js'
import playlistInfo from './routes/playlistInfoRoute.js'
import songInfo from './routes/songInfo.js'

app.use('/login', loginRoute);
app.use('/userInfo', userInfoRoute);
app.use('/playlist', playlistInfo)
app.use('/song', songInfo)

// Initialize server 
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})