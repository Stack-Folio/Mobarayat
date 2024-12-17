import Container from "@/components/ui/Container";
import ElementContainer from "@/components/ui/ElementContainer";
import LeagueCardTable from "@/components/ui/LeagueCardTable";
import { getBestDates } from "@/utils/fetchData";
import { LeagueType } from "@/utils/Types";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("Dates.title"),
    description: t("Dates.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const page = async ({ params }: { params: { locale: string } }) => {
  const lang = params.locale;
  const translations = await import(`../../../../../messages/${lang}.json`);

  const season = new Date().getFullYear();
  const res = await getBestDates({ lang, season });

  const data = res.data;

  return (
    <Container>
      <ElementContainer>
        <div>
          <h1 className="my-5 mt-20 text-center font-bold text-primary  max-w-xl mx-auto">
            {translations.Dates.title}
          </h1>
          <div className="flex justify-around font-bold items-center  border-y py-3 text-gray-500">
            <span>{translations.Dates.event}</span>
            <span>{translations.Dates.when}</span>
          </div>
          <hr />
          <table className="space-y-2 w-full">
            <tbody>
              <tr>
                <td className="text-start py-2 pb-5  text-gray-500 text-sm font-bold">
                  {translations.Dates.end}
                </td>
              </tr>
            </tbody>

            {data.length > 0 &&
              data.map(
                (el: LeagueType, idx: number) =>
                  el.current && (
                    <LeagueCardTable
                      key={idx}
                      data={el}
                      text={`${translations.Dates.endLeague} ${season}`}
                    />
                  )
              )}

            <tbody>
              <tr>
                <td className="text-start py-2 pb-5  text-gray-500 text-sm font-bold">
                  {translations.Dates.start}
                </td>
              </tr>
            </tbody>

            {data.length > 0 &&
              data.map(
                (el: LeagueType, idx: number) =>
                  !el.current && (
                    <LeagueCardTable
                      key={idx}
                      data={el}
                      text={`${translations.Dates.startLeague} ${season}`}
                    />
                  )
              )}
          </table>
        </div>
      </ElementContainer>
    </Container>
  );
};

export default page;
