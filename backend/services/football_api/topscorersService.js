const axios = require('axios');
const translateToArabic = require("../translationsServive");

async function getTopscorers(lang, leagueId, season) {
    const params = {};
    if (leagueId) {
        params.league = parseInt(leagueId, 10);
    }
    if (season) {
        params.season = parseInt(season, 10);
    }

    const response = await axios.get(`${process.env.FootballAPIBaseURL}/players/topscorers`, {
        headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.FootballAPIKey
        },
        params: params
    });

    const topscorers = response.data.response;
    let formattedTopscorers = topscorers.map(item => {
        
        return {
            player: {
                id: item.player.id ?? null,
                name: item.player.name ?? null,
                firstname: item.player.firstname ?? null,
                lastname: item.player.lastname ?? null,
                photo: item.player.photo ?? null,
            },            
            statistics: item.statistics ? item.statistics.map(stat => ({
                team: {
                    id: stat.team.id ?? null,
                    name: stat.team.name ?? null,
                    logo: stat.team.logo ?? null
                },
                goals: {
                    total: stat.goals.total ?? 0
                }
            })) : null,
        };
    });
    // if (lang === "ar") {
    //     let namesToTranslate = [];
    
    //     formattedTopscorers.forEach(item => {
    //         // Collect player names
    //         namesToTranslate.push(item.player.name.toLowerCase());
    //         namesToTranslate.push(item.player.firstname.toLowerCase());
    //         namesToTranslate.push(item.player.lastname.toLowerCase());
    
    //         // Collect team names from statistics
    //         item.statistics.forEach(stat => {
    //             namesToTranslate.push(stat.team.name.toLowerCase());
    //         });
    //     });
    
    //     const translations = await translateToArabic(namesToTranslate);
    
    //     if (translations && translations.length === formattedTopscorers.length * 4) {
    //         let translationIndex = 0;
    
    //         formattedTopscorers.forEach(item => {
    //             // Translate player names
    //             item.player.name = translations[translationIndex++];
    //             item.player.firstname = translations[translationIndex++];
    //             item.player.lastname = translations[translationIndex++];
    
    //             // Translate team names in statistics
    //             item.statistics.forEach(stat => {
    //                 stat.team.name = translations[translationIndex++];
    //             });
    //         });
    //     }
    // }
    if (lang === "ar") {
        let namesToTranslate = [];
    
        formattedTopscorers.forEach(item => {
            // Collect player names with null checks
            if (item.player.name) {
                namesToTranslate.push(item.player.name.toLowerCase());
            }
            if (item.player.firstname) {
                namesToTranslate.push(item.player.firstname.toLowerCase());
            }
            if (item.player.lastname) {
                namesToTranslate.push(item.player.lastname.toLowerCase());
            }
    
            // Collect team names from statistics with null checks
            item.statistics.forEach(stat => {
                if (stat.team.name) {
                    namesToTranslate.push(stat.team.name.toLowerCase());
                }
            });
        });
    
        const translations = await translateToArabic(namesToTranslate);
    
        let totalExpectedTranslations = formattedTopscorers.reduce((acc, item) => {
            let count = 0;
            if (item.player.name) count++;
            if (item.player.firstname) count++;
            if (item.player.lastname) count++;
            count += item.statistics.filter(stat => stat.team.name).length;
            return acc + count;
        }, 0);
    
        if (translations && translations.length === totalExpectedTranslations) {
            let translationIndex = 0;
    
            formattedTopscorers.forEach(item => {
                // Translate player names with null checks
                if (item.player.name) {
                    item.player.name = translations[translationIndex++];
                }
                if (item.player.firstname) {
                    item.player.firstname = translations[translationIndex++];
                }
                if (item.player.lastname) {
                    item.player.lastname = translations[translationIndex++];
                }
    
                // Translate team names in statistics with null checks
                item.statistics.forEach(stat => {
                    if (stat.team.name) {
                        stat.team.name = translations[translationIndex++];
                    }
                });
            });
        }
    }

    return formattedTopscorers;
}

module.exports = { getTopscorers };