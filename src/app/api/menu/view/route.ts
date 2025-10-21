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

//     // ✅ Use Clerk ID directly (string)
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
//           some: { clerkId }, // ✅ FIXED: use clerkId instead of userId
//         },
//       },
//       include: {
//         items: {
//           select: {
//             id: true,
//             name: true,
//             description: true,
//             price: true,
//             sellingPrice: true,
//             mrp: true,
//             currentStock: true,
//             unit: true,
//             imageUrl: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json({ menus: categories });
//   } catch (err: any) {
//     console.error("API /menu/view error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkId = user.id;

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }

    const categories = await prisma.category.findMany({
      where: {
        items: {
          some: { clerkId }, // category must have at least 1 item for this Clerk
        },
      },
      include: {
        items: {
          where: { clerkId }, // ✅ only include items belonging to this Clerk
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            sellingPrice: true,
            mrp: true,
            currentStock: true,
            unit: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json({ menus: categories });
  } catch (err: any) {
    console.error("API /menu/view error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//;lkjhjkl
//;lokijuhyghuj
//;lkoijuy