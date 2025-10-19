








// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import busboy from "busboy";   // ✅ lowercase import
// import { Readable } from "stream";
// import { currentUser } from "@clerk/nextjs/server";

// // Helper: convert Web ReadableStream → Node Readable
// function toNodeReadable(stream: ReadableStream<Uint8Array> | null): Readable {
//   if (!stream) throw new Error("Request body is empty");
//   const reader = stream.getReader();
//   return new Readable({
//     async read() {
//       const { done, value } = await reader.read();
//       if (done) this.push(null);
//       else this.push(Buffer.from(value));
//     },
//   });
// }

// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     const clerkId = user.id;

//     // Find or create user
//     let dbUser = await prisma.user.findUnique({ where: { clerkId } });
//     if (!dbUser) {
//       dbUser = await prisma.user.create({
//         data: {
//           clerkId,
//           name: user.firstName + (user.lastName ? " " + user.lastName : ""),
//           email: user.emailAddresses[0]?.emailAddress || `no-email-${clerkId}@example.com`,
//           role: "SELLER",
//         },
//       });
//     }

//     const contentType = req.headers.get("content-type") || "";

//     // ===== Case 1: JSON request =====
//     if (contentType.includes("application/json")) {
//       const data = await req.json();

//       if (!data.name || !data.price || !data.categoryId) {
//         return NextResponse.json(
//           { error: "Missing required fields: name, price, or categoryId" },
//           { status: 400 }
//         );
//       }

//       const item = await prisma.item.create({
//         data: {
//           name: data.name,
//           description: data.description || null,
//           mrp: data.mrp ? parseFloat(data.mrp) : null,
//           purchasePrice: data.purchasePrice ? parseFloat(data.purchasePrice) : null,
//           sellingPrice: data.sellingPrice
//             ? parseFloat(data.sellingPrice)
//             : parseFloat(data.price),
//           price: parseFloat(data.price),
//           gst: data.gst ? parseFloat(data.gst) : null,
//           discount: data.discount ? parseFloat(data.discount) : null,
//           openingStock: data.openingStock ? parseInt(data.openingStock) : null,
//           currentStock: data.currentStock
//             ? parseInt(data.currentStock)
//             : data.openingStock
//             ? parseInt(data.openingStock)
//             : null,
//           reorderLevel: data.reorderLevel ? parseInt(data.reorderLevel) : null,
//           unit: data.unit || null,
//           barcode: data.barcode || null,
//           brand: data.brand || null,
//           model: data.model || null,
//           size: data.size || null,
//           color: data.color || null,
//           imageUrl: data.imageUrl || null,
//           gallery: data.gallery || [],
//           user: { connect: { id: dbUser.id } },
//           category: { connect: { id: data.categoryId } },
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     }

//     // ===== Case 2: multipart/form-data =====
//     if (contentType.includes("multipart/form-data")) {
//       return await new Promise<NextResponse>((resolve) => {
//         const headers: Record<string, string> = {};
//         req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//         // ✅ FIX: use busboy() instead of new Busboy()
//         const bb = busboy({ headers });
//         const fields: Record<string, any> = {};
//         const fileUploadPromises: Promise<string>[] = [];

//         bb.on("file", (_name, file) => {
//           const uploadPromise = new Promise<string>((res, rej) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//               { upload_preset: "mybillingmenu" },
//               (error, result) => {
//                 if (error) return rej(error);
//                 if (!result?.secure_url)
//                   return rej(new Error("No image URL returned from Cloudinary"));
//                 res(result.secure_url);
//               }
//             );
//             file.pipe(uploadStream);
//           });
//           fileUploadPromises.push(uploadPromise);
//         });

//         bb.on("field", (name, value) => {
//           fields[name] = value;
//         });

//         bb.on("finish", async () => {
//           try {
//             if (!fields.name || !fields.price || !fields.categoryId) {
//               return resolve(
//                 NextResponse.json(
//                   { error: "Missing required fields: name, price, or categoryId" },
//                   { status: 400 }
//                 )
//               );
//             }

//             let imageUrl: string | null = null;
//             if (fileUploadPromises.length > 0) {
//               const uploadedResults = await Promise.all(fileUploadPromises);
//               imageUrl = uploadedResults[0] || null;
//             }

//             const item = await prisma.item.create({
//               data: {
//                 name: fields.name,
//                 description: fields.description || null,
//                 mrp: fields.mrp ? parseFloat(fields.mrp) : null,
//                 purchasePrice: fields.purchasePrice ? parseFloat(fields.purchasePrice) : null,
//                 sellingPrice: fields.sellingPrice
//                   ? parseFloat(fields.sellingPrice)
//                   : parseFloat(fields.price),
//                 price: parseFloat(fields.price),
//                 gst: fields.gst ? parseFloat(fields.gst) : null,
//                 discount: fields.discount ? parseFloat(fields.discount) : null,
//                 openingStock: fields.openingStock ? parseInt(fields.openingStock) : null,
//                 currentStock: fields.currentStock
//                   ? parseInt(fields.currentStock)
//                   : fields.openingStock
//                   ? parseInt(fields.openingStock)
//                   : null,
//                 reorderLevel: fields.reorderLevel ? parseInt(fields.reorderLevel) : null,
//                 unit: fields.unit || null,
//                 barcode: fields.barcode || null,
//                 brand: fields.brand || null,
//                 model: fields.model || null,
//                 size: fields.size || null,
//                 color: fields.color || null,
//                 imageUrl,
//                 gallery: fields.gallery ? JSON.parse(fields.gallery) : [],
//                 user: { connect: { id: dbUser.id } },
//                 category: { connect: { id: fields.categoryId } },
//               },
//             });

//             resolve(NextResponse.json(item, { status: 201 }));
//           } catch (err: any) {
//             resolve(NextResponse.json({ error: err.message }, { status: 500 }));
//           }
//         });

//         const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//         nodeStream.pipe(bb);
//       });
//     }

//     return NextResponse.json(
//       { error: `Unsupported content type: ${contentType}` },
//       { status: 400 }
//     );
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import busboy from "busboy";
import { Readable } from "stream";
import { currentUser } from "@clerk/nextjs/server";

// Helper: convert Web ReadableStream → Node Readable
function toNodeReadable(stream: ReadableStream<Uint8Array> | null): Readable {
  if (!stream) throw new Error("Request body is empty");
  const reader = stream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(Buffer.from(value));
    },
  });
}

// ✅ GET handler: fetch all items for current user
export async function GET() {
  try {
    const user = await currentUser();
    if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const clerkId = user.id;

    const dbUser = await prisma.user.findUnique({ where: { clerkId } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const items = await prisma.item.findMany({
      where: { userId: dbUser.id },
      select: {
        id: true,
        name: true,
        price: true,
        sellingPrice: true,
        mrp: true,
        currentStock: true,
      },
    });

    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST handler: create new item (your existing code)
export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const clerkId = user.id;

    let dbUser = await prisma.user.findUnique({ where: { clerkId } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId,
          name: user.firstName + (user.lastName ? " " + user.lastName : ""),
          email: user.emailAddresses[0]?.emailAddress || `no-email-${clerkId}@example.com`,
          role: "SELLER",
        },
      });
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await req.json();

      if (!data.name || !data.price || !data.categoryId) {
        return NextResponse.json(
          { error: "Missing required fields: name, price, or categoryId" },
          { status: 400 }
        );
      }

      const item = await prisma.item.create({
        data: {
          name: data.name,
          description: data.description || null,
          mrp: data.mrp ? parseFloat(data.mrp) : null,
          purchasePrice: data.purchasePrice ? parseFloat(data.purchasePrice) : null,
          sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : parseFloat(data.price),
          price: parseFloat(data.price),
          gst: data.gst ? parseFloat(data.gst) : null,
          discount: data.discount ? parseFloat(data.discount) : null,
          openingStock: data.openingStock ? parseInt(data.openingStock) : null,
          currentStock: data.currentStock
            ? parseInt(data.currentStock)
            : data.openingStock
            ? parseInt(data.openingStock)
            : null,
          reorderLevel: data.reorderLevel ? parseInt(data.reorderLevel) : null,
          unit: data.unit || null,
          barcode: data.barcode || null,
          brand: data.brand || null,
          model: data.model || null,
          size: data.size || null,
          color: data.color || null,
          imageUrl: data.imageUrl || null,
          gallery: data.gallery || [],
          user: { connect: { id: dbUser.id } },
          category: { connect: { id: data.categoryId } },
        },
      });

      return NextResponse.json(item, { status: 201 });
    }

    // multipart/form-data handling remains unchanged
    if (contentType.includes("multipart/form-data")) {
      return await new Promise<NextResponse>((resolve) => {
        const headers: Record<string, string> = {};
        req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

        const bb = busboy({ headers });
        const fields: Record<string, any> = {};
        const fileUploadPromises: Promise<string>[] = [];

        bb.on("file", (_name, file) => {
          const uploadPromise = new Promise<string>((res, rej) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { upload_preset: "mybillingmenu" },
              (error, result) => {
                if (error) return rej(error);
                if (!result?.secure_url) return rej(new Error("No image URL returned"));
                res(result.secure_url);
              }
            );
            file.pipe(uploadStream);
          });
          fileUploadPromises.push(uploadPromise);
        });

        bb.on("field", (name, value) => {
          fields[name] = value;
        });

        bb.on("finish", async () => {
          try {
            if (!fields.name || !fields.price || !fields.categoryId) {
              return resolve(
                NextResponse.json(
                  { error: "Missing required fields: name, price, or categoryId" },
                  { status: 400 }
                )
              );
            }

            let imageUrl: string | null = null;
            if (fileUploadPromises.length > 0) {
              const uploadedResults = await Promise.all(fileUploadPromises);
              imageUrl = uploadedResults[0] || null;
            }

            const item = await prisma.item.create({
              data: {
                name: fields.name,
                description: fields.description || null,
                mrp: fields.mrp ? parseFloat(fields.mrp) : null,
                purchasePrice: fields.purchasePrice ? parseFloat(fields.purchasePrice) : null,
                sellingPrice: fields.sellingPrice
                  ? parseFloat(fields.sellingPrice)
                  : parseFloat(fields.price),
                price: parseFloat(fields.price),
                gst: fields.gst ? parseFloat(fields.gst) : null,
                discount: fields.discount ? parseFloat(fields.discount) : null,
                openingStock: fields.openingStock ? parseInt(fields.openingStock) : null,
                currentStock: fields.currentStock
                  ? parseInt(fields.currentStock)
                  : fields.openingStock
                  ? parseInt(fields.openingStock)
                  : null,
                reorderLevel: fields.reorderLevel ? parseInt(fields.reorderLevel) : null,
                unit: fields.unit || null,
                barcode: fields.barcode || null,
                brand: fields.brand || null,
                model: fields.model || null,
                size: fields.size || null,
                color: fields.color || null,
                imageUrl,
                gallery: fields.gallery ? JSON.parse(fields.gallery) : [],
                user: { connect: { id: dbUser.id } },
                category: { connect: { id: fields.categoryId } },
              },
            });

            resolve(NextResponse.json(item, { status: 201 }));
          } catch (err: any) {
            resolve(NextResponse.json({ error: err.message }, { status: 500 }));
          }
        });

        const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
        nodeStream.pipe(bb);
      });
    }

    return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
