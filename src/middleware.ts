// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const middleware = clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const url = new URL(req.url);

  // ⬇️ Allow sign-in and sign-up without redirect
  if (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up")) {
    return NextResponse.next();
  }

  // ✅ If not signed in → redirect to /sign-in
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url); // after login, go back
    return NextResponse.redirect(signInUrl);
  }

  // ✅ Redirect "/" → "/dashboard"
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export default middleware;

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // All pages except static files
    "/(api|trpc)(.*)",        // API routes
  ],
};
