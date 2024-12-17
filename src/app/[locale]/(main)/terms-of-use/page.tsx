import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("TermsOfUse.title")}`,
    description: t("TermsOfUse.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const Page = () => {
  const t = useTranslations("TermsOfUse");
  const keys = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  return (
    <Container>
      <div className="flex items-center gap-3 flex-col md:flex-row">
        <Image src={"/auth.png"} alt="log" width={320} height={320} />
        <div>
          <h1 className="font-bold text-lg mb-5">{t(`termsOfUse`)}</h1>
          <p>{t(`description`)} </p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">{t(`howWeGetYourInfo`)}</h2>
        <p className="mt-3">{t(`infoDescription`)} </p>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">{t(`infoWeGet`)} </h2>
        <li className="mt-3">{t(`theInfo`)}</li>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">{t(`securitySteps`)}</h2>
        <p className="mt-3">{t(`securityDescription`)}</p>
        {keys.map((key, idx) => (
          <li key={idx} className="mt-3">
            {t(`steps.${key}`)}
          </li>
        ))}
      </div>
    </Container>
  );
};

export default Page;
