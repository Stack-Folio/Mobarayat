const express = require('express');
const router = express.Router();
const { getBestEvents } = require('../../services/football_api/bestEventsService');

router.get('/', async (req, res) => {
    const { lang } = req.query;
    const { season } = req.query;

    try {
        const leagues = await getBestEvents(lang || 'en', season);
        res.json({status: 'success', data: leagues});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: 'Failed to fetch leagues' });
    }
});

module.exports = router;