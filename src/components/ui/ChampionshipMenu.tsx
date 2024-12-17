"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

const ChampionshipMenu = ({ show }: { show: string }) => {
  const t = useTranslations("Championships.menu");
  const keys = ["groups", "scorers", "matches"];
  const [active, setActive] = useState(show || "groups");
  return (
    <div className="flex gap-10 justify-center text-primary font-bold">
      {keys.map((key, i) => (
        <Link
          key={i}
          href={`?show=${key}`}
          onClick={() => setActive(`${key}`)}
          className={`border-b-2 border-primary pb-2 sm:text-base text-xs ${
            active !== key && "opacity-20"
          }`}
        >
          {t(`${key}`)}
        </Link>
      ))}
    </div>
  );
};

export default ChampionshipMenu;
