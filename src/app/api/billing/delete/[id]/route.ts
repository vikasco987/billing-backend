// import { NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function DELETE(req: Request, { params }: any) {
//   try {
//     const { userId } = getAuth(req);

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const billId = params.id;

//     // Check bill exists
//     const bill = await prisma.bill.findUnique({
//       where: { id: billId },
//       include: {
//         products: true,
//         payments: true,
//         history: true,
//       },
//     });

//     if (!bill) {
//       return NextResponse.json({ error: "Bill not found" }, { status: 404 });
//     }

//     // 1️⃣ Delete bill history
//     await prisma.billHistory.deleteMany({
//       where: { billId },
//     });

//     // 2️⃣ Delete bill payments
//     await prisma.payment.deleteMany({
//       where: { billId },
//     });

//     // 3️⃣ Delete bill products
//     await prisma.billProduct.deleteMany({
//       where: { billId },
//     });

//     // 4️⃣ Delete bill now
//     await prisma.bill.delete({
//       where: { id: billId },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Bill deleted successfully",
//       deletedBillId: billId,
//     });
//   } catch (err) {
//     console.error("DELETE BILL ERROR →", err);
//     return NextResponse.json(
//       { error: "Server error", details: String(err) },
//       { status: 500 }
//     );
//   }
// }









// import { NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function DELETE(req: Request, { params }: any) {
//   try {
//     const { userId } = getAuth(req);

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const billId = params.id;

//     // 1️⃣ Get complete bill snapshot
//     const bill = await prisma.bill.findUnique({
//       where: { id: billId },
//       include: {
//         products: true,
//         payments: true,
//         customer: true,
//         user: true,
//         history: true,
//       },
//     });

//     if (!bill) {
//       return NextResponse.json({ error: "Bill not found" }, { status: 404 });
//     }

//     // 2️⃣ Save snapshot into DeleteHistory
//     await prisma.deleteHistory.create({
//       data: {
//         billId,
//         deletedBy: userId,
//         snapshot: bill,
//       },
//     });

//     // 3️⃣ Delete bill products
//     await prisma.billProduct.deleteMany({
//       where: { billId },
//     });

//     // 4️⃣ Delete bill payments
//     await prisma.payment.deleteMany({
//       where: { billId },
//     });

//     // 5️⃣ Delete bill history (IMPORTANT FIX)
//     await prisma.billHistory.deleteMany({
//       where: { billId },
//     });

//     // 6️⃣ Finally delete bill
//     await prisma.bill.delete({
//       where: { id: billId },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Bill deleted successfully (and saved in DeleteHistory)",
//     });

//   } catch (err) {
//     console.error("DELETE BILL ERROR →", err);
//     return NextResponse.json(
//       { error: "Server error", details: String(err) },
//       { status: 500 }
//     );
//   }
// }
















// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const { userId } = getAuth(req);

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const billId = params.id;

//     // 1️⃣ Get complete bill snapshot
//     const bill = await prisma.bill.findUnique({
//       where: { id: billId },
//       include: {
//         products: true,
//         payments: true,
//         customer: true,
//         user: true,
//         history: true,
//       },
//     });

//     if (!bill) {
//       return NextResponse.json({ error: "Bill not found" }, { status: 404 });
//     }

//     // 2️⃣ Save snapshot into DeleteHistory
//     await prisma.deleteHistory.create({
//       data: {
//         billId,
//         deletedBy: userId,
//         snapshot: bill,
//       },
//     });

//     // 3️⃣ Delete bill products
//     await prisma.billProduct.deleteMany({
//       where: { billId },
//     });

//     // 4️⃣ Delete bill payments
//     await prisma.payment.deleteMany({
//       where: { billId },
//     });

//     // 5️⃣ Delete bill history
//     await prisma.billHistory.deleteMany({
//       where: { billId },
//     });

//     // 6️⃣ Finally delete bill
//     await prisma.bill.delete({
//       where: { id: billId },
//     });

//     return NextResponse.json(
//       { message: "Bill deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Delete Error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong while deleting bill" },
//       { status: 500 }
//     );
//   }
// }














// import { NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function DELETE(
//   req: Request,
//   context: { params: { id: string } }
// ) {
//   try {
//     const { userId } = getAuth(req as any); // Cast fixes TS mismatch

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const billId = context.params.id;

//     // 1️⃣ Get complete bill snapshot
//     const bill = await prisma.bill.findUnique({
//       where: { id: billId },
//       include: {
//         products: true,
//         payments: true,
//         customer: true,
//         user: true,
//         history: true,
//       },
//     });

//     if (!bill) {
//       return NextResponse.json({ error: "Bill not found" }, { status: 404 });
//     }

//     // 2️⃣ Save snapshot into DeleteHistory
//     await prisma.deleteHistory.create({
//       data: {
//         billId,
//         deletedBy: userId,
//         snapshot: bill,
//       },
//     });

//     // 3️⃣ Delete bill products
//     await prisma.billProduct.deleteMany({
//       where: { billId },
//     });

//     // 4️⃣ Delete bill payments
//     await prisma.payment.deleteMany({
//       where: { billId },
//     });

//     // 5️⃣ Delete bill history
//     await prisma.billHistory.deleteMany({
//       where: { billId },
//     });

//     // 6️⃣ Delete bill itself
//     await prisma.bill.delete({
//       where: { id: billId },
//     });

//     return NextResponse.json({ message: "Bill deleted successfully" });
//   } catch (error) {
//     console.error("Delete Bill Error:", error);
//     return NextResponse.json(
//       { error: "Internal server error", details: String(error) },
//       { status: 500 }
//     );
//   }
// }














import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth(); // ✅ Correct clerk method for route handlers

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const billId = params.id;

    // 🔍 Fetch complete bill
    const bill = await prisma.bill.findUnique({
      where: { id: billId },
      include: {
        products: true,
        payments: true,
        customer: true,
        user: true,
        history: true,
      },
    });

    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    // 🧾 Save snapshot
    await prisma.deleteHistory.create({
      data: {
        billId,
        deletedBy: userId,
        snapshot: bill as any,
      },
    });

    // 🗑 Delete related data
    await prisma.billProduct.deleteMany({ where: { billId } });
    await prisma.payment.deleteMany({ where: { billId } });
    await prisma.billHistory.deleteMany({ where: { billId } });

    // 🗑 Delete bill
    await prisma.bill.delete({ where: { id: billId } });

    return NextResponse.json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
