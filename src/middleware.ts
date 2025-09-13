// // middleware.ts
// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export default clerkMiddleware((auth, req) => {
//   const { userId } = auth();
//   const url = new URL(req.url);

//   console.log("Auth state (middleware):", userId);

//   // ✅ Allow auth pages without restriction
//   if (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up")) {
//     return NextResponse.next();
//   }

//   // ✅ Protect specific routes
//   const protectedRoutes = ["/dashboard", "/menu/upload", "/menu/view"];

//   if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
//     if (!userId) {
//       const signInUrl = new URL("/sign-in", req.url);
//       signInUrl.searchParams.set("redirect_url", req.url); // return after login
//       return NextResponse.redirect(signInUrl);
//     }
//   }

//   // ✅ Redirect root → dashboard (only if signed in)
//   if (url.pathname === "/") {
//     return userId
//       ? NextResponse.redirect(new URL("/dashboard", req.url))
//       : NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!_next|.*\\..*).*)", // all routes except static
//     "/(api|trpc)(.*)",        // api routes
//   ],
// };



// middleware.ts
import {  clerkMiddleware } from "@clerk/nextjs/server";

export default  clerkMiddleware ({
  // ✅ Public routes → no auth required
  publicRoutes: ["/", "/sign-in", "/sign-up"],

  // ✅ Ignored routes → skip Clerk entirely
  ignoredRoutes: ["/api/webhook"],

  // ✅ After sign-in, Clerk will automatically redirect to intended URL
});

export const config = {
  matcher: [
    // Protect everything except static files, images, etc.
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
