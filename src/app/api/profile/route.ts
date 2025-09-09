import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const profile = await prisma.form.create({
      data: {
        title: "Business Profile",
        fields: [
          {
            label: "Business Type",
            type: "SELECT",
            value: body.businessType,
          },
          {
            label: "Business Name",
            type: "INPUT",
            value: body.businessName,
          },
          {
            label: "Tagline",
            type: "INPUT",
            value: body.businessTagline,
          },
          {
            label: "Contact Person Name",
            type: "INPUT",
            value: body.contactName,
          },
          {
            label: "Phone",
            type: "INPUT",
            value: body.contactPhone,
          },
          {
            label: "Email",
            type: "INPUT",
            value: body.contactEmail,
          },
          {
            label: "UPI",
            type: "INPUT",
            value: body.upi,
          },
          {
            label: "Google Review Link",
            type: "INPUT",
            value: body.reviewLink,
          },
          {
            label: "Custom Field",
            type: "INPUT",
            value: body.customField,
          },
          {
            label: "Signature",
            type: "FILE",
            fileUrl: body.signature,
          },
          {
            label: "Logo",
            type: "FILE",
            fileUrl: body.logo,
          },
        ],
      },
      include: { fields: true },
    });

    return NextResponse.json(profile);
  } catch (err: any) {
    console.error("Profile save error:", err);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
