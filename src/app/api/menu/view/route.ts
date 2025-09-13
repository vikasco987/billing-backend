// API: /api/menu/view/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Use Clerk ID directly (not Mongo _id)
    const clerkId = user.id;

    // 1️⃣ Ensure the user exists in our DB
    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in DB" },
        { status: 404 }
      );
    }

    // 2️⃣ Fetch categories that have items belonging to this Clerk user
    const categories = await prisma.category.findMany({
      where: {
        items: {
          some: { userId: clerkId }, // ✅ filter by Clerk ID string
        },
      },
      include: {
        items: true, // include all items for each category
      },
    });

    return NextResponse.json({ menus: categories });
  } catch (err: any) {
    console.error("API /menu/view error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
