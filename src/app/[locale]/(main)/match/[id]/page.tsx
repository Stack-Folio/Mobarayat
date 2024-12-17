import MatchDetail from "@/components/MatchDetail";
import TeamPlan from "@/components/TeamPlan";
import Container from "@/components/ui/Container";
import DetailsTitle from "@/components/ui/DetailsTitle";
import GoBack from "@/components/ui/GoBack";
import MatchInformation from "@/components/ui/MatchInformation";
import MatchMenu from "@/components/ui/MatchMenu";
import PlanNotReady from "@/components/ui/PlanNotReady";
import { getFixtureDetailsById } from "@/utils/fetchData";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const result = await getFixtureDetailsById({ matchId: id, lang: locale });

  return {
    title: `${t("Match.title")} - ${result.data[0].teams.home.name} & ${
      result.data[0].teams.away.name
    }`,
    description: t("Match.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const page = async ({
  searchParams,
  params,
}: {
  searchParams: { show: string };
  params: { id: string; locale: string };
}) => {
  const matchId = params.id;
  const lang = params.locale;
  const show = searchParams.show;

  const result = await getFixtureDetailsById({ matchId, lang });

  return (
    <Container>
      <div className="my-3">
        <div className="flex justify-center relative">
          <GoBack />
          <MatchMenu />
        </div>
        <div>
          <DetailsTitle
            text={`${result.data[0].teams.home.name} & ${result.data[0].teams.away.name}`}
            date={result.data[0].fixture.fixtureDate}
            Type={"match"}
            id={matchId}
          />
          {show === "plan" ? (
            result.data[0].lineups.length > 0 ? (
              <TeamPlan data={result.data[0].lineups} />
            ) : (
              <PlanNotReady />
            )
          ) : show === "details" ? (
            <MatchInformation result={result.data[0].statistics} />
          ) : (
            <MatchDetail result={result.data[0]} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default page;
