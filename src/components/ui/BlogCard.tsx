import { ArticleType } from "@/utils/Types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ data, lang }: { data: ArticleType; lang: string }) => {
  const t = useTranslations("Blog");

  const date = new Date(data.createdAt ?? new Date());

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="md:flex gap-4">
      <Image
        src={data.ImageURL}
        alt="blog"
        width={300}
        height={300}
        className="w-full rounded-xl md:max-w-[380px]"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-primary text-xl mb-4 font-bold my-2">
            {lang === "ar" ? data.NameAr : data.Name}
          </h1>
          <span className="font-medium text-lg text-gray-400">
            {formattedDate}
          </span>
        </div>
        <p className="mb-10">
          {lang === "ar" ? data.DescriptionAr : data.Description}
        </p>
        <Link
          href={`/blog/${data._id}`}
          className="border border-primary p-1 px-6 mt-10 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
        >
          {t("more")}
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
