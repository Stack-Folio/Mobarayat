const express = require('express');
const router = express.Router();
const { getTopscorers } = require('../../services/football_api/topscorersService');

router.get('/', async (req, res) => {
    const { lang } = req.query;
    const { leagueId } = req.query;
    const { season } = req.query;

    try {
        const topscorers = await getTopscorers(lang || 'en', leagueId, season);
        res.json({status: 'success', data: topscorers});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: 'Failed to fetch topscorers' });
    }
});

module.exports = router;