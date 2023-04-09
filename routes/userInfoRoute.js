const router = require('express').Router();
const User = require('../model/User')
const db = require('../db/dbConnection')
const mongoose = require('mongoose')
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
    clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
})


router
    .route('/me')
    .post((req, res) => {
        spotifyApi.setAccessToken(req.body.access_token)

        //// This fetches user details from spotify and writes it to the database
        // const newUserDetails = async () => {
        //     const userData = await spotifyApi.getMe()
        //     const playlistData = await spotifyApi.getUserPlaylists()
        //     const playlistArray = playlistData.body.items.map((i) => {
        //         return { playlistName: i.name, playlistUri: i.uri }
        //     })

        //     const userList = await User.find({ username: userData.body.id })
        //     if (!(userList.length === 0)) return

        //     const newUser = new User({
        //         username: userData.body.id,
        //         userUri: userData.body.uri,
        //         playlists: playlistArray
        //     })
        //     newUser.save();
        // }
        // newUserDetails();


        ///Gets current user details from database and sends to front end
        spotifyApi.getMe()
            .then((data) => {
                const currentUserInfo = async () => {
                    const currentUser = await User.find({ username: data.body.id })
                    res.send(currentUser)
                }
                currentUserInfo();
            })
            .catch((err) => {
                console.log(err)
            })


    //     const getPlaylistSongs = async () => {
    //         const userDoc = await User.findById("6431c7b876f76969870c836e")
    //         for (const i of userDoc.playlists) {
    //             const objUri = i.playlistUri.slice(17)
    //             const tracks = await spotifyApi.getPlaylistTracks(objUri)

    //             console.log(tracks)
    //             for (const ii of tracks.body.items ) {
    //               const [artist] = ii.track.artists
    //               i.tracks.push({artistName: artist.name, trackName: ii.track.name, trackUri: ii.track.uri})
    //             }
    //         }
    //         userDoc.save();
    //     } 
    // getPlaylistSongs()      
})





// router
//     .route('/playlists')
//     .post((req, res) => {

//         spotifyApi.setAccessToken(req.body.access_token)

//         spotifyApi.getUserPlaylists()
//             .then((data) => {
//                 console.log(data)

//                 const playlistArray = data.body.items.map((i) => [i.name, i.uri])




//                 res.send(data.body)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })

//         spotifyApi.getPlaylistTracks("6h9mHzkFkmy4fCPZNxPybD")
//             .then((data) => {
//                 // console.log(data.clebody.items)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     })





module.exports = router;