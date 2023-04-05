const express = require('express');
const app = express();
const PORT = 3100
const cors = require('cors')
const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');

app.use(express.json());
app.use(cors());



const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
    clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
})


const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];






app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
})

app.post('/callback', (req, res) => {
    const code = req.body.code

    spotifyApi.authorizationCodeGrant(code)
        .then((data) => {
            // console.log(data)
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch((err) => {
            res.sendStatus(404)
            console.log(err)
        })
});


app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken

    spotifyApi.setRefreshToken(refreshToken)

    spotifyApi.refreshAccessToken()
        .then((data) => {
            console.log(data.body);
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})




app.post('/me', (req, res) => {

    spotifyApi.setAccessToken(req.body.access_token)

    spotifyApi.getMe()
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
        })
})


app.post('/playlists', (req, res) => {

    spotifyApi.setAccessToken(req.body.access_token)

    spotifyApi.getUserPlaylists()
        .then((data) => {
            res.send(data.body)
        })
        .catch((err) => {
            console.log(err)
        })

    spotifyApi.getPlaylistTracks("6h9mHzkFkmy4fCPZNxPybD")
        .then((data) => {
            console.log(data.body.items)
        })
        .catch((err) => {
            console.log(err)
        })
})












app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})