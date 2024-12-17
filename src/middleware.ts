// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.svg|.*.png|.*.jpg|.*.webp|site.webmanifest).*)",
//   ],
// };

import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { checkToken } from "./utils/fetchData";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const response = intlMiddleware(req);
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/ar/admin") || pathname.startsWith("/en/admin")) {
    const token = req.cookies.get("token")?.value || "";

    const checked = await checkToken({ token });
    if (checked.rs === 400) {
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    } else {
      if (!checked.isAdmin) {
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
      } else {
        return response;
      }
    }
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.svg|.*.png|.*.jpg|.*.webp|site.webmanifest).*)",
  ],
};
