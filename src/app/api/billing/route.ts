import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      customerId,
      companyName,
      companyAddress,
      companyPhone,
      contactPerson,
      logoUrl,
      signatureUrl,
      websiteUrl,
      products, // [{ productId, quantity, price, discount, gst, total }]
      total,
      discount,
      gst,
      grandTotal,
      paymentMode,
      paymentStatus,
      notes,
      dueDate,
    } = body;

    // ✅ Validate required fields
    if (!userId || !products?.length) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // ✅ Create Bill with nested products
    const bill = await prisma.bill.create({
      data: {
        userId,
        customerId,
        total,
        discount,
        gst,
        grandTotal,
        paymentMode,
        paymentStatus,
        notes,
        dueDate: dueDate ? new Date(dueDate) : null,
        companyName,
        companyAddress,
        companyPhone,
        contactPerson,
        logoUrl,
        signatureUrl,
        websiteUrl,
        products: {
          create: products.map((p: any) => ({
            productId: p.productId,
            quantity: p.quantity,
            price: p.price,
            discount: p.discount,
            gst: p.gst,
            total: p.total,
          })),
        },
        history: {
          create: {
            snapshot: {
              companyName,
              companyAddress,
              companyPhone,
              contactPerson,
              logoUrl,
              signatureUrl,
              websiteUrl,
              products,
              total,
              discount,
              gst,
              grandTotal,
              paymentMode,
              paymentStatus,
              notes,
              dueDate,
            },
          },
        },
      },
      include: {
        products: { include: { product: true } },
        customer: true,
        payments: true,
        history: true,
      },
    });

    return NextResponse.json(bill);
  } catch (error: any) {
    console.error("Error creating bill:", error);
    return NextResponse.json(
      { message: "Failed to create bill", error: error.message },
      { status: 500 }
    );
  }
}
