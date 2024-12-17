import Login from "@/components/auth/Login";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("Login.title")}`,
    description: t("Login.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const page = () => {
  return <Login />;
};

export default page;
