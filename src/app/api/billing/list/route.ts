// // src/app/billing/list/route.ts
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const bills = await prisma.bill.findMany({
//       orderBy: { createdAt: "desc" },
//       take: 50,
//       include: { customer: true },
//     });
//     return new Response(JSON.stringify({ bills }), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to fetch bills" }), { status: 500 });
//   }
// }














// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const bills = await prisma.bill.findMany({
//       orderBy: { createdAt: "desc" },
//       take: 200, // more bills if needed
//       include: {
//         customer: true,
//         products: {
//           include: {
//             product: true, // gives product name, etc.
//           },
//         },
//         payments: true,
//       },
//     });

//     return new Response(JSON.stringify({ bills }), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to fetch bills" }), {
//       status: 500,
//     });
//   }
// }














// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     const user = await currentUser();
//     if (!user) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const bills = await prisma.bill.findMany({
//       where: {
//         clerkUserId: user.id,  // ⬅ FIXED: only show bills created by logged in user
//       },
//       orderBy: { createdAt: "desc" },
//       take: 200,
//       include: {
//         customer: true,
//         products: {
//           include: {
//             product: true,
//           },
//         },
//         payments: true,
//       },
//     });

//     return new Response(JSON.stringify({ bills }), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to fetch bills" }), {
//       status: 500,
//     });
//   }
// }














// src/app/api/billing/list/route.ts
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // 1️⃣ Get the logged-in Clerk user
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // 2️⃣ Find your app User by Clerk ID
    const appUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id }, // ✅ correct mapping
    });

    if (!appUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // 3️⃣ Fetch only bills created by this user
    const bills = await prisma.bill.findMany({
      where: {
        userId: appUser.id, // ✅ use app User's Mongo ID
      },
      orderBy: { createdAt: "desc" },
      take: 200, // fetch latest 200 bills
      include: {
        customer: true, // customer details
        products: {
          include: { product: true }, // product details
        },
        payments: true, // payment history
      },
    });

    return new Response(JSON.stringify({ bills }), { status: 200 });
  } catch (err) {
    console.error("Failed to fetch bills:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch bills" }), { status: 500 });
  }
}
