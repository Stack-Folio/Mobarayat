import AdminBlogCard from "@/components/admin/AdminBlogCard";
import AdminPageTitle from "@/components/admin/AdminPageTitle";
import { getArticles } from "@/utils/fetchData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    return redirect("/login");
  }
  const res = await getArticles();

  return (
    <div>
      <AdminPageTitle>جميع المقالات</AdminPageTitle>
      <div className="my-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
        {res.map(
          (
            el: { NameAr: string; ImageURL: string; _id: string },
            idx: number
          ) => (
            <AdminBlogCard
              key={idx}
              name={el.NameAr}
              num={idx}
              img={el.ImageURL}
              id={el._id}
              token={token}
            />
          )
        )}
      </div>
    </div>
  );
};

export default page;
