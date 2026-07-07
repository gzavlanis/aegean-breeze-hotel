import { withAuth } from "next-auth/middleware";
import createProxy from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

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
            signIn: "/admin/login",
        },
    }
);

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
    if (isAdminRoute) {
        return (authMiddleware as any)(req);
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};