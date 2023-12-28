import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
})

const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const scopes = process.env.SCOPES;

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

export default router;    