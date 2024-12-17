"use client";
import React, { useState } from "react";
import TodayMatches from "./TodayMatches";
import { GroupedFixtures } from "@/app/[locale]/(main)/page";
import { useTranslations } from "next-intl";

const MainPage = ({
  inPlay,
  groupedFixtures,
}: {
  inPlay: number;
  groupedFixtures: GroupedFixtures;
}) => {
  const [showAll, setShowAll] = useState(false);
  const allMatches = Object.values(groupedFixtures);
  const matchesToShow = showAll ? allMatches : allMatches.slice(0, 5);
  const t = useTranslations("Words");

  return (
    <>
      {inPlay > 0 ? (
        <div className="text-center flex justify-center items-center gap-3 text-sm font-bold">
          <span className="animate-fade">🟢</span>
          <span>
            {t("inPlay")} ({inPlay})
          </span>
        </div>
      ) : (
        <div className="text-center flex justify-center items-center gap-3 text-sm font-bold">
          <span>{t("noPlay")}</span>
        </div>
      )}

      {matchesToShow.map((el, idx) => (
        <TodayMatches
          key={idx}
          leagues={{
            leagueId: el.leagueId,
            leagueLogo: el.leagueLogo,
            leagueName: el.leagueName,
            matches: el.matches,
          }}
        />
      ))}
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="bg-primary p-2 px-8 text-white text-center mx-auto flex justify-center mt-5 rounded-lg hover:bg-dark transition-colors"
        >
          {t("more")}
        </button>
      )}
    </>
  );
};

export default MainPage;
