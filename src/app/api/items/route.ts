








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





// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import busboy from "busboy";
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

// // ✅ GET handler: fetch all items for current user
// export async function GET() {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     const clerkId = user.id;



//     const dbUser = await prisma.user.findUnique({ where: { clerkId } });
//     if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const items = await prisma.item.findMany({
//       where: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { userId: clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  dbUser.id },
//       select: {
//         id: true,
//         name: true,
//         price: true,
//         sellingPrice: true,
//         mrp: true,
//         currentStock: true,
//       },
//     });

//     return NextResponse.json(items);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // POST handler: create new item (your existing code)
// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     const clerkId = user.id;

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
//           sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : parseFloat(data.price),
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

//     // multipart/form-data handling remains unchanged
//     if (contentType.includes("multipart/form-data")) {
//       return await new Promise<NextResponse>((resolve) => {
//         const headers: Record<string, string> = {};
//         req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//         const bb = busboy({ headers });
//         const fields: Record<string, any> = {};
//         const fileUploadPromises: Promise<string>[] = [];

//         bb.on("file", (_name, file) => {
//           const uploadPromise = new Promise<string>((res, rej) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//               { upload_preset: "mybillingmenu" },
//               (error, result) => {
//                 if (error) return rej(error);
//                 if (!result?.secure_url) return rej(new Error("No image URL returned"));
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

//     return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 400 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }












// "use server";

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import busboy from "busboy";
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

// // ✅ GET: fetch all items **created by current user only**
// export async function GET() {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
//     if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const items = await prisma.item.findMany({
//       where: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { ue: { uuser clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }  clerkId }   user.id }, // 🔑 restrict to creator
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         name: true,
//         description: true,
//         price: true,
//         sellingPrice: true,
//         mrp: true,
//         currentStock: true,
//         category: { select: { id: true, name: true } },
//       },
//     });

//     return NextResponse.json(items);
//   } catch (err: any) {
//     console.error("Error fetching items:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // ✅ POST: create new item and assign **current user as creator**
// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     let dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
//     if (!dbUser) {
//       dbUser = await prisma.user.create({
//         data: {
//           clerkId: user.id,
//           name: user.firstName + (user.lastName ? " " + user.lastName : ""),
//           email: user.emailAddresses[0]?.emailAddress || `no-email-${user.id}@example.com`,
//           role: "SELLER",
//         },
//       });
//     }

//     const contentType = req.headers.get("content-type") || "";

//     // JSON request
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
//           sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : parseFloat(data.price),
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
//           user: { connect: { id: dbUser.id } }, // 🔑 assign creator
//           category: { connect: { id: data.categoryId } },
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     }

//     // multipart/form-data (file uploads)
//     if (contentType.includes("multipart/form-data")) {
//       return await new Promise<NextResponse>((resolve) => {
//         const headers: Record<string, string> = {};
//         req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//         const bb = busboy({ headers });
//         const fields: Record<string, any> = {};
//         const fileUploadPromises: Promise<string>[] = [];

//         bb.on("file", (_name, file) => {
//           const uploadPromise = new Promise<string>((res, rej) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//               { upload_preset: "mybillingmenu" },
//               (error, result) => {
//                 if (error) return rej(error);
//                 if (!result?.secure_url) return rej(new Error("No image URL returned"));
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
//                 user: { connect: { id: dbUser.id } }, // 🔑 assign creator
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

//     return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 400 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }















// "use server";

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import busboy from "busboy";
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

// // ✅ GET: fetch all items created by current Clerk user
// export async function GET() {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const items = await prisma.item.findMany({
//       where: { createdByClerkId: user.id }, // 🔑 filter by current user
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         name: true,
//         description: true,
//         price: true,
//         sellingPrice: true,
//         mrp: true,
//         currentStock: true,
//         category: { select: { id: true, name: true } },
//       },
//     });

//     return NextResponse.json(items);
//   } catch (err: any) {
//     console.error("Error fetching items:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // ✅ POST: create new item with createdByClerkId
// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const contentType = req.headers.get("content-type") || "";

//     // JSON request
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
//           sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : parseFloat(data.price),
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
//           category: { connect: { id: data.categoryId } },
//           createdByClerkId: user.id, // 🔑 store Clerk ID
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     }

//     // multipart/form-data (file uploads)
//     if (contentType.includes("multipart/form-data")) {
//       return await new Promise<NextResponse>((resolve) => {
//         const headers: Record<string, string> = {};
//         req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//         const bb = busboy({ headers });
//         const fields: Record<string, any> = {};
//         const fileUploadPromises: Promise<string>[] = [];

//         bb.on("file", (_name, file) => {
//           const uploadPromise = new Promise<string>((res, rej) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//               { upload_preset: "mybillingmenu" },
//               (error, result) => {
//                 if (error) return rej(error);
//                 if (!result?.secure_url) return rej(new Error("No image URL returned"));
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
//                 category: { connect: { id: fields.categoryId } },
//                 createdByClerkId: user.id, // 🔑 store Clerk ID
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

//     return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 400 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
















// "use server";

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import busboy from "busboy";
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

// // GET: fetch all items created by current Clerk user
// export async function GET() {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const items = await prisma.item.findMany({
//       where: { user: { clerkId: user.id } },
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         name: true,
//         description: true,
//         price: true,
//         sellingPrice: true,
//         mrp: true,
//         currentStock: true,
//         category: { select: { id: true, name: true } },
//         user: { select: { name: true, email: true } },
//       },
//     });

//     return NextResponse.json(items);
//   } catch (err: any) {
//     console.error("Error fetching items:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // POST: create new item
// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     // Ensure User exists in DB
//     let dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
//     if (!dbUser) {
//       dbUser = await prisma.user.create({
//         data: {
//           clerkId: user.id,
//           name: user.firstName + (user.lastName ? " " + user.lastName : ""),
//           email: user.emailAddresses[0]?.emailAddress || `no-email-${user.id}@example.com`,
//           role: "SELLER",
//         },
//       });
//     }

//     const contentType = req.headers.get("content-type") || "";

//     // JSON request
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
//           sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : parseFloat(data.price),
//           price: parseFloat(data.price),
//           gst: data.gst ? parseFloat(data.gst) : null,
//           discount: data.discount ? parseFloat(data.discount) : null,
//           openingStock: data.openingStock ? parseInt(data.openingStock) : null,
//           currentStock:
//             data.currentStock !== undefined
//               ? parseInt(data.currentStock)
//               : data.openingStock
//               ? parseInt(data.openingStock)
//               : null,
//           reorderLevel: data.reorderLevel ? parseInt(data.reorderLevel) : null,
//           unit: data.unit || null,
//           barcode: data.barcode || null,
//           brand: data.brand || null,
//           model: data.model || null,
//           size: data.size || null,
//           color: data.color || null,
//           imageUrl: data.imageUrl || null,
//           gallery: data.gallery || [],
//           category: { connect: { id: String(data.categoryId) } }, // ✅ string
//           user: { connect: { id: dbUser.id } },
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     }

//     // multipart/form-data (file uploads)
//     if (contentType.includes("multipart/form-data")) {
//       return await new Promise<NextResponse>((resolve) => {
//         const headers: Record<string, string> = {};
//         req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//         const bb = busboy({ headers });
//         const fields: Record<string, any> = {};
//         const fileUploadPromises: Promise<string>[] = [];

//         bb.on("file", (_name, file) => {
//           const uploadPromise = new Promise<string>((res, rej) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//               { upload_preset: "mybillingmenu" },
//               (error, result) => {
//                 if (error) return rej(error);
//                 if (!result?.secure_url) return rej(new Error("No image URL returned"));
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
//                 currentStock:
//                   fields.currentStock !== undefined
//                     ? parseInt(fields.currentStock)
//                     : fields.openingStock
//                     ? parseInt(fields.openingStock)
//                     : null,
//                 reorderLevel: fields.reorderLevel ? parseInt(fields.reorderLevel) : null,
//                 unit: fields.unit || null,
//                 barcode: fields.barcode || null,
//                 brand: fields.brand || null,
//                 model: fields.model || null,
//                 size: fields.size || null,
//                 color: fields.color || null,
//                 imageUrl,
//                 gallery: fields.gallery ? JSON.parse(fields.gallery) : [],
//                 category: { connect: { id: String(fields.categoryId) } }, // ✅ string
//                 user: { connect: { id: dbUser!.id } },
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

//     return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 400 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }













// "use server";

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import busboy from "busboy";
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

// // GET: fetch all items created by current Clerk user
// export async function GET() {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const items = await prisma.item.findMany({
//       where: { user: { clerkId: user.id } },
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         name: true,
//         description: true,
//         price: true,
//         sellingPrice: true,
//         mrp: true,
//         currentStock: true,
//         category: { select: { id: true, name: true } },
//         user: { select: { name: true, email: true } },
//       },
//     });

//     return NextResponse.json(items);
//   } catch (err: any) {
//     console.error("Error fetching items:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // POST: create new item
// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     // Ensure user exists in DB
//     let dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
//     if (!dbUser) {
//       dbUser = await prisma.user.create({
//         data: {
//           clerkId: user.id,
//           name: user.firstName + (user.lastName ? " " + user.lastName : ""),
//           email: user.emailAddresses[0]?.emailAddress || `no-email-${user.id}@example.com`,
//           role: "SELLER",
//         },
//       });
//     }

//     const contentType = req.headers.get("content-type") || "";

//     // JSON request
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
//           sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : parseFloat(data.price),
//           price: parseFloat(data.price),
//           gst: data.gst ? parseFloat(data.gst) : null,
//           discount: data.discount ? parseFloat(data.discount) : null,
//           openingStock: data.openingStock ? parseInt(data.openingStock) : null,
//           currentStock:
//             data.currentStock !== undefined
//               ? parseInt(data.currentStock)
//               : data.openingStock
//               ? parseInt(data.openingStock)
//               : null,
//           reorderLevel: data.reorderLevel ? parseInt(data.reorderLevel) : null,
//           unit: data.unit || null,
//           barcode: data.barcode || null,
//           brand: data.brand || null,
//           model: data.model || null,
//           size: data.size || null,
//           color: data.color || null,
//           imageUrl: data.imageUrl || null,
//           gallery: data.gallery || [],
//           category: { connect: { id: String(data.categoryId) } },
//           user: { connect: { id: dbUser.id } }, // ✅ Clerk ID stored automatically
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     }

//     // multipart/form-data (file uploads)
//     if (contentType.includes("multipart/form-data")) {
//       return await new Promise<NextResponse>((resolve) => {
//         const headers: Record<string, string> = {};
//         req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//         const bb = busboy({ headers });
//         const fields: Record<string, any> = {};
//         const fileUploadPromises: Promise<string>[] = [];

//         bb.on("file", (_name, file) => {
//           const uploadPromise = new Promise<string>((res, rej) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//               { upload_preset: "mybillingmenu" },
//               (error, result) => {
//                 if (error) return rej(error);
//                 if (!result?.secure_url) return rej(new Error("No image URL returned"));
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
//                 currentStock:
//                   fields.currentStock !== undefined
//                     ? parseInt(fields.currentStock)
//                     : fields.openingStock
//                     ? parseInt(fields.openingStock)
//                     : null,
//                 reorderLevel: fields.reorderLevel ? parseInt(fields.reorderLevel) : null,
//                 unit: fields.unit || null,
//                 barcode: fields.barcode || null,
//                 brand: fields.brand || null,
//                 model: fields.model || null,
//                 size: fields.size || null,
//                 color: fields.color || null,
//                 imageUrl,
//                 gallery: fields.gallery ? JSON.parse(fields.gallery) : [],
//                 category: { connect: { id: String(fields.categoryId) } },
//                 user: { connect: { id: dbUser!.id } }, // ✅ Clerk ID stored automatically
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

//     return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 400 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }






// "use server";

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import busboy from "busboy";
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

// // ==================== GET: fetch items for current Clerk user ====================
// export async function GET() {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     // Fetch only items where userId matches current Clerk ID
//     const items = await prisma.item.findMany({
//       where: { user: { clerkId: user.id } },
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         name: true,
//         description: true,
//         price: true,
//         sellingPrice: true,
//         mrp: true,
//         currentStock: true,
//         unit: true,
//         category: { select: { id: true, name: true } },
//         user: { select: { name: true, email: true } },
//         imageUrl: true,
//         gallery: true,
//       },
//     });

//     return NextResponse.json(items);
//   } catch (err: any) {
//     console.error("Error fetching items:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // ==================== POST: create new item ====================
// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     // Ensure user exists in DB
//     let dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
//     if (!dbUser) {
//       dbUser = await prisma.user.create({
//         data: {
//           clerkId: user.id,
//           name: user.firstName + (user.lastName ? " " + user.lastName : ""),
//           email: user.emailAddresses[0]?.emailAddress || `no-email-${user.id}@example.com`,
//           role: "SELLER",
//         },
//       });
//     }

//     const contentType = req.headers.get("content-type") || "";

//     // Handle JSON request
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
//           sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : parseFloat(data.price),
//           price: parseFloat(data.price),
//           gst: data.gst ? parseFloat(data.gst) : null,
//           discount: data.discount ? parseFloat(data.discount) : null,
//           openingStock: data.openingStock ? parseInt(data.openingStock) : null,
//           currentStock:
//             data.currentStock !== undefined
//               ? parseInt(data.currentStock)
//               : data.openingStock
//               ? parseInt(data.openingStock)
//               : null,
//           reorderLevel: data.reorderLevel ? parseInt(data.reorderLevel) : null,
//           unit: data.unit || null,
//           barcode: data.barcode || null,
//           brand: data.brand || null,
//           model: data.model || null,
//           size: data.size || null,
//           color: data.color || null,
//           imageUrl: data.imageUrl || null,
//           gallery: data.gallery || [],
//           category: { connect: { id: String(data.categoryId) } },
//           user: { connect: { id: dbUser.id } }, // Clerk user relation
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     }

//     // Handle multipart/form-data (file uploads)
//     if (contentType.includes("multipart/form-data")) {
//       return await new Promise<NextResponse>((resolve) => {
//         const headers: Record<string, string> = {};
//         req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//         const bb = busboy({ headers });
//         const fields: Record<string, any> = {};
//         const fileUploadPromises: Promise<string>[] = [];

//         bb.on("file", (_name, file) => {
//           const uploadPromise = new Promise<string>((res, rej) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//               { upload_preset: "mybillingmenu" },
//               (error, result) => {
//                 if (error) return rej(error);
//                 if (!result?.secure_url) return rej(new Error("No image URL returned"));
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
//                 currentStock:
//                   fields.currentStock !== undefined
//                     ? parseInt(fields.currentStock)
//                     : fields.openingStock
//                     ? parseInt(fields.openingStock)
//                     : null,
//                 reorderLevel: fields.reorderLevel ? parseInt(fields.reorderLevel) : null,
//                 unit: fields.unit || null,
//                 barcode: fields.barcode || null,
//                 brand: fields.brand || null,
//                 model: fields.model || null,
//                 size: fields.size || null,
//                 color: fields.color || null,
//                 imageUrl,
//                 gallery: fields.gallery ? JSON.parse(fields.gallery) : [],
//                 category: { connect: { id: String(fields.categoryId) } },
//                 user: { connect: { id: dbUser!.id } }, // Clerk user relation
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

//     return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 400 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }






"use server";

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

// ==================== GET: fetch items for current Clerk user ====================
export async function GET() {
  try {
    const user = await currentUser();
    if (!user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch only items where clerkId matches current Clerk ID
    const items = await prisma.item.findMany({
      where: { clerkId: user.id }, // ✅ filter by Clerk ID string
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        sellingPrice: true,
        mrp: true,
        currentStock: true,
        unit: true,
        category: { select: { id: true, name: true } },
        user: { select: { name: true, email: true } },
        imageUrl: true,
        gallery: true,
      },
    });

    return NextResponse.json(items);
  } catch (err: any) {
    console.error("Error fetching items:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ==================== POST: create new item ====================
export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Ensure user exists in DB
    let dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          name: user.firstName + (user.lastName ? " " + user.lastName : ""),
          email:
            user.emailAddresses[0]?.emailAddress ||
            `no-email-${user.id}@example.com`,
          role: "SELLER",
        },
      });
    }

    const contentType = req.headers.get("content-type") || "";

    // ----------------- Handle JSON request -----------------
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
          sellingPrice: data.sellingPrice
            ? parseFloat(data.sellingPrice)
            : parseFloat(data.price),
          price: parseFloat(data.price),
          gst: data.gst ? parseFloat(data.gst) : null,
          discount: data.discount ? parseFloat(data.discount) : null,
          openingStock: data.openingStock ? parseInt(data.openingStock) : null,
          currentStock:
            data.currentStock !== undefined
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
          category: { connect: { id: String(data.categoryId) } },
          clerkId: user.id, // ✅ store Clerk ID
          user: { connect: { id: dbUser.id } }, // ✅ connect DB user
        },
      });

      return NextResponse.json(item, { status: 201 });
    }

    // ----------------- Handle multipart/form-data -----------------
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
                if (!result?.secure_url)
                  return rej(new Error("No image URL returned"));
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
                purchasePrice: fields.purchasePrice
                  ? parseFloat(fields.purchasePrice)
                  : null,
                sellingPrice: fields.sellingPrice
                  ? parseFloat(fields.sellingPrice)
                  : parseFloat(fields.price),
                price: parseFloat(fields.price),
                gst: fields.gst ? parseFloat(fields.gst) : null,
                discount: fields.discount ? parseFloat(fields.discount) : null,
                openingStock: fields.openingStock ? parseInt(fields.openingStock) : null,
                currentStock:
                  fields.currentStock !== undefined
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
                category: { connect: { id: String(fields.categoryId) } },
                clerkId: user.id, // ✅ store Clerk ID
                user: { connect: { id: dbUser!.id } }, // ✅ connect DB user
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

    return NextResponse.json(
      { error: `Unsupported content type: ${contentType}` },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
