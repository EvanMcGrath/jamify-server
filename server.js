const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = 3100
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node');

app.use(express.json());
app.use(cors());


// mongoose.connect('mongodb://127.0.0.1:27017/jamifydb');





const loginRoute = require('./routes/loginRoute')
app.use('/login', loginRoute);



const userInfoRoute = require('./routes/userInfoRoute')
app.use('/userInfo', userInfoRoute);



const playlistInfo = require('./routes/playlistInfoRoute')
app.use('/playlist', playlistInfo)




const songInfo = require('./routes/songInfo')
app.use('/song', songInfo)







app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
