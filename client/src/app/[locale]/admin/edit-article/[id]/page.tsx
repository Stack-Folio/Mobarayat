import EditBlog from "@/components/admin/EditBlog";
import { getArticle } from "@/utils/fetchData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const token = cookies().get("token")?.value;
  if (!token) {
    return redirect("/");
  }

  const res = await getArticle({ id });
  return <EditBlog token={token} data={res} />;
};

export default page;
