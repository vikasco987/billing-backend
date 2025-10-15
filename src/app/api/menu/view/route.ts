// // API: /api/menu/view/route.ts
// import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function GET(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ Use Clerk ID directly (not Mongo _id)
//     const clerkId = user.id;

//     // 1️⃣ Ensure the user exists in our DB
//     const dbUser = await prisma.user.findUnique({
//       where: { clerkId },
//     });

//     if (!dbUser) {
//       return NextResponse.json(
//         { error: "User not found in DB" },
//         { status: 404 }
//       );
//     }

//     // 2️⃣ Fetch categories that have items belonging to this Clerk user
//     const categories = await prisma.category.findMany({
//       where: {
//         items: {
//           some: { userId: clerkId }, // ✅ filter by Clerk ID string
//         },
//       },
//       include: {
//         items: true, // include all items for each category
//       },
//     });

//     return NextResponse.json({ menus: categories });
//   } catch (err: any) {
//     console.error("API /menu/view error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }











// ✅ /api/menu/view/route.ts
import { NextResponse } from "next/server";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // 1️⃣ Try to get user via Clerk session (Next.js frontend)
    let user = await currentUser();

    // 2️⃣ If no user (e.g., mobile app), try to verify Bearer token manually
    if (!user) {
      const authHeader = req.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.replace("Bearer ", "").trim();
        try {
          const verified = await clerkClient.verifyToken(token);
          user = verified.user;
        } catch (e) {
          console.error("❌ Invalid token from mobile:", e);
        }
      }
    }

    // 3️⃣ Still no user → Unauthorized
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkId = user.id;

    // 4️⃣ Find matching user in your DB
    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }

    // 5️⃣ Fetch menu categories
    const categories = await prisma.category.findMany({
      where: {
        items: {
          some: { userId: clerkId },
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ menus: categories });
  } catch (err: any) {
    console.error("🔥 API /menu/view error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
