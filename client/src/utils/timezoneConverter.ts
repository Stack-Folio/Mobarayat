"use client";
import { parseISO, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export default function timezoneConverter({ mainTime }: { mainTime: string }) {
  const utcTime = parseISO(mainTime);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zonedTime = toZonedTime(utcTime, userTimeZone);

  const formattedDate = format(zonedTime, "yyyy-MM-dd");
  const formattedTime = format(zonedTime, "hh:mm a");

  return {
    utcTime: mainTime,
    userTimeZone: userTimeZone,
    formattedDate: formattedDate,
    formattedTime: formattedTime,
  };
}
