const axios = require('axios');
const translateToArabic = require("../translationsServive");
const savedLeagues = require("../../config/savedLeagues.json");

async function getBestEvents(lang, season) {
    if (!season) {
        throw new Error("Season is a mandatory parameter");
    }
    const params = {};
    if (season) {
        params.season = parseInt(season, 10);
    }

    const response = await axios.get(`${process.env.FootballAPIBaseURL}/leagues`, {
        headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.FootballAPIKey
        },
        params: params
    });

    const leagues = response.data.response;

    // Filter only leagues matching savedLeagues
    let filteredLeagues = leagues.filter(item => {
        return savedLeagues.some(saved => saved.leagueId === item.league.id);
    });

    let formattedLeagues = filteredLeagues.map(item => {
        const seasonDetails = item.seasons[0]; // Extract first season

        return {
            leagueId: item.league.id,
            leagueName: item.league.name,
            leagueType: item.league.type,
            leagueLogo: item.league.logo,
            leagueCountryName: item.country.name ?? null,
            leagueCountryFlag: item.country.flag ?? null,
            start: seasonDetails?.start ?? null,
            end: seasonDetails?.end ?? null,
            current: seasonDetails?.current ?? null
        };
    });

    if (lang === "ar") {
        let leagueNamesToTranslate = [];
        let translations = [];

        formattedLeagues.forEach(item => {
            leagueNamesToTranslate.push(item.leagueName.toLowerCase());
        });

        translations = await translateToArabic(leagueNamesToTranslate);

        if (translations && translations.length === formattedLeagues.length) {
            for (let i = 0; i < formattedLeagues.length; i++) {
                formattedLeagues[i].leagueName = translations[i];
            }
        }
    }

    // Sort by leagueId (ascending order)
    formattedLeagues.sort((a, b) => {
        if (a && b) {
            return a.leagueId - b.leagueId;
        }
        return 0; // If no league id exists for either, no sorting is applied
    });

    return formattedLeagues;
}

module.exports = { getBestEvents };
