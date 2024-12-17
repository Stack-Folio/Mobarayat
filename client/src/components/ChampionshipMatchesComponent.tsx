import { FixtureType } from "@/utils/Types";
import ElementContainer from "./ui/ElementContainer";
import LeagueTitle from "./ui/LeagueTitle";
import NoMatchToday from "./ui/NoMatchToday";
import MatchCardTable from "./MatchCardTable";
import { useTranslations } from "next-intl";

const ChampionshipMatchesComponent = ({ data }: { data: FixtureType[] }) => {
  const t = useTranslations("Words");

  if (data.length === 0) {
    return <NoMatchToday />;
  }

  const date = data[0].fixtureDate;
  return (
    <div>
      <LeagueTitle>
        {t("today")} | {date}
      </LeagueTitle>
      <ElementContainer>
        <div className="space-y-2 w-full">
          {data.map((el: FixtureType, idx: number) => (
            <MatchCardTable
              key={idx}
              data={{
                fixtureId: el.fixtureId,
                status: el.status,
                fixtureFullDate: el.fixtureFullDate,
                fixtureDate: el.fixtureDate,
                fixtureTime: el.fixtureTime,
                teams: el.teams,
                goals: el.goals,
              }}
            />
          ))}
        </div>
      </ElementContainer>
    </div>
  );
};

export default ChampionshipMatchesComponent;
