"use client";
import Loading from "@/app/[locale]/(main)/loading";
import { getFixtureDetailsById } from "@/utils/fetchData";
import timezoneConverter from "@/utils/timezoneConverter";
import { FixtureDetailsType } from "@/utils/Types";
import Image from "next/image";
import { useEffect, useState } from "react";

const FavoritMatchCard = ({ id, lang }: { id: number; lang: string }) => {
  const [data, setData] = useState<FixtureDetailsType>();
  const [time, setTime] = useState<string | null>(null);

  console.log(data);

  useEffect(() => {
    const main = async () => {
      const match = await getFixtureDetailsById({ matchId: `${id}`, lang });
      const calc = timezoneConverter({
        mainTime: match.data[0].fixture.fixtureFullDate,
      });
      setTime(calc.formattedTime);
      setData(match.data[0]);
    };
    main();
  }, [id, lang]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="divide-y divide-gray-200 whitespace-nowrap border-spacing-y-4">
      <div className={`custom_space bg-white shadow-md rounded-xl flex`}>
        <div className="p-2 sm:p-4 text-xs text-gray-800  min-w-32 sm:min-w-56">
          <div className="flex items-center gap-3 sm:text-base text-[10px] justify-end">
            <p className="truncate font-bold">{data.teams.home.name}</p>
            <Image
              src={data.teams.home.logo}
              alt="logo"
              width={40}
              height={40}
              className="sm:w-[40px] w-[20px]"
            />
          </div>
        </div>
        <div className="p-2 sm:p-4 text-sm text-gray-800 w-1/2 text-center">
          {data.fixture.status.short === "NS" ? (
            <p className="sm:text-xl text-[10px]">{time}</p>
          ) : data.fixture.status.short === "PST" ? (
            <p className="sm:text-xl text-[10px]">مؤجلة</p>
          ) : (
            <div className="sm:text-xl text-xs">
              <div>
                <span className="home">{data.goals.home}</span>
                <span> - </span>
                <span className="away">{data.goals.away}</span>
              </div>
              {data.score.penalty.home ||
                (data.score.penalty.away && (
                  <div className="bg-secondary mt-1 rounded-lg text-[10px] text-center">
                    <span className="home text-[10px]">
                      {data.score.penalty.home}
                    </span>
                    <span className="text-[10px]"> - </span>
                    <span className="away text-[10px]">
                      {data.score.penalty.away}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="p-2 sm:p-4 text-sm text-gray-800 min-w-32 sm:min-w-56">
          <div className="flex items-center gap-3 sm:text-base text-[10px]">
            <Image
              src={data.teams.away.logo}
              alt="logo"
              width={40}
              height={40}
              className="sm:w-[40px] w-[20px]"
            />
            <p className="truncate  font-bold">{data.teams.away.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritMatchCard;
