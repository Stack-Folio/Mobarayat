import { useTranslations } from "next-intl";

const MatchNotReady = () => {
  const t = useTranslations("NotReady");
  return (
    <div className="my-20 flex justify-center text-primary opacity-60">
      <span className="text-center font-bold">{t("matchNotReady")}</span>
    </div>
  );
};

export default MatchNotReady;