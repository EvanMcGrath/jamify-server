const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node')
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

router
    .route('/')
    .get((_req, res) => {
        res.redirect(spotifyApi.createAuthorizeURL(scopes));
    })


router 
    .route('/callback')
    .post((req, res) => {
        const code = req.body.code
    
        spotifyApi.authorizationCodeGrant(code)
            .then((data) => {
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

router
    .route('/refresh')
    .post((req, res) => {
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

module.exports = router;
    