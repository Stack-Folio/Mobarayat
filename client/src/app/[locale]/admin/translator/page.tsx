import UpdateText from "@/components/admin/UpdateText";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    return redirect("/login");
  }

  return <UpdateText token={token} />;
};

export default Page;
