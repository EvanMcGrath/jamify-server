const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = 3100
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node');

app.use(express.json());
app.use(cors());


// mongoose.connect('mongodb://127.0.0.1:27017/jamifydb');


const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
    clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
})




const loginRoute = require('./routes/loginRoute')
app.use('/login', loginRoute);



const userInfoRoute = require('./routes/userInfoRoute')
app.use('/userInfo', userInfoRoute);














app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
