import { getStandings } from "@/utils/fetchData";
import { StandingsTypes } from "@/utils/Types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const ChampionshpGroupTable = async ({
  leagueId,
  season,
  lang,
}: {
  leagueId: string;
  season: number;
  lang: string;
}) => {
  const t = await getTranslations("Championships.groups");
  const keys = [
    "team",
    "played",
    "won",
    "tied",
    "lost",
    "sign",
    "diffrence",
    "points",
  ];

  const res = await getStandings({ leagueId, season, lang });
  if (res.data.length === 0) {
    return (
      <div className="mt-12 text-primary font-bold text-center">
        {t("noStandings")}
      </div>
    );
  }
  const data = res.data[0].standings;

  return (
    <table className="min-w-full bg-white text-center mt-10 shadow-sm">
      <thead className="bg-white whitespace-nowrap max-sm:text-[10px]">
        <tr>
          {keys.map((el, i) => (
            <th key={i} className="p-2 font-bold text-dark">
              {t(`${el}`)}
            </th>
          ))}
        </tr>
      </thead>

      {data.map((el: StandingsTypes, idx: number) => (
        <tbody key={idx} className="whitespace-nowrap bg-gray-100 ">
          <tr className="hover:bg-gray-50">
            <td className="p-2 text-[15px] text-gray-800 flex items-center sm:gap-10 gap-1 max-sm:text-[10px]">
              <span className="text-primary font-bold">{el.rank}</span>
              <Image
                src={el.team.logo}
                alt="img"
                width={40}
                height={40}
                className="max-sm:w-[25px]"
              />
              <span>{el.team.name}</span>
            </td>
            <td className="p-2 text-[15px] text-gray-800 max-sm:text-[10px]">
              {el.all.played}
            </td>
            <td className="p-2 text-[15px] text-gray-800 max-sm:text-[10px]">
              {el.all.win}
            </td>
            <td className="p-2 text-[15px] text-gray-800 max-sm:text-[10px]">
              {el.all.draw}
            </td>
            <td className="p-2 text-[15px] text-gray-800 max-sm:text-[10px]">
              {el.all.lose}
            </td>
            <td className="p-2 text-[15px] text-gray-800 max-sm:text-[10px]">
              {el.all.goals.against}:{el.all.goals.for}
            </td>
            <td className="p-2 text-[15px] text-gray-800 max-sm:text-[10px]">
              {el.goalsDiff}
            </td>
            <td className="p-2 text-[15px] text-gray-800 max-sm:text-[10px]">
              {el.points}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default ChampionshpGroupTable;
