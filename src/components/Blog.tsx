import { ArticleData } from "@/utils/Types";
import Image from "next/image";
import { decode as decodeData } from "js-base64";

const Blog = ({ article }: { article: ArticleData }) => {
  const decodedBody = decodeData(article.Body);

  console.log(decodedBody);

  return (
    <div className="mt-10">
      <Image
        className="w-full max-h-[300px] h-auto object-cover rounded-xl"
        src={article.ImageURL}
        alt="img"
        width={800}
        height={400}
      />
      <div
        className="my-5 mt-10"
        dangerouslySetInnerHTML={{ __html: decodedBody }}
      ></div>
    </div>
  );
};

export default Blog;
