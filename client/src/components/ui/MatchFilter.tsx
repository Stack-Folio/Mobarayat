"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MatchFilter = () => {
  const [search, setSearch] = useState({
    match: "",
    date: new Date().toISOString().split("T")[0],
  });
  const route = useRouter();
  const t = useTranslations("Filters");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (search.date || search.match) {
      route.push(`?date=${search.date}&match=${search.match}`);
    }
  }, [search, route]);

  return (
    <form className="flex gap-3 max-sm:flex-col">
      <div className="relative w-full">
        <MagnifyingGlassIcon className="w-6 h-6 absolute start-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input
          type="text"
          name="match"
          placeholder={t("searchForMatch")}
          className="w-full bg-light p-3 placeholder:text-secondary ps-12 rounded-lg outline-none"
        />
      </div>
      <div className="relative">
        <input
          type={"date"}
          name="date"
          className="bg-light p-3 rounded-lg placeholder:text-secondary w-full min-w-[250px] outline-none text-secondary"
          onChange={handleDateChange}
          placeholder={t("chooseDate")}
          value={search.date}
        />
        {/* <span className="absolute inset-y-0 end-3 flex items-center pointer-events-none">
          <CalendarIcon className="w-5 h-5 text-secondary" />
        </span> */}
        {/* <div className="absolute start-0 top-0 w-full bg-secondary rounded-lg"></div> */}
      </div>
    </form>
  );
};

export default MatchFilter;
