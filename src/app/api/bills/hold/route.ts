// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { userClerkId, customerId, items, total } = body;

//     // ✅ Validation
//     if (!userClerkId || !items?.length || total == null) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // ✅ Create a held bill and link to existing user via clerkId
//     const heldBill = await prisma.bill.create({
//       data: {
//         userClerkId,
//         customerId: customerId || null,
//         items,
//         total,
//         isHeld: true,
//         holdAt: new Date(),
//         user: {
//           connect: { clerkId: userClerkId }, // 👈 Fix relation issue
//         },
//       },
//     });

//     // ✅ Return all held bills for dashboard/list
//     const heldBills = await prisma.bill.findMany({
//       where: { isHeld: true },
//       orderBy: { holdAt: "desc" },
//     });

//     return NextResponse.json({ heldBill, heldBills }, { status: 200 });
//   } catch (err: any) {
//     console.error("Error holding bill:", err);
//     return NextResponse.json(
//       { message: "Failed to hold bill", error: err.message },
//       { status: 500 }
//     );
//   }
// }











import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userClerkId, customerId, items, total } = await req.json();

    if (!userClerkId || !items?.length || total == null) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Step 1: Find user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId: userClerkId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found for given Clerk ID" },
        { status: 404 }
      );
    }

    // ✅ Step 2: Create held bill and connect via userId
    const heldBill = await prisma.bill.create({
      data: {
        userId: user.id, // ✅ Relation with User
        customerId: customerId || null,
        total,
        isHeld: true,
        holdBy: userClerkId, // ✅ Optional: store who held it
        holdAt: new Date(),
        // ⚠️ For MongoDB JSON fields, store items directly
        // if you have items JSON array (not BillProduct relation)
        // If you use BillProduct relation, remove below line.
        // You can uncomment next line if you store inline items:
        // items,
      },
    });

    // ✅ Step 3: Fetch updated list of held bills
    const heldBills = await prisma.bill.findMany({
      where: { isHeld: true },
      orderBy: { holdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, clerkId: true } },
        customer: { select: { name: true, phone: true } },
      },
    });

    return NextResponse.json({ heldBill, heldBills }, { status: 200 });
  } catch (err: any) {
    console.error("Error holding bill:", err);
    return NextResponse.json(
      { message: "Failed to hold bill", error: err.message },
      { status: 500 }
    );
  }
}
