import Register from "@/components/auth/Register";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("Register.title")}`,
    description: t("Register.description"),
    other: {
      keywords: t("Register.keywords"),
    },
  };
}

const page = () => {
  return <Register />;
};

export default page;
