const { Schema, model } = require('mongoose');


const userSchema = new Schema ({
    username: String,
    userUri: String,
    playlists: [{
        playlistName: String,
        playlistUri: String
    }]
}) 

const User = model('User', userSchema);

module.exports = User;