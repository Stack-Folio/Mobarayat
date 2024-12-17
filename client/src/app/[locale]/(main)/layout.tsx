import { Cairo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const inter = Cairo({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    other: {
      keywords: t("keywords"),
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1 my-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
