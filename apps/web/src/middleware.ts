import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./libs/server";
import { decodeToken } from "./libs/fetch/decode";

const tenantGuard = [
  "/dashboard",
  "/dashboard/create-property",
  "/dashboard/notifikasi",
  "/dashboard/profile",
  "/dashboard/review",
  "/dashboard/transaction",
];
const userGuard = [
  "/profile",
  "/profile/myorder",
  "/profile/purchase",
  "/profile/review",
  "/profile/reservation",
];
const authGuard = [
  "/reservasi",
  "/profile",
  "/profile/myorder",
  "/profile/purchase",
  "/profile/review",
  "/dashboard",
  "/dashboard/create-property",
  "/dashboard/notifikasi",
  "/dashboard/profile",
  "/dashboard/review",
  "/dashboard/transaction",
  "/account/form-data-user",
  "/account/form-data-tenant",
];

const dynamicReservationPattern = /^\/reservation\/.+/;
const dynamicCreatePropertyPattern = /^\/dashboard\/.+/;
export async function middleware(request: NextRequest) {
  const token = await getCookie("token");
  const url = request.nextUrl.pathname;

  if (authGuard.includes(url)) {
    if (!token) {
      return NextResponse.redirect(new URL("/account/register", request.url));
    }
  }
  if (dynamicReservationPattern.test(url)) {
    if (!token) {
      return NextResponse.redirect(new URL("/account/register", request.url));
    }
    const data = await decodeToken(token?.value!);
    if (data.data.user.role == "tenant") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  if (dynamicCreatePropertyPattern.test(url)) {
    if (!token) {
      return NextResponse.redirect(new URL("/account/register", request.url));
    }
    const data = await decodeToken(token?.value!);
    if (data.data.user.role !== "tenant") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (tenantGuard.includes(url)) {
    const data = await decodeToken(token?.value!);
    if (data.data.user.role !== "tenant") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (userGuard.includes(url)) {
    const data = await decodeToken(token?.value!);
    if (data.data.user.role !== "user") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}
