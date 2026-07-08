import { withAuth } from "next-auth/middleware";
import createProxy from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createProxy(routing);

const authMiddleware = withAuth(
    function onSuccess(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    }
);

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname === "/admin") {
        const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        });

        if (token) {
            return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, req.url));
        } else {
            return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
        }
    }

    if (pathname === "/login" || pathname.endsWith("/login")) {
        return intlMiddleware(req);
    }

    const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
    if (isAdminRoute) {
        return (authMiddleware as any)(req);
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: [
        '/((?!api/(?!admin)|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};