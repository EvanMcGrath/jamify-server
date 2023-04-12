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
        // console.log(req.query)
        spotifyApi.setAccessToken(req.query.accessToken)

        const playlistSongs = async () => {
            const userData = await spotifyApi.getMe()
            const userObj = await User.find({ username: userData.body.id })
            
            const allPlaylists = userObj[0].playlists

            // const selectedPlaylist = allPlaylists.playlists.id(id)

            // console.log(selectedPlaylist)
            // for (const track of selectedPlaylist.tracks) {
            //     const uri = track.trackUri.slice(14)

            //     const trackInfo = await spotifyApi.getAudioAnalysisForTrack(uri)
            //     // track.key = trackInfo.body.track.key;
            //     // track.mode = trackInfo.body.track.mode;
            //     // track.tempo = trackInfo.body.track.tempo;

            //     // console.log(track)
            //     console.log(trackInfo.body.track.key)
            // }
                
            
           
            res.send(allPlaylists.id(id))
        }
        playlistSongs()
    })

module.exports = router;