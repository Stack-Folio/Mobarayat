import { EventsType } from "@/utils/Types";

const CardComponent = ({ data }: { data: EventsType }) => {
  console.log(data);
  return (
    <div className="text-sm max-sm:text-xs">
      <div className="flex gap-2 bg-secondary p-2.5 px-4 rounded-lg ">
        <span>{data.player.name}</span>
        {data.detail.split(" ")[0] === "Yellow" ? (
          <span>🟨</span>
        ) : (
          <span>🟥</span>
        )}
        <span>`{data.time.elapsed}</span>
      </div>
    </div>
  );
};

export default CardComponent;
