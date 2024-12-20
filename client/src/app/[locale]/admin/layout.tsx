import AdminContainer from "@/components/admin/AdminContainer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";

const inter = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"ar"} dir="rtl">
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        <AdminSidebar />
        <AdminContainer>
          <main className="flex-1 ms-[55px]">{children}</main>
        </AdminContainer>
      </body>
    </html>
  );
}
