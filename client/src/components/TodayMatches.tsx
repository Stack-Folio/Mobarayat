import { FixtureMatches, TodayMatchesType } from "@/utils/Types";
import MatchCardTable from "./MatchCardTable";
import TodayMatchesTitle from "./ui/TodayMatchesTitle";
import { useTranslations } from "next-intl";

const TodayMatches = ({ leagues }: { leagues: TodayMatchesType }) => {
  const stStatus = ["LIVE", "1H", "HT", "2H", "ET", "BT", "P", "INT"];
  const ntStatus = ["TBD", "NS", "PST", "ABD"];
  const doneStatus = ["FT", "AET", "PEN"];
  const t = useTranslations("MatchStatus");

  const leagueName = leagues.leagueName;
  const leagueId = leagues.leagueId;
  const leagueLogo = leagues.leagueLogo;

  const startedMatches = leagues.matches.filter((el) =>
    stStatus.includes(String(el.status))
  );

  const notStartedMatches = leagues.matches.filter((el) =>
    ntStatus.includes(String(el.status))
  );

  const doneMatches = leagues.matches.filter((el) =>
    doneStatus.includes(String(el.status))
  );

  return (
    <div>
      <TodayMatchesTitle
        text={leagueName}
        id={leagueId}
        logo={leagueLogo}
        state={`${
          startedMatches.length > 0
            ? t("live") + " (" + startedMatches.length + ")"
            : notStartedMatches.length > 0
            ? t("notStarted")
            : t("done")
        }`}
        status={`${
          startedMatches.length > 0
            ? "LIVE"
            : notStartedMatches.length > 0
            ? "NS"
            : "DONE"
        }`}
      />
      <div className="space-y-1 w-full">
        {startedMatches.length > 0 && <Started matches={startedMatches} />}
        {notStartedMatches.length > 0 && (
          <NotStarted matches={notStartedMatches} />
        )}
        {doneMatches.length > 0 && <Done matches={doneMatches} />}
      </div>
    </div>
  );
};

export default TodayMatches;

const Started = ({ matches }: { matches: FixtureMatches[] }) => {
  return matches.map((el: FixtureMatches, idx: number) => (
    <MatchCardTable
      key={idx}
      data={{
        fixtureId: el.fixtureId,
        status: el.status,
        fixtureDate: el.fixtureDate,
        fixtureTime: el.fixtureTime,
        fixtureFullDate: el.fixtureFullDate,
        teams: el.teams,
        goals: el.goals,
      }}
    />
  ));
};
const NotStarted = ({ matches }: { matches: FixtureMatches[] }) => {
  return matches.map((el: FixtureMatches, idx: number) => (
    <MatchCardTable
      key={idx}
      data={{
        fixtureId: el.fixtureId,
        status: el.status,
        fixtureDate: el.fixtureDate,
        fixtureTime: el.fixtureTime,
        fixtureFullDate: el.fixtureFullDate,
        teams: el.teams,
        goals: el.goals,
      }}
    />
  ));
};
const Done = ({ matches }: { matches: FixtureMatches[] }) => {
  return matches.map((el: FixtureMatches, idx: number) => (
    <MatchCardTable
      key={idx}
      data={{
        fixtureId: el.fixtureId,
        status: el.status,
        fixtureDate: el.fixtureDate,
        fixtureTime: el.fixtureTime,
        fixtureFullDate: el.fixtureFullDate,
        teams: el.teams,
        goals: el.goals,
      }}
    />
  ));
};
