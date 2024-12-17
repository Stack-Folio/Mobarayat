import { cookies } from "next/headers";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

const DontHaveFavoriteComponent = () => {
  const token = cookies().get("token")?.value;

  const t = useTranslations("Favorites");
  return (
    <div className="flex justify-center items-center flex-col my-20">
      <div className="relative flex justify-center min-h-[100px]">
        <HeartIcon className="w-40 absolute text-secondary opacity-50" />
        <HeartIcon className="w-40 absolute ms-16 text-secondary " />
      </div>
      {token ? (
        <p className="mt-20 text-secondary font-bold">
          {t("youDidNotAddAnythingYet")}
        </p>
      ) : (
        <p className="mt-20 text-secondary font-bold">
          {t("createAccountToAdd")}{" "}
        </p>
      )}
    </div>
  );
};

export default DontHaveFavoriteComponent;
