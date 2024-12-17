"use client";
import { LeagueType } from "@/utils/Types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const Searchbar = () => {
  const t = useTranslations("Filters");
  return (
    <div className="relative max-w-5xl w-full mx-auto">
      <MagnifyingGlassIcon className="w-6 absolute start-3 top-1/2 -translate-y-1/2 text-[#98bed3]" />
      <input
        type="search"
        placeholder={t("searchForEvent")}
        className="p-3 px-4 ps-12 w-full rounded-lg bg-[#e1eaf0] placeholder:text-[#98bed3] outline-none"
      />
    </div>
  );
};
export const ChampionshipsSearchbar = ({
  search,
  allLeagues,
}: {
  search: string;
  allLeagues: LeagueType[];
}) => {
  const [searchValue, setSearchValue] = useState(search);
  const [champ, setChamp] = useState<LeagueType[]>();
  const t = useTranslations("Filters");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    setChamp(
      allLeagues.filter((el) =>
        el.leagueName.toLowerCase().includes(value.toLowerCase())
      )
    );

    if (value.trim() === "") {
      setChamp([]);
    }
  };

  return (
    <div className="relative max-w-5xl w-full mx-auto ">
      {champ && champ.length > 0 && (
        <ul className="absolute top-[50px] p-2 w-full bg-white text-primary shadow-md rounded-md z-[9999]">
          {champ.slice(0, 10).map((el, idx) => (
            <li key={idx} className="hover:bg-light p-2 rounded-sm">
              <Link className="w-full block" href={`?search=${el.leagueName}`}>
                {el.leagueName}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <MagnifyingGlassIcon className="w-6 absolute start-3 top-1/2 -translate-y-1/2 text-[#98bed3]" />
      <input
        type="search"
        onChange={handleSearch}
        placeholder={t("searchForChampionship")}
        value={searchValue}
        className="p-3 px-4 ps-12 w-full rounded-lg bg-[#e1eaf0] placeholder:text-[#98bed3] outline-none"
      />
      <Link
        href={`?search=${searchValue}`}
        className="absolute end-0 top-0 bg-primary h-full px-6 rounded-e-lg flex items-center text-white hover:bg-secondary transition-colors"
      >
        {t("search")}
      </Link>
    </div>
  );
};

export default Searchbar;
