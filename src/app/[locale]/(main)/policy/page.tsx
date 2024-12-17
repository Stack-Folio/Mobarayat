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
    title: `${t("Policy.title")}`,
    description: t("Policy.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const Page = () => {
  const t = useTranslations("Policy");
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
  ];
  return (
    <Container>
      <div className="flex items-center gap-3 flex-col md:flex-row">
        <Image src={"/auth.png"} alt="log" width={320} height={320} />
        <div>
          <h1 className="font-bold text-lg mb-5">{t(`policy`)}</h1>
          <p>{t(`description`)} </p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">{t(`aboutSite`)}</h2>
        <p className="mt-3">{t(`aboutText`)} </p>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">{t(`first`)} </h2>
        <p className="mt-3">{t(`firstText`)}</p>
      </div>
      <div className="mt-5">
        {keys.map((key, idx) => (
          <li key={idx} className="mt-3">
            {t(`firstSteps.${key}`)}
          </li>
        ))}
      </div>
      <div className="mt-5">
        <h2 className="font-bold">{t(`second`)} </h2>
        <p className="mt-3">{t(`secondText`)}</p>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">{t(`third`)} </h2>
        {t("thirdText")
          .split("\n")
          .map((line, index) => (
            <p key={index} className="mt-3">
              {line}
            </p>
          ))}
      </div>
    </Container>
  );
};

export default Page;
