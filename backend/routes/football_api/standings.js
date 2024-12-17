const express = require('express');
const router = express.Router();
const { getStandings } = require('../../services/football_api/standingsService');

router.get('/', async (req, res) => {
    const { lang } = req.query;
    const { leagueId } = req.query;
    const { season } = req.query;

    try {
        const standings = await getStandings(lang || 'en', leagueId, season);
        res.json({status: 'success', data: standings});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: 'Failed to fetch standings' });
    }
});

module.exports = router;