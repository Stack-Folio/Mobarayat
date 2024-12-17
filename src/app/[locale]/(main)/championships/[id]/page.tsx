import ChampionshipMatchesComponent from "@/components/ChampionshipMatchesComponent";
import ChampionshipScorersTable from "@/components/ChampionshipScorersTable";
import ChampionshpGroupTable from "@/components/ChampionshpGroupTable";
import ChampionshipMenu from "@/components/ui/ChampionshipMenu";
import Container from "@/components/ui/Container";
import DetailsTitle from "@/components/ui/DetailsTitle";
import GoBack from "@/components/ui/GoBack";
import { getFixtures, getLeagueById, getTopscorers } from "@/utils/fetchData";
import { FixtureType } from "@/utils/Types";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const leauge = await getLeagueById({ lang: locale, leagueId: id });
  const leaugeName = leauge.data[0].leagueName;

  return {
    title: `${t("title")} - ${leaugeName}`,
    description: t("Championships.description"),
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
  const show = searchParams.show;
  const lang = params.locale;
  const leagueId = params.id;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const matches = await getFixtures({
    leagueId,
    date: formattedDate,
    lang,
    season: year,
  });

  const leauge = await getLeagueById({ lang, leagueId });
  const leaugeName = leauge.data[0].leagueName;

  const data = matches.data;

  const t = await getTranslations("Championships");

  return (
    <Container>
      <div className="my-3">
        <div className="flex justify-center relative">
          <GoBack />
          <ChampionshipMenu show={show} />
        </div>
        {show === "scorers" ? (
          <Scorers
            lang={lang}
            leagueId={leagueId}
            season={year}
            leagueName={leaugeName}
            title={t("titles.scorers")}
          />
        ) : show === "matches" ? (
          <Matches
            data={data}
            leagueName={leaugeName}
            leagueId={leagueId}
            title={t("titles.match")}
          />
        ) : (
          <Groups
            leagueName={leaugeName}
            title={t("titles.groups")}
            season={year}
            leagueId={leagueId}
            lang={lang}
          />
        )}
      </div>
    </Container>
  );
};

export const Groups = ({
  leagueName,
  title,
  season,
  leagueId,
  lang,
}: {
  leagueName: string;
  title: string;
  season: number;
  leagueId: string;
  lang: string;
}) => {
  return (
    <div>
      <DetailsTitle
        text={`${title} ${leagueName}`}
        date={season}
        Type={"league"}
        id={leagueId}
      />
      <ChampionshpGroupTable leagueId={leagueId} lang={lang} season={season} />
    </div>
  );
};
export const Scorers = async ({
  lang,
  leagueId,
  season,
  leagueName,
  title,
}: {
  lang: string;
  leagueId: string;
  season: number;
  leagueName: string;
  title: string;
}) => {
  const scorersData = await getTopscorers({
    lang: lang,
    leagueId: leagueId,
    season: season,
  });

  if (scorersData.status === "failed") {
    return (
      <DetailsTitle
        text={`${title} ${leagueName}`}
        date={season}
        Type={"league"}
        id={leagueId}
      />
    );
  }
  const result = scorersData.data;

  return (
    <div>
      <DetailsTitle
        text={`${title} ${leagueName}`}
        date={season}
        Type={"league"}
        id={leagueId}
      />
      <ChampionshipScorersTable result={result} />
    </div>
  );
};
export const Matches = ({
  data,
  leagueName,
  title,
  leagueId,
}: {
  data: FixtureType[];
  leagueName: string;
  title: string;
  leagueId: string;
}) => {
  const t = useTranslations("Championships");
  return (
    <div>
      <DetailsTitle
        text={`${title} ${leagueName}`}
        date={t("today")}
        Type={"league"}
        id={leagueId}
      />
      <ChampionshipMatchesComponent data={data} />
    </div>
  );
};
export default page;
