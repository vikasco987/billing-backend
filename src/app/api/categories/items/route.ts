// src/app/api/items/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET all items
export async function GET() {
  const items = await prisma.item.findMany({
    include: { category: true },
  });
  return NextResponse.json(items);
}

// POST create item
export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await prisma.item.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      tax: body.tax,
      discount: body.discount,
      stock: body.stock,
      variants: body.variants,
      categoryId: body.categoryId,
    },
  });
  return NextResponse.json(item);
}
