const router = require('express').Router();
const db = require('../db/dbConnection')
const User = require('../model/User')
const mongoose = require('mongoose')
const SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
})


router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        spotifyApi.setAccessToken(req.query.accessToken)

        const playlistSongs = async () => {
            const userData = await spotifyApi.getMe()
            const userObj = await User.find({ username: userData.body.id })
            
            const allPlaylists = userObj[0].playlists
           
            res.send(allPlaylists.id(id))
        }
        playlistSongs()
    })

module.exports = router;