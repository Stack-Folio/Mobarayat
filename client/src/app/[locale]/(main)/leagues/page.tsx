// export async function generateMetadata({
//     params: { locale },
//   }: {
//     params: { locale: string };
//   }) {
//     const t = await getTranslations({ locale, namespace: "Metadata" });
//     return {
//       title: t("Championships.title"),
//       description: t("Championships.description"),
//       other: {
//         keywords: t("keywords"),
//       },
//     };
//   }

import ChampionshipCard from "@/components/ChampionshipCard";
import PagesPagination from "@/components/PagesPagination";
import Container from "@/components/ui/Container";
import ElementContainer from "@/components/ui/ElementContainer";
import { ChampionshipsSearchbar } from "@/components/ui/Searchbar";
import SearchResultTitle from "@/components/ui/SearchResultTitle";
import { getLeagues } from "@/utils/fetchData";
import { LeagueType } from "@/utils/Types";

const page = async ({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { search: string; page: string; limit: string };
}) => {
  const search = searchParams.search || "";
  const { page = "1", limit = "15" } = searchParams;
  const lang = params.locale;

  const allLeagues = await getLeagues({ lang, page, limit, type: "league" });
  const fullLeagues = await getLeagues({
    lang,
    page,
    limit: "1200",
    type: "league",
  });
  const data = allLeagues.data;
  const pagination = allLeagues.pagination;

  if (search !== "") {
    const data = fullLeagues.data.filter((el: LeagueType) =>
      el.leagueName.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <Container>
        <ElementContainer>
          <SearchResultTitle>{search}</SearchResultTitle>
        </ElementContainer>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 my-10">
          {data.map((el: LeagueType, idx: number) => (
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
      </Container>
    );
  }

  return (
    <Container>
      <ElementContainer>
        <ChampionshipsSearchbar search={search} allLeagues={fullLeagues.data} />
      </ElementContainer>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 my-10">
        {data.map((el: LeagueType, idx: number) => (
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
      <PagesPagination
        lang={lang}
        pagination={pagination}
        current={{ page, limit }}
      />
    </Container>
  );
};

export default page;
