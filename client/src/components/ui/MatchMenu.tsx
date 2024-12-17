"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const MatchMenu = () => {
  const searchParams = useSearchParams();
  const show = searchParams.get("show");
  const t = useTranslations("Match.menu");
  const [active, setActive] = useState(show);

  return (
    <div className="flex gap-10 justify-center text-primary font-bold">
      <Link
        href={"?"}
        onClick={() => setActive(null)}
        className={`border-b-2 border-primary pb-2 ${
          active !== null && "opacity-20"
        }`}
      >
        {t("match")}
      </Link>
      <Link
        href={"?show=plan"}
        onClick={() => setActive("plan")}
        className={`border-b-2 border-primary pb-2 ${
          active !== "plan" && "opacity-40"
        }`}
      >
        {t("plan")}
      </Link>
      <Link
        href={"?show=details"}
        onClick={() => setActive("details")}
        className={`border-b-2 border-primary pb-2 ${
          active !== "details" && "opacity-40"
        }`}
      >
        {t("details")}
      </Link>
    </div>
  );
};

export default MatchMenu;
