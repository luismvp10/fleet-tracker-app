import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const user: string | undefined  = req.cookies.get("fleet-user")?.value;

    // If the user is NOT logged in and tries to access a protected route, redirect to /login
    if (!user && ["/tracking", "/dashboard"].includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // If the user IS logged in and tries to access /login, redirect to /dashboard
    if (user && ["/login"].includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

//Apply middleware only to protected routes and /login
export const config = {
    matcher: [ "/tracking", "/dashboard", "/login" ],
};
