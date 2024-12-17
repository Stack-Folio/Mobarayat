const axios = require("axios");
const translateToArabic = require("../translationsServive");

// async function transliterateToArabic(text) {
//     const response = await axios.get(`https://transliterate.qcri.org/en2ar/${encodeURIComponent(text)}`);
//     return response.data.results; // Extracts the translated result from the API response
// }

async function getLeagues(lang, leagueId, type) {
  const params = {};
  if (leagueId) {
    params.id = parseInt(leagueId, 10);
  }
  if (type) {
    params.type = type;
  }

  const response = await axios.get(
    `${process.env.FootballAPIBaseURL}/leagues`,
    {
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.FootballAPIKey,
      },
      params: params,
    }
  );

  const leagues = response.data.response;
  let ftLeague = leagues.map((item) => {
    return {
      leagueId: item.league.id,
      leagueName: `${item.country.name ?? null} ${item.league.name}`,
      leagueType: item.league.type,
      leagueLogo: item.league.logo,
      leagueCountryName: item.country.name ?? null,
      leagueCountryFlag: item.country.flag ?? null,
    };
  });

  const topLeagues = [
    1, 2, 3, 4, 9, 7, 39, 140, 135, 307, 61, 78, 533, 45, 143,
  ];

  const formattedLeagues = [
    // إضافة الدوريات التي تطابق ترتيب topLeagues بالضبط
    ...topLeagues
      .map((id) => ftLeague.find((league) => league.leagueId === id))
      .filter(Boolean),
    // إضافة باقي الدوريات التي لم تكن موجودة في topLeagues
    ...ftLeague.filter((league) => !topLeagues.includes(league.leagueId)),
  ];

  if (lang === "ar") {
    let leagueNamesToTranslate = [];
    let translations = [];

    formattedLeagues.forEach((item) => {
      leagueNamesToTranslate.push(item.leagueName.toLowerCase());
    });

    translations = await translateToArabic(leagueNamesToTranslate);

    if (translations && translations.length === formattedLeagues.length) {
      for (let i = 0; i < formattedLeagues.length; i++) {
        formattedLeagues[i].leagueName = translations[i];
      }
    }
  }
  return formattedLeagues;
}

module.exports = { getLeagues };
