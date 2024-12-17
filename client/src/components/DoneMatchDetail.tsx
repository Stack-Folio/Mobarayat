import { EventsType, TeamsType } from "@/utils/Types";
import GoalComponent from "./ui/GoalComponent";
import SwitchComponent from "./ui/SwitchComponent";
import CardComponent from "./ui/CardComponent";

const DoneMatchDetail = ({
  events,
  teams,
}: {
  events: EventsType[];
  teams: TeamsType;
}) => {
  const homeTeam = events.filter((el) => el.team.id === teams.home.id);
  const awayTeam = events.filter((el) => el.team.id === teams.away.id);

  return (
    <div className="my-10 flex gap-5 justify-center mx-auto">
      <div className="flex flex-col gap-2">
        {homeTeam.map((el, idx) =>
          el.type === "Goal" ? (
            <GoalComponent key={idx} data={el} />
          ) : el.type === "subst" ? (
            <SwitchComponent key={idx} data={el} />
          ) : el.type === "Card" ? (
            <CardComponent key={idx} data={el} />
          ) : (
            ""
          )
        )}
      </div>

      <span className="w-0.5 min-h-full bg-primary block"></span>

      <div className="flex flex-col gap-2">
        {awayTeam.map((el, idx) =>
          el.type === "Goal" ? (
            <GoalComponent key={idx} data={el} />
          ) : el.type === "subst" ? (
            <SwitchComponent key={idx} data={el} />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default DoneMatchDetail;
