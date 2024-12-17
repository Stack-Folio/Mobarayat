import { FixtureDetailsType } from "@/utils/Types";
import DoneMatchDetail from "./DoneMatchDetail";
import LeagueTitle from "./ui/LeagueTitle";
import MatchNotReady from "./ui/MatchNotReady";
import SingleMatchCard from "./SingleMatchCard";

const MatchDetail = ({ result }: { result: FixtureDetailsType }) => {
  const status = result.fixture.status.short || "NS";
  return (
    <div>
      <div>
        <LeagueTitle>{result.league.leagueName}</LeagueTitle>
        {status !== "NS" && (
          <table className="space-y-2 w-full">
            <SingleMatchCard data={result} />
          </table>
        )}
        {status === "NS" ? (
          <MatchNotReady />
        ) : (
          <DoneMatchDetail events={result.events} teams={result.teams} />
        )}
      </div>
    </div>
  );
};

export default MatchDetail;
