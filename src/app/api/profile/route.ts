// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // ✅ Create new profile
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const profile = await prisma.form.create({
//       data: {
//         title: "Business Profile",
//         fields: {
//           create: [
//             { label: "Business Type", type: "SELECT", value: body.businessType },
//             { label: "Business Name", type: "INPUT", value: body.businessName },
//             { label: "Tagline", type: "INPUT", value: body.businessTagline },
//             { label: "Contact Person Name", type: "INPUT", value: body.contactName },
//             { label: "Phone", type: "INPUT", value: body.contactPhone },
//             { label: "Email", type: "INPUT", value: body.contactEmail },
//             { label: "UPI", type: "INPUT", value: body.upi },
//             { label: "Google Review Link", type: "INPUT", value: body.reviewLink },
//             { label: "Custom Field", type: "INPUT", value: body.customField },
//             { label: "Signature", type: "FILE", fileUrl: body.signature },
//             { label: "Logo", type: "FILE", fileUrl: body.logo },
//           ],
//         },
//       },
//       include: { fields: true },
//     });

//     return NextResponse.json(profile, { status: 201 });
//   } catch (err: any) {
//     console.error("Profile save error:", err);
//     return NextResponse.json(
//       { error: "Failed to save profile", details: err.message },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Fetch latest profile
// export async function GET() {
//   try {
//     const profile = await prisma.form.findFirst({
//       orderBy: { createdAt: "desc" },
//       include: { fields: true },
//     });

//     if (!profile) {
//       return NextResponse.json(
//         { message: "No profile found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(profile, { status: 200 });
//   } catch (err: any) {
//     console.error("Profile fetch error:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch profile", details: err.message },
//       { status: 500 }
//     );
//   }
// }












import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ---- VALIDATION ----
    if (!body.businessType) {
      return NextResponse.json(
        { error: "Business Type is required" },
        { status: 400 }
      );
    }
    if (!body.businessName) {
      return NextResponse.json(
        { error: "Business Name is required" },
        { status: 400 }
      );
    }
    if (!body.contactName) {
      return NextResponse.json(
        { error: "Contact Person Name is required" },
        { status: 400 }
      );
    }
    if (!body.contactPhone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }
    if (!body.contactEmail) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // ---- CREATE FORM ----
    const profile = await prisma.form.create({
      data: {
        title: "Business Profile",
        fields: {
          create: [
            {
              label: "Business Type",
              type: "SELECT",
              value: body.businessType,
              options: [],
            },
            {
              label: "Business Name",
              type: "INPUT",
              value: body.businessName,
              options: [],
            },
            {
              label: "Tagline",
              type: "INPUT",
              value: body.businessTagline || "",
              options: [],
            },
            {
              label: "Contact Person Name",
              type: "INPUT",
              value: body.contactName,
              options: [],
            },
            {
              label: "Phone",
              type: "INPUT",
              value: body.contactPhone,
              options: [],
            },
            {
              label: "Email",
              type: "INPUT",
              value: body.contactEmail,
              options: [],
            },
            {
              label: "UPI",
              type: "INPUT",
              value: body.upi || "",
              options: [],
            },
            {
              label: "Google Review Link",
              type: "INPUT",
              value: body.reviewLink || "",
              options: [],
            },
            {
              label: "Custom Field",
              type: "INPUT",
              value: body.customField || "",
              options: [],
            },
            {
              label: "Signature",
              type: "FILE",
              fileUrl: body.signature || "",
              options: [],
            },
            {
              label: "Logo",
              type: "FILE",
              fileUrl: body.logo || "",
              options: [],
            },
          ],
        },
      },
      include: { fields: true },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (err: any) {
    console.error("Profile save error:", err);

    // Prisma-specific error handling
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Duplicate entry detected" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save profile", details: err.message },
      { status: 500 }
    );
  }
}
