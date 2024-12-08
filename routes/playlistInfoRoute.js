import dotenv from "dotenv";
import express from "express";
import SpotifyWebApi from "spotify-web-api-node";
import User from "../model/User.js";

const router = express.Router();
dotenv.config();

const spotifyApi = new SpotifyWebApi({
	redirectUri: process.env.REDIRECT_URI,
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
});

router.route("/:id").get((req, res) => {
	const { id } = req.params;
	spotifyApi.setAccessToken(req.query.accessToken);

	const playlistSongs = async () => {
		const userData = await spotifyApi.getMe();
		const userObj = await User.find({ username: userData.body.id });
		const allPlaylists = userObj[0].playlists;
		res.send(allPlaylists.id(id));
	};

	playlistSongs();
});

export default router;
