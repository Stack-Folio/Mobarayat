import BlogCard from "@/components/ui/BlogCard";
import Container from "@/components/ui/Container";
import { getArticles } from "@/utils/fetchData";
import { ArticleType } from "@/utils/Types";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("Blog.title")}`,
    description: t("Blog.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const page = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params;
  const articles = await getArticles();

  return (
    <div className="my-16">
      <Container>
        <div className="my-10 space-y-8">
          {articles.map((el: ArticleType, idx: number) => (
            <BlogCard key={idx} data={el} lang={locale} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
