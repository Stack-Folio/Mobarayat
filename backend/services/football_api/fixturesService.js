const axios = require('axios');
const favLeaguesIDs = process.env.FavLeaguesIDs;
const translateToArabic = require("../translationsServive");

// async function translateToArabic(text) {
//     const response = await axios.get(`https://transliterate.qcri.org/en2ar/${encodeURIComponent(text)}`);
//     return response.data.results; // Extracts the translated result from the API response
// }

async function getFixtures(lang, leagueId, season, date, from, to) {
    const params = {};
    if (leagueId) {
        params.league = parseInt(leagueId, 10);
    }
    if (season) {
        params.season = parseInt(season, 10);
    }
    if (date) {
        params.date = date;
    }
    else if (from && to) {
        params.from = from;
        params.to = to;
    }
    params.timezone = 'Asia/Riyadh';

    const response = await axios.get(`${process.env.FootballAPIBaseURL}/fixtures`, {
        headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.FootballAPIKey
        },
        params: params
    });

    const fixtures = response.data.response;
    let formattedFixtures = fixtures.map(item => { 
        return {
            fixtureId: item.fixture.id,
            status: item.fixture.status.short,
            fixtureFullDate: item.fixture.date,
            fixtureDate: new Date(item.fixture.date).toISOString().split('T')[0],
            fixtureTime: new Date(item.fixture.date).toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en', { hour: '2-digit', minute: '2-digit', hour12: true }),
            league: leagueId ? null : {
                leagueId: item.league?.id,                
                leagueName: `${item.league?.country} ${item.league?.name}`,
                leagueLogo: item.league?.logo
            },
            teams: {
                home: {
                    id: item.teams.home.id,
                    name: item.teams.home.name,
                    logo: item.teams.home.logo,
                    winner: item.teams.home.winner,
                },
                away: {
                    id: item.teams.away.id,
                    name: item.teams.away.name,
                    logo: item.teams.away.logo,
                    winner: item.teams.away.winner,
                }
            },
            goals: {
                home: item.goals.home,
                away: item.goals.away,
                hasPenalty: item.score.penalty.home ? true : false,
                penalty: {
                    home: item.score.penalty.home,
                    away: item.score.penalty.away,
                }
            }
        };
    });
    if (lang === "ar") {
        let namesToTranslate = [];
        const formattedFixturesLength = leagueId ? 2 : 3;
    
        formattedFixtures.forEach(item => {
            if(!leagueId){
                // Collect league name
                namesToTranslate.push(item.league.leagueName.toLowerCase());
            }            
    
            // Collect home team name
            namesToTranslate.push(item.teams.home.name.toLowerCase());
    
            // Collect away team name
            namesToTranslate.push(item.teams.away.name.toLowerCase());
        });
    
        const translations = await translateToArabic(namesToTranslate);
    
        if (translations && translations.length === formattedFixtures.length * formattedFixturesLength) {
            let translationIndex = 0;
    
            formattedFixtures.forEach(item => {
                if(!leagueId){
                    // Translate league name
                    item.league.leagueName = translations[translationIndex++];
                } 

                // Translate home team name
                item.teams.home.name = translations[translationIndex++];
    
                // Translate away team name
                item.teams.away.name = translations[translationIndex++];
            });
        }
    }
    

    if (!leagueId) {
        // Sort the fixtures based on their position in favLeaguesIDs
        formattedFixtures.sort((a, b) => {
            const aIndex = favLeaguesIDs.indexOf(a.league?.leagueId);
            const bIndex = favLeaguesIDs.indexOf(b.league?.leagueId);
    
            const aInFav = aIndex !== -1;
            const bInFav = bIndex !== -1;
    
            // Prioritize items in favLeaguesIDs and order by their index in favLeaguesIDs
            if (aInFav && bInFav) return aIndex - bIndex; // Sort by order in favLeaguesIDs
            if (aInFav) return -1; // Place a before b if only a is in favLeaguesIDs
            if (bInFav) return 1;  // Place b before a if only b is in favLeaguesIDs
    
            // If neither are in favLeaguesIDs, sort by leagueId in ascending order
            if (a.league && b.league) return a.league.leagueId - b.league.leagueId;
            return 0;
        });
    }

    return formattedFixtures;
}

module.exports = { getFixtures };