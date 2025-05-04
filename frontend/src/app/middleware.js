import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.headers.get("authorization"); // Expecting token in the Authorization header
  console.log("Middleware running");

  // Check if the request path is inside the /dashboard section
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  // Allow the request to continue if token is present
  return NextResponse.next();
}
