"use client";
import { FixtureDetailsType } from "@/utils/Types";
import Image from "next/image";

const SingleMatchCard = ({ data }: { data: FixtureDetailsType }) => {
  const team = data.teams;
  const goals = data.goals;

  const status = data.fixture.status.short;

  return (
    <tbody className="divide-y divide-gray-200 whitespace-nowrap border-spacing-y-4">
      <tr className={`custom_space bg-white shadow-md rounded-xl`}>
        <td className="p-2 sm:p-4 text-xs text-gray-800">
          <div className="flex items-center gap-3 sm:text-base text-[10px] justify-end">
            <p className="truncate font-bold">{team.home.name}</p>
            <Image
              src={team.home.logo}
              alt="logo"
              width={40}
              height={40}
              className="sm:w-[40px] w-[20px]"
            />
          </div>
        </td>
        <td className="p-2 sm:p-4 text-sm text-gray-800 w-1/2 text-center">
          {status === "NS" ? (
            <p className="sm:text-xl text-[10px]">{data.fixture.fixtureTime}</p>
          ) : status === "PST" ? (
            <p className="sm:text-xl text-[10px]">مؤجلة</p>
          ) : (
            <div className="sm:text-xl text-xs">
              <div>
                <span className="home">{goals.home}</span>
                <span> - </span>
                <span className="away">{goals.away}</span>
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
        </td>
        <td className="p-2 sm:p-4 text-sm text-gray-800">
          <div className="flex items-center gap-3 sm:text-base text-[10px]">
            <Image
              src={team.away.logo}
              alt="logo"
              width={40}
              height={40}
              className="sm:w-[40px] w-[20px]"
            />
            <p className="truncate  font-bold">{team.away.name}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={3} className="h-4"></td>
      </tr>
    </tbody>
  );
};

export default SingleMatchCard;
