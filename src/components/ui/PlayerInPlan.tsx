import { StartXITypes } from "@/utils/Types";
import Image from "next/image";

const PlayerInPlan = ({
  data,
  formation,
}: {
  data: StartXITypes[];
  formation: string;
}) => {
  const rows = formation.split("-").length + 1;

  return (
    <div className="px-6 max-sm:py-4 sm:px-16 h-full flex flex-col-reverse justify-between min-h-[360px] max-sm:text-sm">
      {Array.from({ length: rows }).map((_, ro) => (
        <div className="flex justify-evenly flex-row-reverse py-2" key={ro}>
          {data.map((el, idx) => {
            const pic = el.player.grid.split(":")[0];

            return (
              +pic === ro + 1 && (
                <div className="text-center" key={idx}>
                  <span className="rounded-full mx-auto min-w-7 min-h-7 w-7 h-7 flex justify-center items-center bg-red-500">
                    {el.player.name.split(" ")[0][0]}
                  </span>
                  {/* <Image
                    src="/cr7.jpg"
                    alt={el.player.name}
                    width={50}
                    height={50}
                    className="rounded-full mx-auto w-[40px] h-[40px] max-sm:max-w-7 max-sm:max-h-7"
                  /> */}
                  <span className="text-white text-xs sm:text-sm block mt-1">
                    {el.player.name.split(" ")[0][0]}.{" "}
                    {el.player.name.split(" ")[1]}
                  </span>
                </div>
              )
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PlayerInPlan;
// return (
//   <div className="px-6 max-sm:py-4 sm:px-16 h-full flex flex-col justify-center max-sm:text-sm">
//     {Array.from({ length: rows }).map((_, ro) => (
//       <div className="flex justify-evenly py-4" key={ro}>
//         {team[ro]?.map((el, idx) => (
//           <div className="text-center" key={idx}>
//             <Image
//               src="/cr7.jpg"
//               alt={el.name}
//               width={50}
//               height={50}
//               className="rounded-full mx-auto w-[40px] h-[40px] max-sm:max-w-7 max-sm:max-h-7"
//             />
//             <span className="text-white text-xs sm:text-sm block mt-1">
//               {el.name.split(" ")[0][0]}. {el.name.split(" ")[1]}
//             </span>
//           </div>
//         ))}
//       </div>
//     ))}
//   </div>
// );
// const groupPlayersByPos = (startXI: StartXIItem[]): Player[][] => {
//   const grouped = startXI.reduce<Record<string, Player[]>>(
//     (acc, { player }) => {
//       const { pos } = player;
//       if (!acc[pos]) {
//         acc[pos] = [];
//       }
//       acc[pos].push(player);

//       return acc;
//     },
//     {}
//   );

//   return Object.values(grouped);
// };

// const team = groupPlayersByPos(data).reverse();
