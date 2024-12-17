import { useTranslations } from "next-intl";

const NoMatchToday = () => {
  const t = useTranslations("NotReady");
  return (
    <div className="mx-auto text-center mt-16 text-xl font-bold text-secondary">
      <h3>{t("notMatchToday")}</h3>
    </div>
  );
};

export default NoMatchToday;
