// src/app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// GET all categories
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { children: true },
  });
  return NextResponse.json(categories);
}

// POST create category
export async function POST(req: NextRequest) {
  const body = await req.json();
  const category = await prisma.category.create({
    data: {
      name: body.name,
      parentId: body.parentId || null,
    },
  });
  return NextResponse.json(category);
}
