import { useTranslations } from "next-intl";

const SearchResultTitle = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const t = useTranslations("Filters");
  return (
    <h1 className="text-center text-primary font-bold text-xl mt-5">
      {t("searchResult")} - {children}
    </h1>
  );
};

export default SearchResultTitle;
