import Image from "next/image";
import Container from "./ui/Container";
import { HeartIcon, UserIcon } from "@heroicons/react/24/solid";
import HeaderMenu from "./HeaderMenu";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cookies } from "next/headers";

const Header = () => {
  const t = useTranslations("Header");
  const nameCookie = cookies().get("name")?.value;
  const name = nameCookie ? JSON.parse(nameCookie) : null;

  return (
    <div
      className="min-h-64 object-cover bg-cover bg-center relative z-10 before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:bg-opacity-50 before:-z-10"
      style={{ backgroundImage: 'url("/header.png")' }}
    >
      <Container>
        <div className="flex justify-between gap-10 flex-col md:flex-row py-10">
          <div className="flex items-center gap-3">
            <Link href={"/"}>
              <Image
                className="rounded-2xl max-md:w-[70px]"
                src={"/logo.png"}
                alt="logo"
                width={80}
                height={80}
              />
            </Link>
            <h2 className="text-white font-bold text-4xl max-md:text-2xl">
              {t("siteName")}
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex">
              <Link href={"/favorites"} className="">
                <HeartIcon className="w-10 text-white" />
              </Link>
              <Link href={"/home"} className="max-sm:hidden">
                <UserIcon className="w-10 text-white" />
              </Link>
            </div>
            <div>
              <h2 className="text-white font-bold text-2xl">
                {t("hiMessage")} {name ? name.firstName : t("guest")}
              </h2>
              <p className="text-white">{t("text")}</p>
            </div>
          </div>
        </div>
        <HeaderMenu />
      </Container>
    </div>
  );
};

export default Header;
