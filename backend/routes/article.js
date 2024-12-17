const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAdmin = require('../middlewares/checkAdmin');
const articleController = require('../controllers/articleController');

// CRUD Endpoints
router.post('/', passport.authenticate('jwt', { session: false }), checkAdmin, articleController.createArticle);
router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticleById);
router.put('/:id', passport.authenticate('jwt', { session: false }), checkAdmin, articleController.updateArticle);
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkAdmin, articleController.deleteArticle);

module.exports = router;
