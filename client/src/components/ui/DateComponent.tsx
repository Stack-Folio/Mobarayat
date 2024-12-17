"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DateComponent = ({ date, lang }: { date: string; lang: string }) => {
  const t = useTranslations("WeekDays");
  const route = useRouter();
  const [currentDate, setCurrentDate] = useState(() => {
    return date ? new Date(date) : new Date();
  });

  const [search, setSearch] = useState({
    date: "",
  });

  useEffect(() => {
    setCurrentDate(() => {
      return date ? new Date(date) : new Date();
    });
  }, [date]);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day < 10 ? `0${day}` : day}/${year}`;
  };
  const formatDateForQuery = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day < 10 ? `0${day}` : day}`;
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
    setSearch({
      ...search,
      date: formatDateForQuery(nextDay),
    });
  };

  const goToPreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
    setSearch({
      ...search,
      date: formatDateForQuery(prevDay),
    });
  };

  useEffect(() => {
    if (search.date) {
      route.push(`?date=${search.date}`);
    }
  }, [search, route]);

  const getDayName = (date: Date) => {
    const daysOfWeek = [
      `${t("sunday")}`,
      `${t("monday")}`,
      `${t("tuesday")}`,
      `${t("wednesday")}`,
      `${t("thursday")}`,
      `${t("friday")}`,
      `${t("saturday")}`,
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  return (
    <div className="my-10">
      <div className="flex justify-evenly text-primary font-bold">
        <span className="border-b border-primary pb-2 opacity-50">
          {t("yesterday")}
        </span>
        <span>{getDayName(currentDate)}</span>
        <span className="border-b border-primary pb-2 opacity-50">
          {t("tomorrow")}
        </span>
      </div>
      <div className="flex items-center mt-5 max-w-md mx-auto">
        <ChevronRightIcon
          className={`${
            lang !== "ar" && "rotate-180"
          } w-5 text-primary cursor-pointer`}
          onClick={goToPreviousDay}
        />
        <div className="relative  max-w-xs min-w-[300px] mx-auto w-full">
          <div className="bg-secondary bg-opacity-25 h-12 rounded-lg flex justify-center items-center">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <CalendarIcon className="w-5 h-5 text-secondary" />
            </span>
            <span className="text-center text-primary opacity-60">
              {formatDate(currentDate)}
            </span>
          </div>
        </div>
        <ChevronLeftIcon
          className={`${
            lang !== "ar" && "rotate-180"
          } w-5 text-primary cursor-pointer`}
          onClick={goToNextDay}
        />
      </div>
    </div>
  );
};

export default DateComponent;
