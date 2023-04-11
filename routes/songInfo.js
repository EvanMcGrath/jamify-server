const router = require('express').Router();
const axios = require('axios')
const querystring = require('querystring')
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3100/login/callback",
    clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
    clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
})


router
    .route('/')
    .get((req, res) => {
        
        accessToken = req.query.accessToken;
        songUri = req.query.songUri.slice(14);
        
        spotifyApi.setAccessToken(accessToken)

        const getTrackInfo = async () => {
            try {
                const trackInfo = await spotifyApi.getAudioFeaturesForTrack(songUri)
                const trackArt = await spotifyApi.getTrack(songUri)
                
                const trackInfoObj = {
                    key: trackInfo.body.key.toString(),
                    mode: trackInfo.body.mode.toString(),
                    tempo: trackInfo.body.tempo.toString(),
                    trackArt: trackArt.body.album.images[0].url
                }
                // console.log(trackInfo)

                res.send(JSON.stringify(trackInfoObj))
                
            } catch(e) {
                console.log(e)
            }
        }
        getTrackInfo();

        
            // .then((data) => {
                
            //     const trackInfo = {
            //         key: data.body.key.toString(),
            //         mode: data.body.mode.toString(),
            //         tempo: data.body.tempo.toString()
            //     }
            //     return trackInfo
            //     // spotifyApi.getTrack(songUri)
            //     //     .then()
            //     // res.send(JSON.stringify(trackInfo))
            // })
            // .then((data) => {

            // })
            // .catch((err) => {
            //     console.log(err)
            //     res.sendStatus(404)
            // })
       
    })

module.exports = router;