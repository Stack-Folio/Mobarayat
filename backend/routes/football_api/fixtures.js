// const express = require('express');
// const router = express.Router();
// const { getFixtures } = require('../../services/football_api/fixturesService');

// router.get('/', async (req, res) => {
//     const { lang } = req.query;
//     const { leagueId } = req.query;
//     const { date } = req.query;
//     const { from } = req.query;
//     const { to } = req.query;
//     const { season } = req.query;

//     try {
//         const fixtures = await getFixtures(lang || 'en', leagueId, season, date, from, to);
//         res.json({status: 'success', data: fixtures});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: 'failed', error: 'Failed to fetch fixtures' });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getFixtures } = require('../../services/football_api/fixturesService');
require('dotenv').config();

router.get('/', async (req, res) => {
    const { lang, leagueId, season, date, from, to, page = 1, limit = process.env.PAGE_LIMIT || 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate page and limit
    if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({ status: 'failed', error: 'Invalid page number' });
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({ status: 'failed', error: 'Invalid limit' });
    }

    try {
        // Fetch fixtures from the service
        const fixtures = await getFixtures(lang || 'en', leagueId, season, date, from, to);

        // Calculate pagination offsets
        const total = fixtures.length;
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = startIndex + limitNumber;
        const paginatedFixtures = fixtures.slice(startIndex, endIndex);

        // Construct response with pagination metadata
        res.json({
            status: 'success',
            data: paginatedFixtures,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(total / limitNumber),
                hasNextPage: endIndex < total,
                hasPrevPage: startIndex > 0
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: 'Failed to fetch fixtures' });
    }
});

module.exports = router;
