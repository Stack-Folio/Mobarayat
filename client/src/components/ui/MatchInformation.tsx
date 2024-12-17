import { StatisticsTypes } from "@/utils/Types";
import Image from "next/image";

const MatchInformation = ({ result }: { result: StatisticsTypes[] }) => {
  return (
    <div className="mt-10 overflow-x-auto grid grid-cols-1 md:grid-cols-2 gap-3">
      {result.map((el, idx) => (
        <table className="w-full divide-y divide-white" key={idx}>
          <thead className="bg-white whitespace-nowrap">
            <tr>
              <th
                colSpan={2}
                className="px-4 py-4 text-start text-lg max-sm:text-xs font-bold text-primary uppercase tracking-wider"
              >
                <div className="flex gap-3 items-center justify-center">
                  <Image
                    src={el.team.logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-[40px]"
                  />
                  <span>{el.team.name}</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-light divide-y divide-white whitespace-nowrap">
            {el.statistics.map((ele, i) => (
              <tr key={i}>
                <td className="px-4 py-4 text-sm md:text-base text-primary font-bold">
                  {ele.type}
                </td>
                <td className="px-4 py-4 text-sm md:text-base text-primary font-bold">
                  {ele.value || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default MatchInformation;
