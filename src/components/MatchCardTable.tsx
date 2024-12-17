"use client";
import timezoneConverter from "@/utils/timezoneConverter";
import { FixtureDetailsType, FixtureType } from "@/utils/Types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import DoneMatchDetail from "./DoneMatchDetail";
import { getFixtureDetailsById } from "@/utils/fetchData";
import Link from "next/link";

const MatchCardTable = ({ data }: { data: FixtureType }) => {
  const stStatus = ["LIVE", "1H", "2H", "ET", "BT", "P", "INT"];
  const htStatus = ["HT"];
  const ntStatus = ["TBD", "NS", "PST", "ABD"];
  const doneStatus = ["FT", "AET", "PEN"];

  const t = useTranslations("Words");
  const team = data.teams;
  const goals = data.goals;
  const locale = useLocale();

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const [time, setTime] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const calc = timezoneConverter({ mainTime: data.fixtureFullDate });
    setTime(calc.formattedTime);
  }, [data.fixtureFullDate]);

  const handleClick = () => {
    if (!!data.fixtureId) {
      // route.push(`/match/${data.fixtureId}`);
      setActive((prev) => !prev);
    }
  };

  const [result, setResult] = useState<FixtureDetailsType>();

  useEffect(() => {
    const main = async () => {
      const res = await getFixtureDetailsById({
        matchId: data.fixtureId,
        lang: locale,
      });

      if (res.status === "success") {
        if (res.data.length !== 0) {
          setResult(res.data[0]);
        }
      }
    };
    const intervalId = setInterval(() => {
      main();
    }, 60000);

    main();

    return () => clearInterval(intervalId);
  }, [data.fixtureId, locale]);

  return (
    <>
      <div className="divide-y divide-gray-200 whitespace-nowrap  border-spacing-y-4 text-center relative">
        <div
          className={`${
            !!data.fixtureId ? "cursor-pointer" : "cursor-default"
          } custom_space bg-white shadow-md px-2 md:px-5 flex items-center justify-center`}
          onClick={handleClick}
        >
          <div className="p-2 sm:p-4 text-xs text-gray-800 md:text-sm flex-1">
            <div className="flex items-center gap-3 sm:text-base text-[8px] justify-end">
              <p className="font-bold whitespace-normal">{team.home.name}</p>
              <Image
                src={team.home.logo}
                alt="logo"
                width={40}
                height={40}
                className="sm:w-[40px] w-[20px]"
              />
            </div>
          </div>
          <div className="p-2 sm:p-4 text-xs text-gray-800 w-1/5 md:w-1/3 text-center md:text-sm flex-1">
            {stStatus.includes(String(data.status)) && (
              <>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white px-5 max-sm:px-4 max-sm:py-0 max-sm:text-[9px] border">
                  <span className="text-[8px] max-sm:text-[5px] animate-fade">
                    🟢
                  </span>
                  {result?.fixture.status.extra && (
                    <span className="text-[9px] text-red-600">
                      [+{result?.fixture.status.extra}]
                    </span>
                  )}
                  <span className="text-[10px]">
                    {result?.fixture.status.elapsed}
                  </span>
                </div>
                <div className="sm:text-xl text-xs pt-2">
                  <div>
                    <span className="home">{goals.home}</span>
                    <span> - </span>
                    <span className="away">{goals.away}</span>
                  </div>
                  {goals.hasPenalty && (
                    <div className="bg-secondary mt-1 rounded-lg text-[10px] text-center  w-fit px-5 mx-auto">
                      <span className="home text-[10px]">
                        {goals.penalty.home}
                      </span>
                      <span className="text-[10px]"> - </span>
                      <span className="away text-[10px]">
                        {goals.penalty.away}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            {htStatus.includes(String(data.status)) && (
              <>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white px-5 max-sm:px-4 max-sm:py-0 max-sm:text-[9px] border">
                  <span className="text-[10px]">بين الشوطين</span>
                </div>
                <div className="sm:text-xl text-xs pt-2">
                  <div>
                    <span className="home">{goals.home}</span>
                    <span> - </span>
                    <span className="away">{goals.away}</span>
                  </div>
                  {goals.hasPenalty && (
                    <div className="bg-secondary mt-1 rounded-lg text-[10px] text-center  w-fit px-5 mx-auto">
                      <span className="home text-[10px]">
                        {goals.penalty.home}
                      </span>
                      <span className="text-[10px]"> - </span>
                      <span className="away text-[10px]">
                        {goals.penalty.away}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            {ntStatus.includes(String(data.status)) && (
              <>
                {data.fixtureDate == formattedDate && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white px-5 max-sm:px-4 max-sm:py-0 max-sm:text-[9px] border ">
                    <span>{t("soon")}</span>
                  </div>
                )}

                <p className="sm:text-xl text-[10px] pt-2">
                  {time ? time : t("postponed")}
                </p>
              </>
            )}
            {doneStatus.includes(String(data.status)) && (
              <div className="sm:text-xl text-xs pt-2">
                <div>
                  <span className="home">{goals.home}</span>
                  <span> - </span>
                  <span className="away">{goals.away}</span>
                </div>
                {goals.hasPenalty && (
                  <div className="bg-secondary mt-1 rounded-lg text-[10px] text-center w-fit px-5 mx-auto">
                    <span className="home text-[10px]">
                      {goals.penalty.home}
                    </span>
                    <span className="text-[10px]"> - </span>
                    <span className="away text-[10px]">
                      {goals.penalty.away}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="p-2 sm:p-4 text-xs text-gray-800 md:text-sm flex-1">
            <div className="flex items-center gap-3 sm:text-base text-[8px]">
              <Image
                src={team.away.logo}
                alt="logo"
                width={40}
                height={40}
                className="sm:w-[40px] w-[20px]"
              />
              <p className="font-bold whitespace-normal">{team.away.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>{active && <MtchDetails result={result} time={time} />}</div>
        </div>
      </div>
    </>
  );
};

const MtchDetails = ({
  result,
  time,
}: {
  result: FixtureDetailsType | undefined;
  time: string | null;
}) => {
  const t = useTranslations("Words");
  if (!result || result?.events.length === 0) {
    if (result) {
      return (
        <div className="mt-5 text-center">
          <span className="mb-2 block">{time}</span>
          <Link
            href={`/match/${result.fixture.fixtureId}`}
            className="bg-primary text-white rounded-md px-3 py-1 mx-auto flex justify-center w-fit max-sm:text-xs"
          >
            {t("matchPage")}
          </Link>
          <div className="my-5 text-xs md:text-sm flex justify-center items-center gap-3">
            <Image src={"/stadium.svg"} alt="stadium" width={20} height={20} />
            <span>{result.fixture.venueName}</span>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }

  return (
    <div className="">
      <DoneMatchDetail events={result.events} teams={result.teams} />
      <Link
        href={`/match/${result.fixture.fixtureId}`}
        className="bg-primary text-white rounded-md px-3 py-1 mx-auto flex justify-center w-fit max-sm:text-xs"
      >
        {t("matchPage")}
      </Link>
      <div className="my-5 text-xs md:text-sm flex justify-center items-center gap-3">
        <Image src={"/stadium.svg"} alt="stadium" width={20} height={20} />
        <span>{result.fixture.venueName}</span>
      </div>
    </div>
  );
};

export default MatchCardTable;
