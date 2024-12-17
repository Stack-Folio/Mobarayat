import { LeagueType } from "@/utils/Types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import DetailsTitle from "./ui/DetailsTitle";

const ChampionshipCard = ({ data }: { data: LeagueType }) => {
  const t = useTranslations("Championships.card");
  return (
    <div className="shadow-lg rounded-lg p-5 flex flex-col justify-center items-center">
      <Link
        href={`/championships/${data.leagueId}`}
        className="text-xl max-sm:text-base font-bold text-dark flex gap-3 items-center"
      >
        <span>{data.leagueName}</span>
        {data.leagueCountryFlag && (
          <Image src={data.leagueCountryFlag} alt="" width={20} height={20} />
        )}
      </Link>
      <Link
        href={`/championships/${data.leagueId}`}
        className="flex-1 flex justify-center items-center"
      >
        <Image
          className="my-3 max-w-[100px] max-sm:max-w-[80px]"
          src={data.leagueLogo}
          alt="logo"
          width={1000}
          height={1000}
        />
      </Link>
      <div className="mt-3 flex flex-col justify-center items-center gap-2 w-full text-center text-primary font-medium max-sm:text-sm relative">
        <h2 className=" absolute end-0 bottom-0 z-[99]">
          <DetailsTitle
            text={``}
            date={""}
            Type={"league"}
            id={data.leagueId}
          />
        </h2>
      </div>
      {/* <div className="mt-3 flex flex-col justify-center items-center gap-2 w-full text-center text-primary font-medium max-sm:text-sm">
        <Link
          href={`/championships/${data.leagueId}?show=groups`}
          className="border-b w-full pb-3"
        >
          {t("group")}
        </Link>
        <Link
          href={`/championships/${data.leagueId}?show=scorers`}
          className="border-b w-full pb-3"
        >
          {t("scorers")}
        </Link>
        <Link
          href={`/championships/${data.leagueId}?show=matches`}
          className="w-full"
        >
          {t("matches")}
        </Link>
      </div> */}
    </div>
  );
};

export default ChampionshipCard;
