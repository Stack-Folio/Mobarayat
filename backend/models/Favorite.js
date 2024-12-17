const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    Type: { type: String, required: true },
    MatchId: { type: String, required: false },
    LeagueId : { type: String, required: false },

}, { timestamps: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);
