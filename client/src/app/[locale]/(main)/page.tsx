import MainPage from "@/components/MainPage";
import TodayMatches from "@/components/TodayMatches";
import Container from "@/components/ui/Container";
import DateComponent from "@/components/ui/DateComponent";
import ElementContainer from "@/components/ui/ElementContainer";
import MatchFilter from "@/components/ui/MatchFilter";
import SearchResultTitle from "@/components/ui/SearchResultTitle";
import { getMatches } from "@/utils/fetchData";
import { FixtureMatches, FixtureType } from "@/utils/Types";

export default async function Home({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { date: string; match: string; page: string; limit: string };
}) {
  const lang = params.locale;
  const { date, match } = searchParams;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const matches = await getMatches({
    date: date ? date : formattedDate,
    lang,
    page: "1",
    limit: "1000",
  });

  let inPlay = 0;
  const stStatus = ["LIVE", "1H", "HT", "2H", "ET", "BT", "P", "INT"];

  matches.data.filter(
    (el: FixtureMatches) => stStatus.includes(el.status) && inPlay++
  );

  if (match) {
    const filteredMatch = matches.data.filter(
      (el: FixtureType) =>
        el.teams.home.name.toLowerCase().includes(match.toLowerCase()) ||
        el.teams.away.name.toLowerCase().includes(match.toLowerCase())
    );
    const groupedFixtures = groupFixturesByLeague(filteredMatch);

    return (
      <Container>
        <ElementContainer>
          <SearchResultTitle>{match}</SearchResultTitle>
        </ElementContainer>
        {Object.values(groupedFixtures).map((el, idx) => (
          <TodayMatches
            key={idx}
            leagues={{
              leagueLogo: el.leagueLogo,
              leagueId: el.leagueId,
              leagueName: el.leagueName,
              matches: el.matches,
            }}
          />
        ))}
      </Container>
    );
  }

  const groupedFixtures = groupFixturesByLeague(matches.data);

  return (
    <Container>
      <ElementContainer>
        <MatchFilter />
        <DateComponent date={date} lang={lang} />

        <MainPage inPlay={inPlay} groupedFixtures={groupedFixtures} />
      </ElementContainer>
    </Container>
  );
}

export type GroupedFixtures = {
  [leagueId: string]: {
    leagueName: string;
    leagueLogo: string;
    leagueId: string;
    matches: FixtureMatches[];
  };
};

function groupFixturesByLeague(data: FixtureMatches[]) {
  const grouped: GroupedFixtures = {};

  data.map((match) => {
    const { league } = match;

    if (league) {
      const leagueId = league.leagueId;

      if (!grouped[leagueId]) {
        grouped[leagueId] = {
          leagueName: league.leagueName,
          leagueId: league.leagueId,
          leagueLogo: league.leagueLogo,
          matches: [],
        };
      }
      grouped[leagueId].matches.push(match);
    }
  });

  return grouped;
}
