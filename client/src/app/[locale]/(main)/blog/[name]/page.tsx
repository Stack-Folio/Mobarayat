import Blog from "@/components/Blog";
import BlogName from "@/components/ui/BlogName";
import Container from "@/components/ui/Container";
import GoBack from "@/components/ui/GoBack";
import { getArticle } from "@/utils/fetchData";

const page = async ({
  params,
}: {
  params: { name: string; locale: string };
}) => {
  const name = params.name;
  const lang = params.locale;
  const article = await getArticle({ id: name });

  const articleData = {
    name: lang === "ar" ? article.NameAr : article.Name,
    title: lang === "ar" ? article.TitleAr : article.Title,
    description: lang === "ar" ? article.DescriptionAr : article.Description,
    keywords: lang === "ar" ? article.KeywordsAr : article.Keywords,
    Body: lang === "ar" ? article.BodyAr : article.Body,
    ImageURL: article.ImageURL,
  };

  console.log(article);
  return (
    <Container>
      <div className="my-3">
        <div className="flex justify-center relative">
          <GoBack />
        </div>
        <div className="my-10">
          <BlogName text={articleData.name} />
          <Blog article={articleData} />
        </div>
      </div>
    </Container>
  );
};

export default page;
