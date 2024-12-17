const express = require('express');
const router = express.Router();
const savedLeagues = require('../../config/savedLeagues.json');

router.get('/', async (req, res) => {
    const { lang, type } = req.query;
    try {
        // Filter leagues by type if the 'type' query parameter is provided
        let filteredLeagues = savedLeagues;

        if (type) {
            filteredLeagues = filteredLeagues.filter(league => 
                league.leagueType.toLowerCase() === type.toLowerCase()
            );
        }

        // Modify the leagueName for each league based on the lang parameter
        const modifiedLeagues = filteredLeagues.map(league => {
            const modifiedLeague = { ...league };  // Create a copy of the league object

            if (lang === 'ar') {
                modifiedLeague.leagueName = league.leagueNameAr;  // Use Arabic name
            } else {
                modifiedLeague.leagueName = league.leagueName;  // Use English name
            }

            return modifiedLeague;
        });

        res.json({ status: 'success', data: modifiedLeagues });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: 'Failed to fetch leagues' });
    }
});

module.exports = router;