// module.exports = router;
const express = require('express');
const router = express.Router();
const { getLeagues } = require('../../services/football_api/leaguesService');
require('dotenv').config();

router.get('/', async (req, res) => {
    const { lang, leagueId, type, page = 1, limit = process.env.PAGE_LIMIT || 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({ status: 'failed', error: 'Invalid page number' });
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({ status: 'failed', error: 'Invalid limit' });
    }

    try {
        // Fetch leagues from the service
        const leagues = await getLeagues(lang || 'en', leagueId, type);

        // Calculate pagination offsets
        const total = leagues.length;
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = startIndex + limitNumber;
        const paginatedLeagues = leagues.slice(startIndex, endIndex);

        // Construct response with pagination metadata
        res.json({
            status: 'success',
            data: paginatedLeagues,
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
        res.status(500).json({ status: 'failed', error: 'Failed to fetch leagues' });
    }
});

module.exports = router;
