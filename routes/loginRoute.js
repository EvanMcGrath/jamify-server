const router = require('express').Router();
const axios = require('axios')
const querystring = require('querystring')
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3100/login/callback",
    clientId: "8cb49e1f58254360a20e8bdd9eed37ad",
    clientSecret: "f09e6b2ed9c24300adfaad0e6542ce09",
})

const REDIRECT_URI = "http://localhost:3100/login/callback";
const CLIENT_ID = "8cb49e1f58254360a20e8bdd9eed37ad";
const CLIENT_SECRET = "f09e6b2ed9c24300adfaad0e6542ce09";

// const scopes = [
//     'ugc-image-upload',
//     'user-read-playback-state',
//     'user-modify-playback-state',
//     'user-read-currently-playing',
//     'streaming',
//     'app-remote-control',
//     'user-read-email',
//     'user-read-private',
//     'playlist-read-collaborative',
//     'playlist-modify-public',
//     'playlist-read-private',
//     'playlist-modify-private',
//     'user-library-modify',
//     'user-library-read',
//     'user-top-read',
//     'user-read-playback-position',
//     'user-read-recently-played',
//     'user-follow-read',
//     'user-follow-modify'
// ];


const scopes = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify'

router
    .route('/')
    .get((_req, res) => {

        const queryParams = querystring.stringify({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            scope: scopes,
          });

          res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);    
        
        // res.redirect(spotifyApi.createAuthorizeURL(scopes));
    })


router 
    .route('/callback')
    .get((req, res) => {

        const code = req.query.code || null 

        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: REDIRECT_URI
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            },
          })
            .then(response => {
              if (response.status === 200) {              
                const { access_token, refresh_token, expires_in } = response.data;
                    const queryParams = querystring.stringify({
                        access_token,
                        refresh_token,
                        expires_in,
                    })
                    res.redirect(`http://localhost:3000/?${queryParams}`)
              } else {
                res.redirect(`/?${querystring.stringify({ error: 'invalid_token'})}`)
              }
            })
            .catch(error => {
              res.send(error);
            });


        // spotifyApi.authorizationCodeGrant(code)
        //     .then((data) => {
        //         console.log(data)
        //         if (data.status === 200 ) {
        //             const { access_token, refresh_token, expires_in } = data.body;
        //             const queryParams = querystring.stringify({
        //                 access_token,
        //                 refresh_token,
        //                 expires_in,
        //             })
    
        //             res.redirect(`http://localhost:3000/?${queryParams}`)
        //         } else {
        //             console.log('wtf')
        //             // res.redirect(`/?${querystring.stringify({ error: 'invalid_token'})}`)
        //         }

                
                // res.json({
                //     accessToken: data.body.access_token,
                //     refreshToken: data.body.refresh_token,
                //     expiresIn: data.body.expires_in
                // })
            // })
        
            // .catch((err) => {
            //     res.sendStatus(404)
            //     console.log(err)
            // })
    });

router
    .route('/refresh_token')
    .get((req, res) => {
        const { refresh_token } = req.query;
        spotifyApi.setRefreshToken(refresh_token)
        spotifyApi.refreshAccessToken()
            .then((data) => {
                res.send(data.body)
            })
            .catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })
    })
    // .route('/refresh')
    // .post((req, res) => {
    //     const refreshToken = req.body.refreshToken
    
    //     spotifyApi.setRefreshToken(refreshToken)
    
    //     spotifyApi.refreshAccessToken()
    //         .then((data) => {
    //             res.json({
    //                 accessToken: data.body.access_token,
    //                 expiresIn: data.body.expires_in,
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             res.sendStatus(400)
    //         })
    // })

module.exports = router;
    