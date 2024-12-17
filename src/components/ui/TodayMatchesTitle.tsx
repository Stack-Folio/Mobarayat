import {
  ClockIcon,
  QueueListIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import DetailsTitle from "./DetailsTitle";

const TodayMatchesTitle = ({
  text,
  id,
  state,
  status,
  logo,
}: {
  text: string;
  id: string;
  state: string;
  status: string;
  logo: string;
}) => {
  const t = useTranslations("Championships.menu");
  return (
    <h2 className="my-5 mt-20 font-bold text-primary border-b-2 pb-3 mx-auto">
      <div className="flex items-center text-xs gap-2 text-gray-500 mb-3">
        {status === "LIVE" ? (
          <span className="animate-fade">🟢</span>
        ) : status === "NS" ? (
          <span className="opacity-50">⚫</span>
        ) : status === "DONE" ? (
          <span>⚫</span>
        ) : (
          ""
        )}
        <span>{state}</span>
      </div>
      <div className="flex flex-col gap-3 border-s-2 border-primary bg-light">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 px-2 pt-3">
            <Image src={logo} alt="logo" width={30} height={30} />
            <span className="max-sm:text-xs">{text}</span>
          </div>
          <div>
            <DetailsTitle text={``} date={``} Type={"league"} id={id} />
          </div>
        </div>
        <ul className="flex justify-end p-2 gap-5 text-primary w-full max-sm:text-xs ps-8 bg-secondary">
          <li className=" hover:text-white transition-colors">
            <Link
              href={`/championships/${id}?show=groups`}
              className="flex gap-2"
            >
              <QueueListIcon className="w-5" />
              {t("groups")}
            </Link>
          </li>
          <li className=" hover:text-white transition-colors">
            <Link
              href={`/championships/${id}?show=scorers`}
              className="flex gap-2"
            >
              <UsersIcon className="w-5" />
              {t("scorers")}
            </Link>
          </li>
          <li className=" hover:text-white transition-colors">
            <Link
              href={`/championships/${id}?show=matches`}
              className="flex gap-2"
            >
              <ClockIcon className="w-5" />
              {t("matches")}
            </Link>
          </li>
        </ul>
      </div>
    </h2>
  );
};

export default TodayMatchesTitle;
