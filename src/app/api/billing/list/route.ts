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














// src/app/api/billing/list/route.ts
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const bills = await prisma.bill.findMany({
      where: {
        clerkUserId: user.id,  // ⬅ FIXED: only show bills created by logged in user
      },
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        customer: true,
        products: {
          include: {
            product: true,
          },
        },
        payments: true,
      },
    });

    return new Response(JSON.stringify({ bills }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch bills" }), {
      status: 500,
    });
  }
}
