"use client";
import { LeagueType } from "@/utils/Types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LeagueCardTable = ({
  data,
  text,
}: {
  data: LeagueType;
  text: string;
}) => {
  const startDate = new Date(data.start);
  const endDate = new Date(data.end);
  const currentDate = new Date();

  const t = useTranslations("Words");

  const timeDifference = endDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const daysLeftForStart = Math.ceil(
    (startDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const status =
    startDate.getTime() < currentDate.getTime()
      ? daysLeft >= 0
        ? `${daysLeft} ${t("days")}`
        : t("ended")
      : `${daysLeftForStart} ${t("days")}`;
  const route = useRouter();

  const handleClick = () => {
    route.push(`/championships/${data.leagueId}?show=matches`);
  };

  return (
    <tbody className="divide-y divide-gray-200 whitespace-nowrap border-spacing-y-4 w-full">
      <tr
        className={`cursor-pointer custom_space bg-white shadow-md rounded-xl flex justify-between text-center items-center`}
        onClick={handleClick}
      >
        <td className="p-2 sm:p-4 text-xs text-gray-800">
          <div className="flex items-center gap-3 sm:text-base text-[10px] justify-end">
            <Image
              src={data.leagueLogo}
              alt="logo"
              width={50}
              height={50}
              className="sm:w-[50px] w-[30px]"
            />
          </div>
        </td>
        <td className="p-2 sm:p-4 text-sm text-gray-800 w-1/2 text-center">
          <div>
            <p className="truncate font-bold">{data.leagueName}</p>
            <p className="text-xs text-gray-400">[ {text} ]</p>
          </div>
        </td>
        <td className="p-2 sm:p-4 text-sm text-gray-800">
          <div>
            <p className="truncate font-bold">{status}</p>
            <p className="text-xs text-gray-400">( {data.end} )</p>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={3} className="h-4"></td>
      </tr>
    </tbody>
  );
};

export default LeagueCardTable;
