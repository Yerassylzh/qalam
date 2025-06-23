import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  decryptToken,
  deleteSession,
} from "@/features/authentication/lib/users/session";

const protectedRoutes = ["/news"];
const authRoutes = ["/login", "/signup", "/admin/login", "admin/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    path === "/" || protectedRoutes.some((value) => path.match(value));
  const isAuthRoute = authRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const userPayload = cookie ? await decryptToken(cookie) : undefined;
  const isAuth = cookie ? userPayload !== undefined : false;

  // Session is expired but still inside of storage
  if (cookie && !isAuth) {
    await deleteSession();
  }

  if (isAuth) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if (userPayload?.user.isAdmin) {
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/admin/home", req.nextUrl));
      }
    } else {
      if (path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }
  } else {
    if (isProtectedRoute || path === "/admin") {
      return NextResponse.redirect(new URL("/signup", req.nextUrl));
    }
  }

  return NextResponse.next();
}
