const express = require('express');
const app = express();
const PORT = 3100
const cors = require('cors')
const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');

app.use(express.json());
app.use(cors());



// const credentials = {
//     redirectUri: "http://localhost:3000",
//     clientId: "",
//     clientSecret: "",
// }

// const spotifyApi = new SpotifyWebApi(credentials);

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
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
        clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
    })

    res.redirect(spotifyApi.createAuthorizeURL(scopes));
})

app.post('/callback', (req, res) => {
    const code = req.body.code

    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
        clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
    })

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
    // console.log('hi')
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "8f147b0115f847e7a7f89e59497029fe",
        clientSecret: "6396961d17ca4d6d8d17e938e84c7994",
        refreshToken,
    })

    spotifyApi.refreshAccessToken()
        .then(
            (data) => {
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












app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})