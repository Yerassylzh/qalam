import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  decryptToken,
  deleteSession,
} from "@/features/authentication/lib/users/session";

const homeRoutes = ["/articles"];
const adminRoutes = ["/admin/home"]
const authRoutes = ["/login", "/signup", "/admin/login", "admin/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isHomeRoute = homeRoutes.some((value) => path.startsWith(value));
  const isAdminRoute = adminRoutes.some((value) => path.startsWith(value));
  const isAuthRoute = authRoutes.includes(path);
  // file and images
  const isOtherRoute = ![isHomeRoute, isAdminRoute, isAuthRoute].includes(true)

  const cookie = (await cookies()).get("session")?.value;
  const userPayload = cookie ? await decryptToken(cookie) : undefined;
  const isAuth = cookie ? userPayload !== undefined : false;

  // Session is expired but still inside of storage
  if (cookie && !isAuth) {
    await deleteSession();
  }

  if (isOtherRoute) {
    return NextResponse.next();
  }

  if (isAuth) {
    if (userPayload?.user.isAdmin) {
      if (isAdminRoute) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/admin/home", req.nextUrl));
      }
    } else {
      if (isHomeRoute) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/articles", req.nextUrl));
      }
    }
  } else {
    if (!isAdminRoute && !isHomeRoute) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/signup", req.nextUrl));
    }
  }

  return NextResponse.next();
}
