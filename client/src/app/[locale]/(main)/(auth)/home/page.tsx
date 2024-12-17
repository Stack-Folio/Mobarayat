import AuthContainer from "@/components/auth/AuthContainer";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("Main.title")}`,
    description: t("Main.description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

const page = () => {
  const token = cookies().get("token")?.value;
  const nameCookie = cookies().get("name")?.value;
  const user = nameCookie ? JSON.parse(nameCookie) : null;

  if (!token) {
    return redirect("/login");
  }
  return (
    <AuthContainer>
      <div className="flex flex-col items-center w-full">
        <Image
          className="max-w-[400px]  w-full"
          src={"/auth.png"}
          alt="img"
          width={500}
          height={500}
        />
        <div className="text-center">
          <h1 className="font-bold">مرحباً, {user && user.firstName}</h1>
          <span className="text-gray-400">{user.email}</span>
          <div className="mt-10 flex flex-col gap-2">
            <Link href={"/"} className="underline text-gray-400">
              تغيير كلمة المرور
            </Link>
            <Link href={"/api/logout"} className="underline text-red-600">
              تسجيل الخروج
            </Link>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default page;
