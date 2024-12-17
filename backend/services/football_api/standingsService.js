const axios = require('axios');
const translateToArabic = require("../translationsServive");

async function getStandings(lang, leagueId, season) {
    const params = {};
    if (leagueId) {
        params.league = parseInt(leagueId, 10);
    }
    if (season) {
        params.season = parseInt(season, 10);
    }

    const response = await axios.get(`${process.env.FootballAPIBaseURL}/standings`, {
        headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.FootballAPIKey
        },
        params: params
    });

    const standingsData = response.data.response;
    const formattedStandings = standingsData.map(leagueData => {
        const league = leagueData.league;
        const standings = league.standings.flat(); // Flatten nested standings array

        return {
            league: {
                id: league.id ?? null,
                name: league.name ?? null,
                country: league.country ?? null,
                logo: league.logo ?? null,
                flag: league.flag ?? null
            },
            standings: standings.map(teamData => ({
                rank: teamData.rank ?? null,
                points: teamData.points ?? null,
                goalsDiff: teamData.goalsDiff ?? null,
                all: teamData.all ?? null,
                team: {
                    id: teamData.team.id ?? null,
                    name: teamData.team.name ?? null,
                    logo: teamData.team.logo ?? null
                }
            }))
        };
    });

    if (lang === "ar") {
        let namesToTranslate = [];
        formattedStandings.forEach(league => {
            // Add league name for translation
            namesToTranslate.push(league.league.name.toLowerCase());
            
            // Add team names for translation
            league.standings.forEach(team => {
                namesToTranslate.push(team.team.name.toLowerCase());
            });
        });

        const translations = await translateToArabic(namesToTranslate);

        if (translations && translations.length === namesToTranslate.length) {
            let translationIndex = 0;

            formattedStandings.forEach(league => {
                // Translate league name
                league.league.name = translations[translationIndex++];

                // Translate team names in standings
                league.standings.forEach(team => {
                    team.team.name = translations[translationIndex++];
                });
            });
        }
    }

    return formattedStandings;
}

module.exports = { getStandings };