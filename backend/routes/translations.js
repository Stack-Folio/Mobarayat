const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAdmin = require('../middlewares/checkAdmin');
const translationController = require('../controllers/translationController');

router.get('/original-texts',passport.authenticate('jwt', { session: false }), checkAdmin, translationController.getOriginalTexts);

router.put('/update', passport.authenticate('jwt', { session: false }), checkAdmin, translationController.updateTranslatedText);

router.get('/get-translation', passport.authenticate('jwt', { session: false }), checkAdmin, translationController.getTranslatedText);

// Search records by translatedText (requires admin authentication)
router.get('/search-by-translated-text', passport.authenticate('jwt', { session: false }), checkAdmin, translationController.searchByTranslatedText);

module.exports = router;
