import ChampionshipCard from "@/components/ChampionshipCard";
import DontHaveFavoriteComponent from "@/components/ui/DontHaveFavoriteComponent";
import ElementContainer from "@/components/ui/ElementContainer";
import FavoritesMenu from "@/components/ui/FavoritesMenu";
import FavoritMatchCard from "@/components/ui/FavoritMatchCard";
import { getFavorite, getLeagues } from "@/utils/fetchData";
import { FavoriteTypes, GetFavoriteTypes, LeagueType } from "@/utils/Types";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("Favorite.title")}`,
    description: t("Favorite.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const page = async ({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { show: string };
}) => {
  const show = searchParams.show || "match";
  const lang = params.locale;
  const token = cookies().get("token")?.value;
  if (!token) {
    return (
      <ElementContainer>
        <div>
          <FavoritesMenu show={show} />
          {<DontHaveFavoriteComponent />}
        </div>
      </ElementContainer>
    );
  }
  const nameCookie = cookies().get("name")?.value;
  const user = nameCookie ? JSON.parse(nameCookie) : null;

  const res = await getFavorite({ UserId: user.id, Type: show, token });

  if (res.rs === 400) {
    return redirect("/admin");
  }

  return (
    <ElementContainer>
      <div className="">
        <FavoritesMenu show={show} />
        {user === null || !res || res.length === 0 ? (
          <DontHaveFavoriteComponent />
        ) : show === "match" && res.length !== 0 ? (
          <MatchComp result={res} lang={lang} />
        ) : show === "league" && res.length !== 0 ? (
          <LeagueComp result={res} lang={lang} />
        ) : (
          ""
        )}
      </div>
    </ElementContainer>
  );
};

export default page;

const MatchComp = ({
  result,
  lang,
}: {
  result: GetFavoriteTypes[];
  lang: string;
}) => {
  return (
    <div className="space-y-2 w-full mt-12">
      {result.map((el, idx) => (
        <FavoritMatchCard key={idx} id={el.MatchId} lang={lang} />
      ))}
    </div>
  );
};
const LeagueComp = async ({
  result,
  lang,
}: {
  result: FavoriteTypes[];
  lang: string;
}) => {
  const allLeagues = await getLeagues({ lang, page: "1", limit: "1200" });

  const leagueIds = result
    .map((el) => el.LeagueId)
    .filter((id): id is string => typeof id === "string");

  const filteredLeagues = allLeagues.data.filter((el: LeagueType) =>
    leagueIds.includes(String(el.leagueId))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 mt-12">
      {filteredLeagues.map((el: LeagueType, idx: number) => (
        <ChampionshipCard
          key={idx}
          data={{
            leagueId: el.leagueId,
            leagueName: el.leagueName,
            leagueType: el.leagueType,
            leagueLogo: el.leagueLogo,
            leagueCountryFlag: el.leagueCountryFlag,
          }}
        />
      ))}
    </div>
  );
};
