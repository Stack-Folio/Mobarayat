"use client";
import { addFavorite } from "@/utils/fetchData";
import { HeartIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import FavErrorModal from "./FavErrorModal";
import { useTranslations } from "next-intl";

const DetailsTitle = ({
  text,
  date = "2020",
  Type,
  id,
}: {
  text: string;
  date?: number | string;
  Type: string;
  id: string;
}) => {
  const t = useTranslations("Details");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState({
    title: t("error"),
    text: "",
    state: false,
  });

  const handleClick = async () => {
    const nameCookies = Cookies.get("name");
    const token = Cookies.get("token");
    if (!token) {
      return setError((prev) => ({
        ...prev,
        text: t("plaseSignIn"),
        state: true,
      }));
    }
    const user = (nameCookies && JSON.parse(nameCookies)) || "";
    if (!user) {
      return setError((prev) => ({
        ...prev,
        text: t("plaseSignIn"),
        state: true,
      }));
    }
    if (Type === "match") {
      const data = {
        UserId: user.id,
        Type: "match",
        MatchId: id,
      };
      const add = await addFavorite(data, token);

      if (add.rs === 400) {
        return setError((prev) => ({
          ...prev,
          text: add.msg,
          state: true,
        }));
      }
      setModal(true);
    }
    if (Type === "league") {
      const data = {
        UserId: user.id,
        Type: "league",
        LeagueId: id,
      };

      const add = await addFavorite(data, token);

      if (add.rs === 400) {
        return setError((prev) => ({
          ...prev,
          text: add.msg,
        }));
      }
      setModal(true);
    }
  };

  return (
    <div className="mt-5 flex justify-between items-center">
      {modal && (
        <SuccessModal
          href={null}
          title={t("success")}
          text={t("successText")}
          btn={t("ok")}
          setModal={setModal}
        />
      )}
      {error.state && (
        <FavErrorModal
          title={error.title}
          text={error.text}
          btn={t("close")}
          setState={setError}
        />
      )}
      <h1 className="text-primary font-bold sm:text-xl text-sm me-3">{text}</h1>
      <div className="flex gap-3 items-center text-gray-500 font-bold md:text-lg text-sm">
        <HeartIcon
          className="w-7 max-sm:w-4 cursor-pointer"
          onClick={handleClick}
        />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default DetailsTitle;
