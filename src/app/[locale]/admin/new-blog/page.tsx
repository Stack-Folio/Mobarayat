import AddNewBlog from "@/components/admin/AddNewBlog";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    return redirect("/");
  }
  return <AddNewBlog token={token} />;
};

export default page;
