const axios = require('axios');
const translateToArabic = require("../translationsServive");

async function getFixtureDetails(lang, fixtureId) {
    const params = {};
    if (fixtureId) {
        params.id = parseInt(fixtureId, 10);
    }

    const response = await axios.get(`${process.env.FootballAPIBaseURL}/fixtures`, {
        headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.FootballAPIKey
        },
        params: params
    });

    const fixture = response.data.response;
    let formattedFixture = fixture.map(item => { 
        return {
            fixture: {
                fixtureId: item.fixture.id,
                fixtureFullDate: item.fixture.date,
                fixtureDate: new Date(item.fixture.date).toISOString().split('T')[0],
                fixtureTime: new Date(item.fixture.date).toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en', { hour: '2-digit', minute: '2-digit', hour12: true }),
                referee: item.fixture.referee,
                venueName: item.fixture.venue?.name,
                status: item.fixture.status,
            },            
            league: {
                leagueId: item.league.id ?? null,
                leagueName: item.league.name ?? null,
                leagueLogo: item.league.logo ?? null,
                leagueCountryName: item.league.country ?? null,
                leagueCountryFlag: item.league.flag ?? null
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
                away: item.goals.away
            },
            score: item.score,
            events: item.events ? item.events.map(event => ({
                time: event.time,
                team: {
                    id: event.team.id,
                    name: event.team.name,
                    logo: event.team.logo
                },
                player: {
                    id: event.player.id,
                    name: event.player.name
                },
                assist: {
                    id: event.assist.id,
                    name: event.assist.name
                },
                type: event.type,
                detail: event.detail,
                comments: event.comments,
            })) : null,
            lineups: item.lineups ? item.lineups.map(lineup => ({
                team: {
                    id: lineup.team.id,
                    name: lineup.team.name,
                    logo: lineup.team.logo,
                    colors: lineup.team.colors
                },
                coach: {
                    id: lineup.coach.id,
                    name: lineup.coach.name,
                    photo: lineup.coach.photo,
                },
                formation: lineup.formation,
                startXI: lineup.startXI ? lineup.startXI.map(item => ({
                    player: {
                        id: item.player.id,
                        name: item.player.name,
                        number: item.player.number,
                        pos: item.player.pos,
                        grid: item.player.grid
                    },
                })) : null,
                substitutes: lineup.substitutes ? lineup.substitutes.map(item => ({
                    player: {
                        id: item.player.id,
                        name: item.player.name,
                        number: item.player.number,
                        pos: item.player.pos,
                        grid: item.player.grid
                    },
                })) : null,
            })) : null,
            statistics: item.statistics ? item.statistics.map(statistic => ({
                team: {
                    id: statistic.team.id,
                    name: statistic.team.name,
                    logo: statistic.team.logo
                },
                statistics: statistic.statistics ? statistic.statistics.map(item => ({
                    type: item.type,
                    value: item.value,
                })) : null,
            })) : null,
            players: item.players ? item.players.map(player => ({
                team: {
                    id: player.team.id,
                    name: player.team.name,
                    logo: player.team.logo,
                    update: player.team.update

                },
                players: player.players ? player.players.map(item => ({
                    player: {
                        id: item.player.id,
                        name: item.player.name,
                        photo: item.player.photo,
                    },
                    statistics: item.statistics                    
                })) : null,
            })) : null,
        };
    });
    if (lang === "ar") {
        let namesToTranslate = [];
    
        formattedFixture.forEach(item => {
            // Fixture translations
            namesToTranslate.push(item.fixture.referee ? item.fixture.referee.toLowerCase() : "");
            namesToTranslate.push(item.fixture.venueName ? item.fixture.venueName.toLowerCase() : "");
            namesToTranslate.push(item.fixture.status.long.toLowerCase());
    
            // League translation
            namesToTranslate.push(item.league.leagueName.toLowerCase());
    
            // Teams translations
            namesToTranslate.push(item.teams.home.name.toLowerCase());
            namesToTranslate.push(item.teams.away.name.toLowerCase());
    
            // Events translations
            item.events.forEach(event => {
                if (event.team && event.team.name) {
                    namesToTranslate.push(event.team.name.toLowerCase());
                }
                if (event.player && event.player.name) {
                    namesToTranslate.push(event.player.name.toLowerCase());
                }
                if (event.assist && event.assist.name) {
                    namesToTranslate.push(event.assist.name.toLowerCase());
                }
            });
    
            // Lineups translations
            item.lineups.forEach(lineup => {
                namesToTranslate.push(lineup.team.name.toLowerCase());
                namesToTranslate.push(lineup.coach.name.toLowerCase());
                lineup.startXI.forEach(player => {
                    namesToTranslate.push(player.player.name.toLowerCase());
                });
                lineup.substitutes.forEach(player => {
                    namesToTranslate.push(player.player.name.toLowerCase());
                });
            });
    
            // Statistics translations
            item.statistics.forEach(stat => {
                namesToTranslate.push(stat.team.name.toLowerCase());
                stat.statistics.forEach(statEntry => {
                    namesToTranslate.push(statEntry.type.toLowerCase());
                });
            });
    
            // Players translations
            item.players.forEach(playerGroup => {
                namesToTranslate.push(playerGroup.team.name.toLowerCase());
                playerGroup.players.forEach(player => {
                    namesToTranslate.push(player.player.name.toLowerCase());
                });
            });
        });
    
        const translations = await translateToArabic(namesToTranslate);
    
        if (translations && translations.length === namesToTranslate.length) {
            let translationIndex = 0;
    
            formattedFixture.forEach(item => {
                // Assign translations back to fixture
                item.fixture.referee = translations[translationIndex++] || null;
                item.fixture.venueName = translations[translationIndex++] || null;
                item.fixture.status.long = translations[translationIndex++];
    
                // Assign translation to league
                item.league.leagueName = translations[translationIndex++];
    
                // Assign translations to teams
                item.teams.home.name = translations[translationIndex++];
                item.teams.away.name = translations[translationIndex++];
    
                // Assign translations to events
                item.events.forEach(event => {
                    if (event.team && event.team.name) {
                        event.team.name = translations[translationIndex++];
                    }
                    if (event.player && event.player.name) {
                        event.player.name = translations[translationIndex++];
                    }
                    if (event.assist && event.assist.name) {
                        event.assist.name = translations[translationIndex++];
                    }
                });
    
                // Assign translations to lineups
                item.lineups.forEach(lineup => {
                    lineup.team.name = translations[translationIndex++];
                    lineup.coach.name = translations[translationIndex++];
                    lineup.startXI.forEach(player => {
                        player.player.name = translations[translationIndex++];
                    });
                    lineup.substitutes.forEach(player => {
                        player.player.name = translations[translationIndex++];
                    });
                });
    
                // Assign translations to statistics
                item.statistics.forEach(stat => {
                    stat.team.name = translations[translationIndex++];
                    stat.statistics.forEach(statEntry => {
                        statEntry.type = translations[translationIndex++];
                    });
                });
    
                // Assign translations to players
                item.players.forEach(playerGroup => {
                    playerGroup.team.name = translations[translationIndex++];
                    playerGroup.players.forEach(player => {
                        player.player.name = translations[translationIndex++];
                    });
                });
            });
        }
    }
    
    return formattedFixture;
}

module.exports = { getFixtureDetails };