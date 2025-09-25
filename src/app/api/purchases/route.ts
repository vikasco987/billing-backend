import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create Purchase Bill
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vendorId, items, paymentMode, invoiceNo, userId } = body;

    // 1. Calculate total
    const totalAmount = items.reduce((acc: number, item: any) => {
      return acc + item.quantity * item.costPrice;
    }, 0);

    // 2. Create purchase
    const purchase = await prisma.purchase.create({
      data: {
        vendorId,
        userId,
        totalAmount, // ✅ match schema
        // invoiceNo,   // ❌ your schema doesn’t have invoiceNo unless you add it
        // status: "PAID", // ❌ not in schema, remove or add to schema
        items: {
          create: items.map((item: any) => ({
            itemId: item.itemId,
            quantity: item.quantity,
            price: item.costPrice, // ✅ schema expects `price`
          })),
        },
      },
      include: { items: true, user: true },
    });

    // 3. Update stock in Item table
    for (const it of items) {
      await prisma.item.update({
        where: { id: it.itemId },
        data: {
          stock: { increment: it.quantity },
        },
      });
    }

    return NextResponse.json({ success: true, purchase });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create purchase" },
      { status: 500 }
    );
  }
}

// Get all purchases
export async function GET() {
  try {
    const purchases = await prisma.purchase.findMany({
      include: { user: true, items: { include: { item: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(purchases);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}
