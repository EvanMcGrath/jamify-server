const router = require('express').Router();
const db = require('../db/dbConnection')
const User = require('../model/User')
const mongoose = require('mongoose')
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3100/login/callback",
    clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
    clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
})

router
    .route('/')
    .post((req, res) => {
        spotifyApi.setAccessToken(req.body.access_token)
        
                const currentUserInfo = async () => {
                    const currentUserPlaylists = await User.findById('6431c7b876f76969870c836e')
                    res.send(currentUserPlaylists.playlists)
                }
                currentUserInfo();
            })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        

        const playlistSongs = async () => {
            const allPlaylists = await User.findById('6431c7b876f76969870c836e')
            const selectedPlaylist = allPlaylists.playlists.id(id)
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
                
            
           
            res.send(selectedPlaylist)
        }
        playlistSongs()
    })

module.exports = router;