const router = require('express').Router();
const db = require('../db/dbConnection')
const User = require('../model/User')
const mongoose = require('mongoose')
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
    clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
})

router
    .route('/')
    .post((req, res) => {
        spotifyApi.setAccessToken(req.body.access_token)
        
                const currentUserInfo = async () => {
                    const currentUserPlaylists = await User.findById('6431c7b876f76969870c836e')
                    // console.log(currentUserPlaylists)
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
            console.log(selectedPlaylist)
            res.send(selectedPlaylist)
        }
        playlistSongs()
    })

module.exports = router;