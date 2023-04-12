const router = require('express').Router();
const User = require('../model/User')
const db = require('../db/dbConnection')
const mongoose = require('mongoose')
const SpotifyWebApi = require('spotify-web-api-node')

require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})


router
    .route('/me')
    .get((req, res) => {
        console.log(req.query)
        spotifyApi.setAccessToken(req.query.accessToken)


        //// This fetches new user details from spotify and writes it to the database
        const newUserDetails = async () => {
           try {
               const userData = await spotifyApi.getMe()
               console.log(userData)
               const playlistData = await spotifyApi.getUserPlaylists()
               
               const playlistArray = playlistData.body.items.map((i) => {
                   return { playlistName: i.name, playlistUri: i.uri }
               })
   
               
               //// Sends user info and returns function if it is a returning user 
               const existingUser = await User.find({ username: userData.body.id })
               if (!(existingUser.length === 0)) {
                   res.send(existingUser);
                   console.log(existingUser)
                   return
               }
   
               //// Save new user details to db and send to frontend
               const newUser = new User({
                   username: userData.body.id,
                   userUri: userData.body.uri,
                   playlists: playlistArray
               })
               res.send(newUser)
               newUser.save();
           } catch (e) {
            console.error(e)
            res.send(e)
           }
        }
        newUserDetails();



    //     const getPlaylistSongs = async () => {
    //         const userDoc = await User.findById("6431c7b876f76969870c836e")
    //         for (const i of userDoc.playlists) {
    //             const objUri = i.playlistUri.slice(17)
    //             const tracks = await spotifyApi.getPlaylistTracks(objUri)

    //             for (const ii of tracks.body.items ) {
    //               const [artist] = ii.track.artists
    //             //   console.log(ii)
    //             //   i.tracks.push({artistName: artist.name, trackName: ii.track.name, trackUri: ii.track.uri})
    //             }
    //         }
    //         userDoc.save();
    //     } 
    // getPlaylistSongs()      
    
    // const getSongKeys = async () => {
    //     const userId = await spotifyApi.getMe()
    //     const userInfo = await User.find({ username: userId.body.id })
    //     const [userObj] = userInfo
        
    //     // console.log(userObj.playlists)
    //     const tracks = userObj.playlists.map((i) => {
    //         return i.tracks
    //     })
        
    //     // console.log(tracks)
    //     const allTracks = [].concat(...tracks);


    

    
    //     // for (const track of allTracks ) {

    //     //     const uri = track.trackUri.slice(14)
    //     //     const trackInfo = await spotifyApi.getAudioAnalysisForTrack(uri)

    //     //     console.log(trackInfo.body.track.key)
    //     //     console.log(trackInfo.body.track.mode)
        
    //         // for (const ii of tracks.body.items ) {
    //         //     const [artist] = ii.track.artists
    //         //     i.tracks.push({artistName: artist.name, trackName: ii.track.name, trackUri: ii.track.uri})
    //         // }
    //     // }
    // }
    // getSongKeys()
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