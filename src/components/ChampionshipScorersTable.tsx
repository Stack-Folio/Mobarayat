import { ScorersType } from "@/utils/Types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ChampionshipScorersTable = ({ result }: { result: ScorersType[] }) => {
  const t = useTranslations("Championships.scorers");
  return (
    <table className="min-w-full bg-white text-center mt-10 shadow-sm">
      <thead className="bg-white whitespace-nowrap">
        <tr>
          <th className="p-2 font-bold text-dark max-sm:text-sm"></th>
          <th className="p-2 font-bold text-dark max-sm:text-sm"></th>
          <th className="p-2 font-bold text-dark max-sm:text-sm text-start">
            {t("player")}
          </th>
          <th className="p-2 font-bold text-dark max-sm:text-sm">
            {t("goals")}
          </th>
        </tr>
      </thead>
      {result.map((el, idx) => (
        <tbody key={idx} className="whitespace-nowrap bg-gray-100">
          <tr className="hover:bg-gray-50">
            <td className="">
              <span className="text-primary font-bold text-xl max-sm:text-sm">
                {idx + 1}
              </span>
            </td>
            <td>
              {el.player.photo && typeof el.player.photo === "string" && (
                <Image
                  className="w-[50px] h-[50px] rounded-full max-sm:w-[30px] max-sm:h-[30px]"
                  src={el.player.photo || "/logo.png"}
                  alt="img"
                  width={50}
                  height={50}
                />
              )}
            </td>
            <td className="p-2 text-[15px] text-dark">
              <div className="text-start">
                <span className="md:text-lg text-sm text-primary font-bold">
                  {el.player.firstname}
                </span>
                {el.statistics.map((el, idx) => (
                  <div key={idx} className="flex gap-2 items-center text-end">
                    <Image
                      src={el.team.logo || "/logo.png"}
                      alt="img"
                      width={25}
                      height={25}
                    />
                    <span className="font-bold text-xs text-end">
                      {el.team.name}
                    </span>
                  </div>
                ))}
              </div>
            </td>
            <td className="p-2 text-[15px] text-primary font-bold md:text-xl text-lg">
              {el.statistics.reduce(
                (acc, stat) => acc + (stat.goals.total || 0),
                0
              )}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default ChampionshipScorersTable;
