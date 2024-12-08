import dotenv from "dotenv";
import express from "express";
import SpotifyWebApi from "spotify-web-api-node";

const router = express.Router();
dotenv.config();

const spotifyApi = new SpotifyWebApi({
	redirectUri: process.env.REDIRECT_URI,
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
});

router.route("/").get((req, res) => {
	accessToken = req.query.accessToken;
	songUri = req.query.songUri.slice(14);

	spotifyApi.setAccessToken(accessToken);

	const getTrackInfo = async () => {
		try {
			const trackInfo = await spotifyApi.getAudioFeaturesForTrack(songUri);
			const trackArt = await spotifyApi.getTrack(songUri);

			const trackInfoObj = {
				key: trackInfo.body.key.toString(),
				mode: trackInfo.body.mode.toString(),
				tempo: trackInfo.body.tempo.toString(),
				trackArt: trackArt.body.album.images[0].url,
			};

			res.send(JSON.stringify(trackInfoObj));
		} catch (e) {
			console.log(e);
		}
	};
	getTrackInfo();
});

export default router;
