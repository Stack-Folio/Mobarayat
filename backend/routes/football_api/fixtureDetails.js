const express = require('express');
const router = express.Router();
const { getFixtureDetails } = require('../../services/football_api/fixtureDetailsService');

router.get('/', async (req, res) => {
    const { lang } = req.query;
    const { fixtureId } = req.query;

    try {
        const fixtureDetails = await getFixtureDetails(lang || 'en', fixtureId);
        res.json({status: 'success', data: fixtureDetails});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: 'Failed to fetch fixture' });
    }
});

module.exports = router;