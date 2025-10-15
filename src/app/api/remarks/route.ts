// src/app/api/remarks/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const remarks = await prisma.paymentRemark.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        task: {
          select: { id: true, title: true, amount: true },
        },
      },
    });
    return NextResponse.json(remarks);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch remarks" }, { status: 500 });
  }
}
