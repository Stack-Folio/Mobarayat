"use client";
import Image from "next/image";
import Link from "next/link";
import PlayerInPlan from "./ui/PlayerInPlan";
import { LineupsType } from "@/utils/Types";
import { useState } from "react";

const TeamPlan = ({ data }: { data: LineupsType[] }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="my-8">
      <div className="flex justify-center gap-10">
        <Link
          onClick={() => setActive(0)}
          href={"?show=plan&team=0"}
          className={`${
            active === 0
              ? "text-primary border-primary"
              : "text-secondary border-secondary "
          } flex items-center font-bold gap-3 border-b-2  pb-2`}
        >
          <Image
            src={data[0].team.logo}
            alt="logo"
            width={50}
            height={50}
            className="max-sm:max-w-8"
          />
          <span>{data[0].formation}</span>
        </Link>
        <Link
          onClick={() => setActive(1)}
          href={"?show=plan&team=1"}
          className={`${
            active === 1
              ? "text-primary border-primary"
              : "text-secondary border-secondary "
          } flex items-center font-bold gap-3 border-b-2 pb-2`}
        >
          <span>{data[1].formation}</span>
          <Image
            src={data[1].team.logo}
            alt="logo"
            width={50}
            height={50}
            className="max-sm:max-w-8"
          />
        </Link>
      </div>
      <div
        className="min-h-[400px] bg-cover bg-center my-10 max-w-[500px] mx-auto lrt"
        style={{
          backgroundImage: "url('/stadium.png')",
        }}
      >
        {active === 0 ? (
          <PlayerInPlan data={data[0].startXI} formation={data[0].formation} />
        ) : (
          <PlayerInPlan data={data[1].startXI} formation={data[1].formation} />
        )}
      </div>
    </div>
  );
};

export default TeamPlan;
