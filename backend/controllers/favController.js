const Favorite = require('../models/Favorite');

// Add a Favorite
exports.addFavorite = async (req, res) => {
  const { UserId, Type, MatchId, LeagueId } = req.body;

  if (!UserId || !Type) {
    return res.status(400).json({ error: "All fields are required: userId, type." });
  }

  try {
    const newFavorite = new Favorite({ UserId, Type, MatchId, LeagueId });
    const savedFavorite = await newFavorite.save();
    res.status(201).json(savedFavorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Favorites by UserId (Optional Type Filter)
exports.getFavorites = async (req, res) => {
  try {
    const { UserId, Type } = req.query;

    // Validate input
    if (!UserId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    // Build query
    const query = { UserId };
    if (Type) query.Type = Type;

    const favorites = await Favorite.find(query);
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
