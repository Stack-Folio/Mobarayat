"use client";
import { ArrowTurnUpRightIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const GoBack = () => {
  const t = useTranslations("GoBack");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div
      onClick={handleGoBack}
      className="flex gap-2 text-primary font-bold absolute start-0 max-sm:-top-12 cursor-pointer max-sm:text-xs me-10"
    >
      <ArrowTurnUpRightIcon className="w-6 max-sm:w-4" />
      <span>{t("back")}</span>
    </div>
  );
};

export default GoBack;
