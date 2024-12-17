import { EventsType } from "@/utils/Types";
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/24/solid";

const SwitchComponent = ({ data }: { data: EventsType }) => {
  return (
    <div className="space-y-2 bg-white p-2 px-4 rounded-lg text-sm max-sm:text-xs">
      <div className="text-green-600 flex">
        <span className="text-black me-2">`{data.time.elapsed || 0}</span>
        <ArrowLongUpIcon className="w-6 max-sm:w-4" />
        <span>{data.assist.name}</span>
      </div>
      <div className="text-red-600 flex">
        <ArrowLongDownIcon className="w-6 max-sm:w-4" />
        <span>{data.player.name}</span>
      </div>
    </div>
  );
};

export default SwitchComponent;
