import axios from "axios";
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

router.route("/me").get((req, res) => {
	spotifyApi.setAccessToken(req.query.accessToken);

	//// This fetches new user details from spotify and writes it to the database
	const newUserDetails = async () => {
		try {
			const userData = await axios.get("https://api.spotify.com/v1/me", {
				headers: { Authorization: `Bearer ${req.query.accessToken}` },
			});
			//// If returning user send user info and return function
			const existingUser = await User.find({ username: userData.data.id });

			if (!(existingUser.length === 0)) {
				res.send(existingUser);
				return;
			}

			// Get new user playlists, save to db and send to frontend
			const playlistData = await spotifyApi.getUserPlaylists();
			const playlistArray = playlistData.body.items.map((i) => {
				return { playlistName: i.name, playlistUri: i.uri };
			});
			// Get track info for new users playlists
			getPlaylistSongs();

			const newUser = new User({
				username: userData.data.id,
				userUri: userData.data.uri,
				playlists: playlistArray,
			});

			res.send(newUser);
			newUser.save();
		} catch (e) {
			console.error(e);
			res.send(e);
		}
	};
	newUserDetails();

	const getPlaylistSongs = async () => {
		const userData = await axios.get("https://api.spotify.com/v1/me", {
			headers: { Authorization: `Bearer ${req.query.accessToken}` },
		});
		const userDoc = await User.find({ username: userData.data.id });
		const [userObj] = userDoc;

		for (const i of userObj.playlists) {
			const objUri = i.playlistUri.slice(17);
			const tracks = await spotifyApi.getPlaylistTracks(objUri);

			for (const ii of tracks.body.items) {
				const [artist] = ii.track.artists;
				i.tracks.push({
					artistName: artist.name,
					trackName: ii.track.name,
					trackUri: ii.track.uri,
				});
			}
			console.log(i);
		}
		userObj.save();
	};
});

export default router;
