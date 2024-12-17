import Container from "@/components/ui/Container";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("Main.title")}`,
    description: t("Main.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const lang = await getTranslations("Lang");
  return (
    <Container>
      <div className="flex items-center justify-between text-primary font-bold">
        {/* <div className="flex items-center gap-2">
          <Image
            src={"/ar.svg"}
            alt="arabic flag"
            width={100}
            height={100}
            className="w-8 rounded-full"
          />
          <span>المملكة العربية السعودية</span>
        </div> */}
        <div className="font-bold underline ms-auto mt-5">
          <ul>
            <li>
              <a href={`/${lang("href")}`}>{lang("name")}</a>
            </li>
          </ul>
        </div>
      </div>
      <div>{children}</div>
    </Container>
  );
};

export default layout;
