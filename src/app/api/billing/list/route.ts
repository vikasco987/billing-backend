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














// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     // 1️⃣ Get the logged-in Clerk user
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//     }

//     // 2️⃣ Find your app User by Clerk ID
//     const appUser = await prisma.user.findUnique({
//       where: { clerkId: clerkUser.id }, // ✅ correct mapping
//     });

//     if (!appUser) {
//       return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//     }

//     // 3️⃣ Fetch only bills created by this user
//     const bills = await prisma.bill.findMany({
//       where: {
//         userId: appUser.id, // ✅ use app User's Mongo ID
//       },
//       orderBy: { createdAt: "desc" },
//       take: 200, // fetch latest 200 bills
//       include: {
//         customer: true, // customer details
//         products: {
//           include: { product: true }, // product details
//         },
//         payments: true, // payment history
//       },
//     });

//     return new Response(JSON.stringify({ bills }), { status: 200 });
//   } catch (err) {
//     console.error("Failed to fetch bills:", err);
//     return new Response(JSON.stringify({ error: "Failed to fetch bills" }), { status: 500 });
//   }
// }















// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     // 1️⃣ Get currently logged-in Clerk user
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(
//         JSON.stringify({ error: "Unauthorized" }),
//         { status: 401 }
//       );
//     }

//     // 2️⃣ Match Clerk user to your internal User table
//     const appUser = await prisma.user.findUnique({
//       where: { clerkId: clerkUser.id },
//     });

//     if (!appUser) {
//       return new Response(
//         JSON.stringify({ error: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // 3️⃣ Get ONLY this user's bills (prevents showing another user’s data)
//     const bills = await prisma.bill.findMany({
//       where: {
//         userId: appUser.id, // internal Mongo/SQL ID, not Clerk ID
//       },
//       orderBy: { createdAt: "desc" },
//       include: {
//         customer: true,
//         products: {
//           include: { product: true },
//         },
//         payments: true,
//       },
//     });

//     return new Response(
//       JSON.stringify({ bills }),
//       {
//         status: 200,
//         headers: {
//           "Cache-Control": "no-store, no-cache, must-revalidate",
//         },
//       }
//     );

//   } catch (err) {
//     console.error("❌ Error fetching bills:", err);

//     return new Response(
//       JSON.stringify({ error: "Failed to fetch bills" }),
//       { status: 500 }
//     );
//   }
// }









// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     // 1️⃣ Get currently logged-in Clerk user
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(
//         JSON.stringify({ error: "Unauthorized" }),
//         { status: 401 }
//       );
//     }

//     // 2️⃣ Match Clerk user to your internal User table
//     const appUser = await prisma.user.findUnique({
//       where: { clerkId: clerkUser.id },
//     });

//     if (!appUser) {
//       return new Response(
//         JSON.stringify({ error: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // 3️⃣ Get ONLY this user's bills (prevents showing another user’s data)
//     const bills = await prisma.bill.findMany({
//       where: {
//         userId: appUser.id, // internal Mongo/SQL ID, not Clerk ID
//       },
//       orderBy: { createdAt: "desc" },
//       include: {
//         customer: true,
//         products: {
//           include: { product: true },
//         },
//         payments: true,
//       },
//     });

//     return new Response(
//       JSON.stringify({ bills }),
//       {
//         status: 200,
//         headers: {
//           "Cache-Control": "no-store, no-cache, must-revalidate",
//         },
//       }
//     );

//   } catch (err) {
//     console.error("❌ Error fetching bills:", err);

//     return new Response(
//       JSON.stringify({ error: "Failed to fetch bills" }),
//       { status: 500 }
//     );
//   }
// }



















// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     // 1️⃣ Get currently logged-in Clerk user
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(
//         JSON.stringify({ error: "Unauthorized" }),
//         { status: 401 }
//       );
//     }

//     // 2️⃣ Match Clerk user to your internal User table
//     const appUser = await prisma.user.findUnique({
//       where: { clerkId: clerkUser.id },
//     });

//     if (!appUser) {
//       return new Response(
//         JSON.stringify({ error: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // 3️⃣ Get ONLY this user's bills
//     const bills = await prisma.bill.findMany({
//       where: { userId: appUser.id },
//       orderBy: { createdAt: "desc" },
//       include: {
//         customer: true,
//         products: {
//           include: { product: true },
//         },
//         payments: true,
//       },
//     });

//     // 4️⃣ Fix null product references
//     const cleanedBills = bills.map(bill => ({
//       ...bill,
//       products: bill.products.map(p => ({
//         ...p,
//         product: p.product || { id: null, name: "Deleted product" }, // fallback
//       })),
//     }));

//     return new Response(
//       JSON.stringify({ bills: cleanedBills }),
//       {
//         status: 200,
//         headers: {
//           "Cache-Control": "no-store, no-cache, must-revalidate",
//         },
//       }
//     );

//   } catch (err) {
//     console.error("❌ Error fetching bills:", err);

//     return new Response(
//       JSON.stringify({ error: "Failed to fetch bills" }),
//       { status: 500 }
//     );
//   }
// }











// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     // 1️⃣ Get currently logged-in Clerk user
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(
//         JSON.stringify({ error: "Unauthorized" }),
//         { status: 401 }
//       );
//     }

//     // 2️⃣ Match Clerk user to your internal User table
//     const appUser = await prisma.user.findUnique({
//       where: { clerkId: clerkUser.id },
//     });

//     if (!appUser) {
//       return new Response(
//         JSON.stringify({ error: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // 3️⃣ Get ONLY this user's bills (prevents showing another user’s data)
//     const bills = await prisma.bill.findMany({
//       where: {
//         userId: appUser.id, // internal Mongo/SQL ID, not Clerk ID
//       },
//       orderBy: { createdAt: "desc" },
//       include: {
//         customer: true,
//         products: {
//           include: { product: true },
//         },
//         payments: true,
//       },
//     });

//     return new Response(
//       JSON.stringify({ bills }),
//       {
//         status: 200,
//         headers: {
//           "Cache-Control": "no-store, no-cache, must-revalidate",
//         },
//       }
//     );

//   } catch (err) {
//     console.error("❌ Error fetching bills:", err);

//     return new Response(
//       JSON.stringify({ error: "Failed to fetch bills" }),
//       { status: 500 }
//     );
//   }
// }










// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     // 1️⃣ Get currently logged-in Clerk user
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(
//         JSON.stringify({ error: "Unauthorized" }),
//         { status: 401 }
//       );
//     }

//     // 2️⃣ Fetch all bills created by this Clerk user
//     const bills = await prisma.bill.findMany({
//       where: { clerkUserId: clerkUser.id }, // use clerkUserId
//       orderBy: { createdAt: "desc" },
//       include: {
//         customer: true,
//         products: { include: { product: true } },
//         payments: true,
//       },
//     });

//     // 3️⃣ Fix null or deleted products
//     const cleanedBills = bills.map(bill => ({
//       ...bill,
//       products: bill.products.map(p => ({
//         ...p,
//         product: p.product || { id: null, name: "Deleted product" },
//       })),
//     }));

//     return new Response(
//       JSON.stringify({ bills: cleanedBills }),
//       {
//         status: 200,
//         headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
//       }
//     );

//   } catch (err) {
//     console.error("❌ Error fetching bills:", err);

//     return new Response(
//       JSON.stringify({ error: "Failed to fetch bills" }),
//       { status: 500 }
//     );
//   }
// }






// // src/app/api/billing/list/route.ts
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     // 1️⃣ Get currently logged-in Clerk user
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(
//         JSON.stringify({ error: "Unauthorized" }),
//         { status: 401 }
//       );
//     }

//     // 2️⃣ Fetch BOTH old and new bills
//     const bills = await prisma.bill.findMany({
//       where: {
//         OR: [
//           { clerkUserId: clerkUser.id },   // NEW bills
//           { userId: clerkUser.id },        // OLD bills stored with userId
//         ]
//       },
//       orderBy: { createdAt: "desc" },
//       include: {
//         customer: true,
//         products: { include: { product: true } },
//         payments: true,
//       },
//     });

//     // 3️⃣ Fix null or deleted products
//     const cleanedBills = bills.map(bill => ({
//       ...bill,
//       products: bill.products.map(p => ({
//         ...p,
//         product: p.product || { id: null, name: "Deleted product" },
//       })),
//     }));

//     return new Response(
//       JSON.stringify({ bills: cleanedBills }),
//       {
//         status: 200,
//         headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
//       }
//     );

//   } catch (err) {
//     console.error("❌ Error fetching bills:", err);

//     return new Response(
//       JSON.stringify({ error: "Failed to fetch bills" }),
//       { status: 500 }
//     );
//   }
// }














// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     // Fetch all bills
//     const bills = await prisma.bill.findMany({
//       where: { clerkUserId: clerkUser.id },
//       orderBy: { createdAt: "desc" },
//       include: {
//         customer: true,
//         products: {
//           include: { product: true }, // product may be null
//         },
//         payments: true,
//       },
//     });

//     // ❤️ FIX NULL / MISSING PRODUCTS
//     const cleanedBills = bills.map((bill) => ({
//       ...bill,
//       products: bill.products.map((bp) => ({
//         ...bp,
//         product: bp.product
//           ? bp.product
//           : {
//               id: null,
//               name: bp.productName || "Deleted Product",
//               price: bp.price || 0,
//             },
//       })),
//     }));

//     return new Response(JSON.stringify({ bills: cleanedBills }), {
//       status: 200,
//       headers: { "Cache-Control": "no-store" },
//     });
//   } catch (err) {
//     console.error("❌ Error fetching bills:", err);
//     return new Response(JSON.stringify({ error: "Failed to fetch bills" }), {
//       status: 500,
//     });
//   }
// }













// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     const clerkUser = await currentUser();
//     if (!clerkUser) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const bills = await prisma.bill.findMany({
//       where: {
//         OR: [
//           { clerkUserId: clerkUser.id },          // NEW correct bills
//           { user: { clerkId: clerkUser.id } },    // OLD bills (saved under user table)
//         ],
//       },
//       orderBy: { createdAt: "desc" },
//       include: {
//         customer: true,
//         products: {
//           include: { product: true },
//         },
//         payments: true,
//       },
//     });

//     const cleaned = bills.map((bill) => ({
//       ...bill,
//       products: bill.products.map((bp) => ({
//         ...bp,
//         product: bp.product || {
//           id: null,
//           name: bp.productName || "Deleted Product",
//           price: bp.price || 0,
//         },
//       })),
//     }));

//     return new Response(JSON.stringify({ bills: cleaned }), {
//       status: 200,
//       headers: { "Cache-Control": "no-store" },
//     });
//   } catch (err) {
//     console.error("❌ Error fetching bills:", err);
//     return new Response(JSON.stringify({ error: "Failed to fetch bills" }), {
//       status: 500,
//     });
//   }
// }















import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const bills = await prisma.bill.findMany({
      where: {
        OR: [
          { clerkUserId: clerkUser.id },        // NEW bills
          { user: { clerkId: clerkUser.id } },  // OLD bills
        ],
      },
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        products: {
          include: { product: true },
        },
        payments: true,
      },
    });

    // ✅ TEMP FIX (Solution B)
    const cleaned = bills.map((bill) => ({
      ...bill,
      products: bill.products.map((bp) => ({
        ...bp,

        // Fix null productName (Prisma error)
        productName: bp.productName ?? "Unknown Product",

        // Fix missing Product relation
        product:
          bp.product ||
          {
            id: null,
            name: bp.productName ?? "Unknown Product",
            price: bp.price || 0,
          },
      })),
    }));

    return new Response(JSON.stringify({ bills: cleaned }), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("❌ Error fetching bills:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch bills" }), {
      status: 500,
    });
  }
}
