const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkUser = require('../middlewares/checkUser');
const favController = require('../controllers/favController');

// Add Favorite
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkUser,
  favController.addFavorite
);

// Get Favorites by User
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkUser,
  favController.getFavorites
);

module.exports = router;
