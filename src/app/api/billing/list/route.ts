// src/app/billing/list/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bills = await prisma.bill.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { customer: true },
    });
    return new Response(JSON.stringify({ bills }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch bills" }), { status: 500 });
  }
}
