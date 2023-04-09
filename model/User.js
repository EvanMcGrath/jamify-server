const { Schema, model } = require('mongoose');


const userSchema = new Schema ({
    username: String,
    userUri: String,
    playlists: [{
        playlistName: String,
        playlistUri: String,
        tracks: [{
            artistName: String,
            trackName: String, 
            trackUri: String
        }]  
    }]
}) 

const User = model('User', userSchema);

module.exports = User;