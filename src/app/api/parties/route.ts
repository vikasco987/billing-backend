// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // CREATE a new party
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, phone, address, dob } = body;

//     if (!name || !phone) {
//       return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
//     }

//     const party = await prisma.party.create({
//       data: { name, phone, address, dob: dob ? new Date(dob) : null },
//     });

//     return NextResponse.json(party, { status: 201 });
//   } catch (err) {
//     console.error("Error creating party:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// // GET all parties
// export async function GET() {
//   try {
//     const parties = await prisma.party.findMany({ orderBy: { name: "asc" } });
//     return NextResponse.json(parties);
//   } catch (err) {
//     console.error("Error fetching parties:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }









// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server"; // Clerk server auth

// // CREATE a new party
// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req); // ✅ Clerk user ID of the logged-in user
//     const body = await req.json();
//     const { name, phone, address, dob } = body;

//     if (!name || !phone) {
//       return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
//     }

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const party = await prisma.party.create({
//       data: {
//         name,
//         phone,
//         address,
//         dob: dob ? new Date(dob) : null,
//         createdBy: userId, // store the creator
//       },
//       include: {
//         user: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//             clerkId: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(party, { status: 201 });
//   } catch (err) {
//     console.error("Error creating party:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// // GET all parties
// export async function GET() {
//   try {
//     const parties = await prisma.party.findMany({
//       orderBy: { name: "asc" },
//       include: {
//         user: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//             clerkId: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(parties);
//   } catch (err) {
//     console.error("Error fetching parties:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server"; // Clerk server auth

// CREATE a new party
export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req); // ✅ Clerk user ID of the logged-in user
    const body = await req.json();
    const { name, phone, address, dob } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const party = await prisma.party.create({
      data: {
        name,
        phone,
        address,
        dob: dob ? new Date(dob) : null,
        createdBy: userId, // store the creator
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            clerkId: true,
          },
        },
      },
    });

    return NextResponse.json(party, { status: 201 });
  } catch (err) {
    console.error("Error creating party:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET all parties created by the logged-in user
export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parties = await prisma.party.findMany({
      where: { createdBy: userId }, // ✅ only parties created by this user
      orderBy: { name: "asc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            clerkId: true,
          },
        },
      },
    });

    return NextResponse.json(parties);
  } catch (err) {
    console.error("Error fetching parties:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
