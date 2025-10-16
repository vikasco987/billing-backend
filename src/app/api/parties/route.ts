import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE a new party
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, dob } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const party = await prisma.party.create({
      data: { name, phone, address, dob: dob ? new Date(dob) : null },
    });

    return NextResponse.json(party, { status: 201 });
  } catch (err) {
    console.error("Error creating party:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET all parties
export async function GET() {
  try {
    const parties = await prisma.party.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(parties);
  } catch (err) {
    console.error("Error fetching parties:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
