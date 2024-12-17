import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const siteName = useTranslations("Header");
  const t = useTranslations("Footer");
  return (
    <div className="bg-dark text-white p-4 text-center max-sm:pb-24">
      <div className="flex gap-3 items-center justify-center font-bold">
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <h2>{siteName("siteName")}</h2>
      </div>
      <p className="my-5 max-w-[820px] mx-auto max-md:text-sm">
        {" "}
        {t("description")}
      </p>
      <ul className="flex gap-3 justify-center mb-5 max-md:text-sm">
        <li>
          <Link href="/terms-of-use" className="underline">
            {t("menu.one")}
          </Link>
        </li>
        <li>
          <Link href="/policy" className="underline">
            {t("menu.two")}
          </Link>
        </li>
        <li>
          <Link href="/blog" className="underline">
            {t("menu.three")}
          </Link>
        </li>
      </ul>
      <div className="my-5 md:flex justify-center gap-10 items-center">
        <p>
          {t("contact")} <span>support@mobarayatalyoum.com</span>
        </p>
        <span>|</span>
        <form>
          <label htmlFor="mail">{t("mailUs")}</label>
          <input
            className="outline-none bg-transparent border-b px-2 p-1"
            type="email"
            id="mail"
            placeholder={t("placeholder")}
          />
          <button type="submit" className="ms-3">
            {t("send")}
          </button>
        </form>
      </div>
      <h6 className="border-t pt-3 max-md:text-sm flex justify-center">
        <span className="flex-1">
          {t("copyright")} © {new Date().getFullYear()}
        </span>
      </h6>
    </div>
  );
};

export default Footer;
