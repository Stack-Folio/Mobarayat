import { EventsType } from "@/utils/Types";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const GoalComponent = ({ data }: { data: EventsType }) => {
  const t = useTranslations("Words");
  return (
    <div className="text-sm max-sm:text-xs">
      <div className="flex gap-2 bg-goal p-2.5 px-4 rounded-lg ">
        <span>{data.player.name}</span>
        <GlobeAltIcon className="w-5" />
        <span>`{data.time.elapsed}</span>
      </div>
      <p className="mt-2 block text-start">
        {data.assist.name && (
          <>
            <span>{t("assist")} : </span>
            <span>{data.assist.name}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default GoalComponent;
