







// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// function toNodeReadable(stream: ReadableStream<Uint8Array>) {
//   const reader = stream.getReader();
//   return new Readable({
//     async read() {
//       const { done, value } = await reader.read();
//       if (done) {
//         this.push(null);
//       } else {
//         this.push(Buffer.from(value));
//       }
//     },
//   });
// }

// export async function POST(req: Request) {
//   return new Promise((resolve, reject) => {
//     // ✅ Fix: Convert headers from Fetch API to plain object
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]) {
//       return reject(
//         NextResponse.json({ error: "Missing Content-Type" }, { status: 400 })
//       );
//     }

//     const busboy = Busboy({ headers });
//     const fields: Record<string, any> = {};
//     let fileUploadPromise: Promise<any> | null = null;

//     // Handle file upload
//     busboy.on("file", (_name, file, _info) => {
//       fileUploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "items" },
//           (error, result) => {
//             if (error) return rej(error);
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//     });

//     // Handle text fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // After everything finishes
//     busboy.on("finish", async () => {
//       try {
//         let imageUrl: string | null = null;

//         if (fileUploadPromise) {
//           const uploaded: any = await fileUploadPromise;
//           imageUrl = uploaded.secure_url;
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // ✅ Fix: Convert Next.js stream to Node stream
//     const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//     nodeStream.pipe(busboy);
//   });
// }













// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// // Helper: Convert Web ReadableStream → Node Readable (for Busboy)
// function toNodeReadable(stream: ReadableStream<Uint8Array>): Readable {
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: Handle JSON (no file upload)
//   if (contentType.includes("application/json")) {
//     const data = await req.json();

//     const item = await prisma.item.create({
//       data: {
//         name: data.name,
//         description: data.description || null,
//         price: parseFloat(data.price),
//         categoryId: data.categoryId,
//         imageUrl: null, // no image in JSON request
//       },
//     });

//     return NextResponse.json(item, { status: 201 });
//   }

//   // ✅ Case 2: Handle multipart/form-data (with file upload)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]) {
//       return reject(
//         NextResponse.json({ error: "Missing Content-Type" }, { status: 400 })
//       );
//     }

//     if (!headers["content-type"].includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = Busboy({ headers });
//     const fields: Record<string, any> = {};
//     let fileUploadPromise: Promise<any> | null = null;

//     // File upload → Cloudinary
//     busboy.on("file", (_name, file, _info) => {
//       fileUploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "items" },
//           (error, result) => {
//             if (error) return rej(error);
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//     });

//     // Form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // After finishing parsing
//     busboy.on("finish", async () => {
//       try {
//         let imageUrl: string | null = null;

//         if (fileUploadPromise) {
//           const uploaded: any = await fileUploadPromise;
//           imageUrl = uploaded.secure_url;
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//     nodeStream.pipe(busboy);
//   });
// }









// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// // 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
// function toNodeReadable(stream: ReadableStream<Uint8Array>): Readable {
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: Handle JSON (no file upload)
//   if (contentType.includes("application/json")) {
//     const data = await req.json();

//     const item = await prisma.item.create({
//       data: {
//         name: data.name,
//         description: data.description || null,
//         price: parseFloat(data.price),
//         categoryId: data.categoryId,
//         imageUrl: null, // no image in JSON request
//       },
//     });

//     return NextResponse.json(item, { status: 201 });
//   }

//   // ✅ Case 2: Handle multipart/form-data (with file upload)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]) {
//       return reject(
//         NextResponse.json({ error: "Missing Content-Type" }, { status: 400 })
//       );
//     }

//     if (!headers["content-type"].includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = Busboy({ headers });
//     const fields: Record<string, any> = {};
//     let fileUploadPromise: Promise<any> | null = null;

//     // 🔹 File upload → Cloudinary
//     busboy.on("file", (_name, file, _info) => {
//       fileUploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "items" }, // save under "items" folder in Cloudinary
//           (error, result) => {
//             if (error) return rej(error);
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//     });

//     // 🔹 Form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // 🔹 After parsing finishes
//     busboy.on("finish", async () => {
//       try {
//         let imageUrl: string | null = null;

//         if (fileUploadPromise) {
//           const uploaded: any = await fileUploadPromise;
//           imageUrl = uploaded.secure_url; // ✅ Cloudinary URL
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//     nodeStream.pipe(busboy);
//   });
// }










// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// // 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: Handle JSON request (no file upload)
//   if (contentType.includes("application/json")) {
//     try {
//       const data = await req.json();

//       const item = await prisma.item.create({
//         data: {
//           name: data.name,
//           description: data.description || null,
//           price: parseFloat(data.price),
//           categoryId: data.categoryId,
//           imageUrl: null, // no image
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ✅ Case 2: Handle multipart/form-data (with file upload)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = Busboy({ headers });
//     const fields: Record<string, any> = {};
//     let fileUploadPromise: Promise<any> | null = null;

//     // 🔹 Handle file upload → Cloudinary
//     busboy.on("file", (_name, file, _info) => {
//       fileUploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "items" },
//           (error, result) => {
//             if (error) return rej(error);
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//     });

//     // 🔹 Collect text fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // 🔹 After parsing finishes
//     busboy.on("finish", async () => {
//       try {
//         let imageUrl: string | null = null;

//         if (fileUploadPromise) {
//           const uploaded: any = await fileUploadPromise;
//           imageUrl = uploaded.secure_url;
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // 🔹 Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(
//         req.body as ReadableStream<Uint8Array>
//       );
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }










// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";
// import { ObjectId } from "bson"; // ✅ to handle Mongo ObjectId

// // 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: Handle JSON request (no file upload)
//   if (contentType.includes("application/json")) {
//     try {
//       const data = await req.json();

//       const item = await prisma.item.create({
//         data: {
//           name: data.name,
//           description: data.description || null,
//           price: parseFloat(data.price),
//           categoryId: data.categoryId
//             ? new ObjectId(data.categoryId).toString()
//             : null,
//           imageUrl: null, // no image
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ✅ Case 2: Handle multipart/form-data (with file upload)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = Busboy({ headers });
//     const fields: Record<string, any> = {};
//     let fileUploadPromise: Promise<any> | null = null;

//     // 🔹 Handle file upload → Cloudinary (FIXED)
//     busboy.on("file", (_name, file, _info) => {
//       fileUploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "items" },
//           (error, result) => {
//             if (error) return rej(error);
//             res(result);
//           }
//         );

//         // ✅ Correct way: manually write to Cloudinary upload stream
//         file.on("data", (data) => uploadStream.write(data));
//         file.on("end", () => uploadStream.end());
//       });
//     });

//     // 🔹 Collect text fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // 🔹 After parsing finishes
//     busboy.on("finish", async () => {
//       try {
//         let imageUrl: string | null = null;

//         if (fileUploadPromise) {
//           const uploaded: any = await fileUploadPromise;
//           imageUrl = uploaded.secure_url;
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId
//               ? new ObjectId(fields.categoryId).toString()
//               : null,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // 🔹 Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(
//         req.body as ReadableStream<Uint8Array>
//       );
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }















// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";
// import { ObjectId } from "bson"; // ✅ to handle Mongo ObjectId

// // 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: JSON request (no file)
//   if (contentType.includes("application/json")) {
//     try {
//       const data = await req.json();

//       const item = await prisma.item.create({
//         data: {
//           name: data.name,
//           description: data.description || null,
//           price: parseFloat(data.price),
//           categoryId: data.categoryId
//             ? new ObjectId(data.categoryId).toString()
//             : null,
//           imageUrl: null,
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ✅ Case 2: multipart/form-data (with image)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = Busboy({ headers });
//     const fields: Record<string, any> = {};
//     let fileUploadPromise: Promise<any> | null = null;

//     // 🔹 File upload → Cloudinary
//     busboy.on("file", (_name, file, _info) => {
//       fileUploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "items" },
//           (error, result) => {
//             if (error) return rej(error);
//             res(result);
//           }
//         );

//         // ✅ Correctly pipe file data to Cloudinary stream
//         file.on("data", (data) => uploadStream.write(data));
//         file.on("end", () => uploadStream.end());
//       });
//     });

//     // 🔹 Collect form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // 🔹 After parsing finishes
//     busboy.on("finish", async () => {
//       try {
//         let imageUrl: string | null = null;

//         if (fileUploadPromise) {
//           const uploaded: any = await fileUploadPromise;
//           imageUrl = uploaded.secure_url;
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId
//               ? new ObjectId(fields.categoryId).toString()
//               : null,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // 🔹 Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }

















// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";
// import { ObjectId } from "bson";

// // 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: JSON request (no file)
//   if (contentType.includes("application/json")) {
//     try {
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
//           price: parseFloat(data.price),
//           categoryId: new ObjectId(data.categoryId).toString(),
//           imageUrl: null,
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ✅ Case 2: multipart/form-data (with image)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = Busboy({ headers });
//     const fields: Record<string, any> = {};
//     let fileUploadPromise: Promise<any> | null = null;

//     // 🔹 File upload → Cloudinary
//     busboy.on("file", (_name, file) => {
//       fileUploadPromise = new Promise((res, rej) => {
//         try {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             { folder: "items" },
//             (error, result) => {
//               if (error) return rej(error);
//               res(result);
//             }
//           );

//           // ✅ Pipe file directly to Cloudinary
//           file.pipe(uploadStream);
//         } catch (err) {
//           rej(err);
//         }
//       });
//     });

//     // 🔹 Collect form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // 🔹 After parsing finishes
//     busboy.on("finish", async () => {
//       try {
//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         let imageUrl: string | null = null;

//         if (fileUploadPromise) {
//           try {
//             const uploaded: any = await fileUploadPromise;
//             imageUrl = uploaded.secure_url;
//           } catch (err) {
//             console.error("Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: new ObjectId(fields.categoryId).toString(),
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("Prisma item create failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // 🔹 Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }








// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "../../../lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// // 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: JSON request (no file)
//   if (contentType.includes("application/json")) {
//     try {
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
//           price: parseFloat(data.price),
//           categoryId: data.categoryId, // string, no ObjectId needed
//           imageUrl: null,
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ✅ Case 2: multipart/form-data (with image)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = Busboy({ headers });
//     const fields: Record<string, any> = {};
//     const fileUploadPromises: Promise<any>[] = [];

//     // 🔹 File upload → Cloudinary (supports multiple files)
//     busboy.on("file", (_name, file) => {
//       const uploadPromise = new Promise((res, rej) => {
//         try {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             { upload_preset: "mybillingmenu" }, // uses your preset
//             (error, result) => {
//               if (error) return rej(error);
//               res(result);
//             }
//           );

//           file.pipe(uploadStream);
//         } catch (err) {
//           rej(err);
//         }
//       });

//       fileUploadPromises.push(uploadPromise);
//     });

//     // 🔹 Collect form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // 🔹 After parsing finishes
//     busboy.on("finish", async () => {
//       try {
//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         let imageUrl: string | null = null;
//         if (fileUploadPromises.length > 0) {
//           try {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             // If multiple files, take the first one (or handle array if needed)
//             imageUrl = uploadedResults[0].secure_url;
//           } catch (err) {
//             console.error("Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("Prisma item create failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // 🔹 Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }









// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "../../../lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// // 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: JSON request (no file upload)
//   if (contentType.includes("application/json")) {
//     try {
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
//           price: parseFloat(data.price),
//           categoryId: data.categoryId,
//           imageUrl: null,
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ✅ Case 2: multipart/form-data (with image upload)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => {
//       headers[key.toLowerCase()] = value;
//     });

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = new Busboy({ headers });
//     const fields: Record<string, any> = {};
//     const fileUploadPromises: Promise<any>[] = [];

//     // 🔹 File upload → Cloudinary (supports multiple files)
//     busboy.on("file", (_name, file) => {
//       const uploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { upload_preset: "mybillingmenu" },
//           (error, result) => {
//             if (error) return rej(error);
//             if (!result?.secure_url) return rej(new Error("No image URL from Cloudinary"));
//             res(result);
//           }
//         );

//         file.pipe(uploadStream);
//       });

//       fileUploadPromises.push(uploadPromise);
//     });

//     // 🔹 Collect form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     // 🔹 After parsing finishes
//     busboy.on("finish", async () => {
//       try {
//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         let imageUrl: string | null = null;
//         if (fileUploadPromises.length > 0) {
//           try {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl = uploadedResults[0]?.secure_url || null;
//           } catch (err) {
//             console.error("Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("Prisma item create failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // 🔹 Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }









// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// // 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: JSON request (no file)
//   if (contentType.includes("application/json")) {
//     try {
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
//           price: parseFloat(data.price),
//           categoryId: data.categoryId,
//           imageUrl: data.image || null, // store Cloudinary URL if provided
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ✅ Case 2: multipart/form-data (file upload)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = new Busboy({ headers });
//     const fields: Record<string, any> = {};
//     const fileUploadPromises: Promise<any>[] = [];

//     // 🔹 Handle file upload to Cloudinary
//     busboy.on("file", (_name, file) => {
//       const uploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { upload_preset: "mybillingmenu" },
//           (error, result) => {
//             if (error) return rej(error);
//             if (!result?.secure_url)
//               return rej(new Error("No image URL from Cloudinary"));
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//       fileUploadPromises.push(uploadPromise);
//     });

//     // 🔹 Collect other form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     busboy.on("finish", async () => {
//       try {
//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         let imageUrl: string | null = null;
//         if (fileUploadPromises.length > 0) {
//           try {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl = uploadedResults[0]?.secure_url || null;
//           } catch (err) {
//             console.error("Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("Prisma item creation failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // 🔹 Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }





// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// // Helper: Convert Web ReadableStream → Node Readable
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
//   const contentType = req.headers.get("content-type") || "";

//   // ✅ Case 1: JSON request (frontend sends name, price, categoryId, imageUrl)
//   if (contentType.includes("application/json")) {
//     try {
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
//           price: parseFloat(data.price),
//           categoryId: data.categoryId,
//           imageUrl: data.imageUrl || null, // ✅ store Cloudinary URL
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ✅ Case 2: multipart/form-data (file upload)
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = new Busboy({ headers });
//     const fields: Record<string, any> = {};
//     const fileUploadPromises: Promise<any>[] = [];

//     // Upload file to Cloudinary
//     busboy.on("file", (_name, file) => {
//       const uploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { upload_preset: "mybillingmenu" },
//           (error, result) => {
//             if (error) return rej(error);
//             if (!result?.secure_url)
//               return rej(new Error("No image URL from Cloudinary"));
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//       fileUploadPromises.push(uploadPromise);
//     });

//     // Collect form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     busboy.on("finish", async () => {
//       try {
//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         let imageUrl: string | null = null;
//         if (fileUploadPromises.length > 0) {
//           try {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl = uploadedResults[0]?.secure_url || null;
//           } catch (err) {
//             console.error("Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl, // ✅ store uploaded Cloudinary URL
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("Prisma item creation failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }




// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

// // Helper: Convert Web ReadableStream → Node Readable
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
//   const contentType = req.headers.get("content-type") || "";

//   // ===== Case 1: JSON request (frontend sends imageUrl) =====
//   if (contentType.includes("application/json")) {
//     try {
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
//           price: parseFloat(data.price),
//           categoryId: data.categoryId,
//           imageUrl: data.imageUrl || null, // ✅ store Cloudinary URL
//           tax: data.gst || null,
//           discount: data.otherTax || null,
//           stock: data.openingStock || null,
//           variants: data.itemUnit ? { unit: data.itemUnit } : null,
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ===== Case 2: multipart/form-data (file upload) =====
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = new Busboy({ headers });
//     const fields: Record<string, any> = {};
//     const fileUploadPromises: Promise<any>[] = [];

//     // Upload file to Cloudinary
//     busboy.on("file", (_name, file) => {
//       const uploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { upload_preset: "mybillingmenu" },
//           (error, result) => {
//             if (error) return rej(error);
//             if (!result?.secure_url)
//               return rej(new Error("No image URL from Cloudinary"));
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//       fileUploadPromises.push(uploadPromise);
//     });

//     // Collect form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     busboy.on("finish", async () => {
//       try {
//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         let imageUrl: string | null = null;
//         if (fileUploadPromises.length > 0) {
//           try {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl = uploadedResults[0]?.secure_url || null;
//           } catch (err) {
//             console.error("Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl, // ✅ store uploaded Cloudinary URL
//             tax: fields.gst || null,
//             discount: fields.otherTax || null,
//             stock: fields.openingStock || null,
//             variants: fields.itemUnit ? { unit: fields.itemUnit } : null,
//           },
//         });

//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("Prisma item creation failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // Pipe request body to busboy
//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }





// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

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
//   const contentType = req.headers.get("content-type") || "";

//   // ===== Case 1: JSON request =====
//   if (contentType.includes("application/json")) {
//     try {
//       const data = await req.json();
//       console.log("Received JSON data:", data);

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
//           price: parseFloat(data.price),
//           categoryId: data.categoryId,
//           imageUrl: data.imageUrl || null,
//           tax: data.gst || null,
//           discount: data.otherTax || null,
//           stock: data.openingStock || null,
//           variants: data.itemUnit ? { unit: data.itemUnit } : null,
//         },
//       });

//       console.log("Item created in MongoDB:", item);
//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ===== Case 2: multipart/form-data =====
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = new Busboy({ headers });
//     const fields: Record<string, any> = {};
//     const fileUploadPromises: Promise<any>[] = [];

//     // ✅ Upload file to Cloudinary
//     busboy.on("file", (_name, file) => {
//       const uploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { upload_preset: "mybillingmenu" },
//           (error, result) => {
//             if (error) {
//               console.error("Cloudinary upload error:", error);
//               return rej(error);
//             }
//             if (!result?.secure_url) {
//               return rej(new Error("No image URL returned from Cloudinary"));
//             }
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//       fileUploadPromises.push(uploadPromise);
//     });

//     // ✅ Collect form fields
//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     busboy.on("finish", async () => {
//       try {
//         console.log("Multipart fields received:", fields);

//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         // ✅ Wait for Cloudinary uploads
//         let imageUrl: string | null = null;
//         if (fileUploadPromises.length > 0) {
//           try {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl = uploadedResults[0]?.secure_url || null;
//             console.log("Uploaded Cloudinary URL:", imageUrl);
//           } catch (err) {
//             console.error("Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         // ✅ Save item in MongoDB
//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//             tax: fields.gst || null,
//             discount: fields.otherTax || null,
//             stock: fields.openingStock || null,
//             variants: fields.itemUnit ? { unit: fields.itemUnit } : null,
//           },
//         });

//         console.log("Item created in MongoDB:", item);
//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("Prisma item creation failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     // Pipe request body to Busboy
//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }












// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

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
//   const contentType = req.headers.get("content-type") || "";

//   // ===== Case 1: JSON request =====
//   if (contentType.includes("application/json")) {
//     try {
//       const data = await req.json();
//       console.log("Received JSON data:", data);

//       if (!data.name || !data.price || !data.categoryId) {
//         return NextResponse.json(
//           { error: "Missing required fields: name, price, or categoryId" },
//           { status: 400 }
//         );
//       }

//       const imageUrl =
//         data.imageUrl && data.imageUrl.trim() !== "" ? data.imageUrl : null;

//       const item = await prisma.item.create({
//         data: {
//           name: data.name,
//           description: data.description || null,
//           price: parseFloat(data.price),
//           categoryId: data.categoryId,
//           imageUrl, // ✅ store only valid URL
//           tax: data.gst || null,
//           discount: data.otherTax || null,
//           stock: data.openingStock || null,
//           variants: data.itemUnit ? { unit: data.itemUnit } : null,
//         },
//       });

//       console.log("Item created in MongoDB:", item);
//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ===== Case 2: multipart/form-data =====
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = new Busboy({ headers });
//     const fields: Record<string, any> = {};
//     const fileUploadPromises: Promise<any>[] = [];

//     // Upload file to Cloudinary
//     busboy.on("file", (_name, file) => {
//       const uploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { upload_preset: "mybillingmenu" },
//           (error, result) => {
//             if (error) {
//               console.error("Cloudinary upload error:", error);
//               return rej(error);
//             }
//             if (!result?.secure_url) {
//               return rej(new Error("No image URL returned from Cloudinary"));
//             }
//             res(result);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//       fileUploadPromises.push(uploadPromise);
//     });

//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     busboy.on("finish", async () => {
//       try {
//         console.log("Multipart fields received:", fields);

//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         // Wait for Cloudinary uploads
//         let imageUrl: string | null = null;
//         if (fileUploadPromises.length > 0) {
//           try {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl =
//               uploadedResults[0]?.secure_url &&
//               uploadedResults[0].secure_url.trim() !== ""
//                 ? uploadedResults[0].secure_url
//                 : null;
//             console.log("Uploaded Cloudinary URL:", imageUrl);
//           } catch (err) {
//             console.error("Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//             tax: fields.gst || null,
//             discount: fields.otherTax || null,
//             stock: fields.openingStock || null,
//             variants: fields.itemUnit ? { unit: fields.itemUnit } : null,
//           },
//         });

//         console.log("Item created in MongoDB:", item);
//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("Prisma item creation failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }
















// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
// import { Readable } from "stream";

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
//   const contentType = req.headers.get("content-type") || "";

//   // ===== Case 1: JSON request =====
//   if (contentType.includes("application/json")) {
//     try {
//       const data = await req.json();
//       console.log("Received JSON data:", data);

//       if (!data.name || !data.price || !data.categoryId) {
//         return NextResponse.json(
//           { error: "Missing required fields: name, price, or categoryId" },
//           { status: 400 }
//         );
//       }

//       const imageUrl =
//         data.imageUrl && data.imageUrl.trim() !== "" ? data.imageUrl : null;

//       const item = await prisma.item.create({
//         data: {
//           name: data.name,
//           description: data.description || null,
//           price: parseFloat(data.price),
//           categoryId: data.categoryId,
//           imageUrl,
//           tax: data.gst ? parseFloat(data.gst) : null,
//           discount: data.otherTax ? parseFloat(data.otherTax) : null,
//           stock: data.openingStock ? parseInt(data.openingStock) : null,
//           variants: data.itemUnit ? JSON.stringify({ unit: data.itemUnit }) : null,
//         },
//       });

//       console.log("✅ Item created in MongoDB:", item);
//       return NextResponse.json(item, { status: 201 });
//     } catch (err: any) {
//       console.error("❌ JSON POST error:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // ===== Case 2: multipart/form-data =====
//   return new Promise((resolve, reject) => {
//     const headers: Record<string, string> = {};
//     req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//     if (!headers["content-type"]?.includes("multipart/form-data")) {
//       return reject(
//         NextResponse.json(
//           { error: `Unsupported content type: ${headers["content-type"]}` },
//           { status: 400 }
//         )
//       );
//     }

//     const busboy = new Busboy({ headers });
//     const fields: Record<string, any> = {};
//     const fileUploadPromises: Promise<any>[] = [];

//     // Upload file to Cloudinary
//     busboy.on("file", (_name, file) => {
//       const uploadPromise = new Promise((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { upload_preset: "mybillingmenu" },
//           (error, result) => {
//             if (error) {
//               console.error("❌ Cloudinary upload error:", error);
//               return rej(error);
//             }
//             if (!result?.secure_url) {
//               return rej(new Error("No image URL returned from Cloudinary"));
//             }
//             res(result.secure_url);
//           }
//         );
//         file.pipe(uploadStream);
//       });
//       fileUploadPromises.push(uploadPromise);
//     });

//     busboy.on("field", (name, value) => {
//       fields[name] = value;
//     });

//     busboy.on("finish", async () => {
//       try {
//         console.log("Multipart fields received:", fields);

//         if (!fields.name || !fields.price || !fields.categoryId) {
//           return reject(
//             NextResponse.json(
//               { error: "Missing required fields: name, price, or categoryId" },
//               { status: 400 }
//             )
//           );
//         }

//         // Wait for Cloudinary uploads
//         let imageUrl: string | null = null;
//         if (fileUploadPromises.length > 0) {
//           try {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl = uploadedResults[0] || null;
//             console.log("✅ Uploaded Cloudinary URL:", imageUrl);
//           } catch (err) {
//             console.error("❌ Cloudinary upload failed:", err);
//             return reject(
//               NextResponse.json({ error: "Image upload failed" }, { status: 500 })
//             );
//           }
//         }

//         const item = await prisma.item.create({
//           data: {
//             name: fields.name,
//             description: fields.description || null,
//             price: parseFloat(fields.price),
//             categoryId: fields.categoryId,
//             imageUrl,
//             tax: fields.gst ? parseFloat(fields.gst) : null,
//             discount: fields.otherTax ? parseFloat(fields.otherTax) : null,
//             stock: fields.openingStock ? parseInt(fields.openingStock) : null,
//             variants: fields.itemUnit ? JSON.stringify({ unit: fields.itemUnit }) : null,
//           },
//         });

//         console.log("✅ Item created in MongoDB:", item);
//         resolve(NextResponse.json(item, { status: 201 }));
//       } catch (err: any) {
//         console.error("❌ Prisma item creation failed:", err);
//         reject(NextResponse.json({ error: err.message }, { status: 500 }));
//       }
//     });

//     try {
//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     } catch (err: any) {
//       console.error("❌ Request body stream error:", err);
//       reject(NextResponse.json({ error: err.message }, { status: 400 }));
//     }
//   });
// }



// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
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
//     // ✅ Get logged-in Clerk user
//     const user = await currentUser();
//     if (!user?.id)
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     const clerkId = user.id;

//     // ✅ Find User in DB mapped to this Clerk ID
//     const dbUser = await prisma.user.findUnique({ where: { clerkId } });
//     if (!dbUser)
//       return NextResponse.json(
//         { error: "No User found for this Clerk ID" },
//         { status: 404 }
//       );

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

//       // ✅ Ensure category exists
//       const categoryExists = await prisma.category.findUnique({
//         where: { id: data.categoryId },
//       });
//       if (!categoryExists) {
//         return NextResponse.json(
//           { error: "Category not found" },
//           { status: 404 }
//         );
//       }

//       const imageUrl =
//         data.imageUrl && data.imageUrl.trim() !== "" ? data.imageUrl : null;

//       const item = await prisma.item.create({
//         data: {
//           name: data.name,
//           description: data.description || null,
//           price: parseFloat(data.price),
//           tax: data.gst ? parseFloat(data.gst) : null,
//           discount: data.otherTax ? parseFloat(data.otherTax) : null,
//           stock: data.openingStock ? parseInt(data.openingStock) : null,
//           variants: data.itemUnit ? JSON.stringify({ unit: data.itemUnit }) : null,
//           imageUrl,
//           user: { connect: { id: dbUser.id } }, // ✅ connect existing user
//           category: { connect: { id: data.categoryId } }, // ✅ connect existing category
//         },
//       });

//       return NextResponse.json(item, { status: 201 });
//     }

//     // ===== Case 2: multipart/form-data =====
//     return new Promise((resolve, reject) => {
//       const headers: Record<string, string> = {};
//       req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//       if (!headers["content-type"]?.includes("multipart/form-data")) {
//         return reject(
//           NextResponse.json(
//             { error: `Unsupported content type: ${headers["content-type"]}` },
//             { status: 400 }
//           )
//         );
//       }

//       const busboy = new Busboy({ headers });
//       const fields: Record<string, any> = {};
//       const fileUploadPromises: Promise<string>[] = [];

//       busboy.on("file", (_name, file) => {
//         const uploadPromise = new Promise<string>((res, rej) => {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             { upload_preset: "mybillingmenu" },
//             (error, result) => {
//               if (error) return rej(error);
//               if (!result?.secure_url)
//                 return rej(new Error("No image URL returned from Cloudinary"));
//               res(result.secure_url);
//             }
//           );
//           file.pipe(uploadStream);
//         });
//         fileUploadPromises.push(uploadPromise);
//       });

//       busboy.on("field", (name, value) => {
//         fields[name] = value;
//       });

//       busboy.on("finish", async () => {
//         try {
//           if (!fields.name || !fields.price || !fields.categoryId) {
//             return reject(
//               NextResponse.json(
//                 { error: "Missing required fields: name, price, or categoryId" },
//                 { status: 400 }
//               )
//             );
//           }

//           // ✅ Ensure category exists
//           const categoryExists = await prisma.category.findUnique({
//             where: { id: fields.categoryId },
//           });
//           if (!categoryExists) {
//             return reject(
//               NextResponse.json({ error: "Category not found" }, { status: 404 })
//             );
//           }

//           let imageUrl: string | null = null;
//           if (fileUploadPromises.length > 0) {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl = uploadedResults[0] || null;
//           }

//           const item = await prisma.item.create({
//             data: {
//               name: fields.name,
//               description: fields.description || null,
//               price: parseFloat(fields.price),
//               tax: fields.gst ? parseFloat(fields.gst) : null,
//               discount: fields.otherTax ? parseFloat(fields.otherTax) : null,
//               stock: fields.openingStock ? parseInt(fields.openingStock) : null,
//               variants: fields.itemUnit ? JSON.stringify({ unit: fields.itemUnit }) : null,
//               imageUrl,
//               user: { connect: { id: dbUser.id } },
//               category: { connect: { id: fields.categoryId } },
//             },
//           });

//           resolve(NextResponse.json(item, { status: 201 }));
//         } catch (err: any) {
//           reject(NextResponse.json({ error: err.message }, { status: 500 }));
//         }
//       });

//       try {
//         const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//         nodeStream.pipe(busboy);
//       } catch (err: any) {
//         reject(NextResponse.json({ error: err.message }, { status: 400 }));
//       }
//     });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }






import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import Busboy from "busboy";
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

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const clerkId = user.id;

    // Try to find existing user
    let dbUser = await prisma.user.findUnique({ where: { clerkId } });

    // If user not found, create one
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId,
          name: user.firstName + (user.lastName ? " " + user.lastName : ""),
          email: user.emailAddresses[0]?.emailAddress || `no-email-${clerkId}@example.com`,
          role: "SELLER", // or "USER" if you prefer
        },
      });
    }

    const contentType = req.headers.get("content-type") || "";

    // ===== Case 1: JSON request =====
    if (contentType.includes("application/json")) {
      const data = await req.json();

      if (!data.name || !data.price || !data.categoryId) {
        return NextResponse.json(
          { error: "Missing required fields: name, price, or categoryId" },
          { status: 400 }
        );
      }

      const imageUrl = data.imageUrl?.trim() || null;

      const item = await prisma.item.create({
        data: {
          name: data.name,
          description: data.description || null,
          price: parseFloat(data.price),
          tax: data.gst ? parseFloat(data.gst) : null,
          discount: data.otherTax ? parseFloat(data.otherTax) : null,
          stock: data.openingStock ? parseInt(data.openingStock) : null,
          variants: data.itemUnit ? JSON.stringify({ unit: data.itemUnit }) : null,
          imageUrl,
          user: { connect: { id: dbUser.id } },
          category: { connect: { id: data.categoryId } },
        },
      });

      return NextResponse.json(item, { status: 201 });
    }

    // ===== Case 2: multipart/form-data =====
    return new Promise((resolve, reject) => {
      const headers: Record<string, string> = {};
      req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

      if (!headers["content-type"]?.includes("multipart/form-data")) {
        return reject(
          NextResponse.json(
            { error: `Unsupported content type: ${headers["content-type"]}` },
            { status: 400 }
          )
        );
      }

      const busboy = new Busboy({ headers });
      const fields: Record<string, any> = {};
      const fileUploadPromises: Promise<any>[] = [];

      busboy.on("file", (_name, file) => {
        const uploadPromise = new Promise((res, rej) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { upload_preset: "mybillingmenu" },
            (error, result) => {
              if (error) return rej(error);
              if (!result?.secure_url) return rej(new Error("No image URL returned from Cloudinary"));
              res(result.secure_url);
            }
          );
          file.pipe(uploadStream);
        });
        fileUploadPromises.push(uploadPromise);
      });

      busboy.on("field", (name, value) => {
        fields[name] = value;
      });

      busboy.on("finish", async () => {
        try {
          if (!fields.name || !fields.price || !fields.categoryId) {
            return reject(
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
              price: parseFloat(fields.price),
              tax: fields.gst ? parseFloat(fields.gst) : null,
              discount: fields.otherTax ? parseFloat(fields.otherTax) : null,
              stock: fields.openingStock ? parseInt(fields.openingStock) : null,
              variants: fields.itemUnit ? JSON.stringify({ unit: fields.itemUnit }) : null,
              imageUrl,
              user: { connect: { id: dbUser.id } },
              category: { connect: { id: fields.categoryId } },
            },
          });

          resolve(NextResponse.json(item, { status: 201 }));
        } catch (err: any) {
          reject(NextResponse.json({ error: err.message }, { status: 500 }));
        }
      });

      const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
      nodeStream.pipe(busboy);
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}





// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import Busboy from "busboy";
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
//     const { userId } = auth(); // ✅ Clerk-authenticated user
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const contentType = req.headers.get("content-type") || "";

//     // ===== Case 1: JSON request =====
//     if (contentType.includes("application/json")) {
//       const data = await req.json();
//       console.log("Received JSON data:", data);

//       if (!data.name || !data.price || !data.categoryId) {
//         return NextResponse.json(
//           { error: "Missing required fields: name, price, or categoryId" },
//           { status: 400 }
//         );
//       }

//       const imageUrl =
//         data.imageUrl && data.imageUrl.trim() !== "" ? data.imageUrl : null;

//       const item = await prisma.item.create({
//         data: {
//           name: data.name,
//           description: data.description || null,
//           price: parseFloat(data.price),
//           tax: data.gst ? parseFloat(data.gst) : null,
//           discount: data.otherTax ? parseFloat(data.otherTax) : null,
//           stock: data.openingStock ? parseInt(data.openingStock) : null,
//           variants: data.itemUnit ? JSON.stringify({ unit: data.itemUnit }) : null,
//           imageUrl,
//           user: { connect: { clerkId: userId } }, // ✅ connect user via Clerk ID
//           category: { connect: { id: data.categoryId } }, // ✅ connect category
//         },
//       });

//       console.log("✅ Item created in MongoDB:", item);
//       return NextResponse.json(item, { status: 201 });
//     }

//     // ===== Case 2: multipart/form-data =====
//     return new Promise((resolve, reject) => {
//       const headers: Record<string, string> = {};
//       req.headers.forEach((value, key) => (headers[key.toLowerCase()] = value));

//       if (!headers["content-type"]?.includes("multipart/form-data")) {
//         return reject(
//           NextResponse.json(
//             { error: `Unsupported content type: ${headers["content-type"]}` },
//             { status: 400 }
//           )
//         );
//       }

//       const busboy = new Busboy({ headers });
//       const fields: Record<string, any> = {};
//       const fileUploadPromises: Promise<any>[] = [];

//       busboy.on("file", (_name, file) => {
//         const uploadPromise = new Promise((res, rej) => {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             { upload_preset: "mybillingmenu" },
//             (error, result) => {
//               if (error) return rej(error);
//               if (!result?.secure_url) return rej(new Error("No image URL returned from Cloudinary"));
//               res(result.secure_url);
//             }
//           );
//           file.pipe(uploadStream);
//         });
//         fileUploadPromises.push(uploadPromise);
//       });

//       busboy.on("field", (name, value) => {
//         fields[name] = value;
//       });

//       busboy.on("finish", async () => {
//         try {
//           if (!fields.name || !fields.price || !fields.categoryId) {
//             return reject(
//               NextResponse.json(
//                 { error: "Missing required fields: name, price, or categoryId" },
//                 { status: 400 }
//               )
//             );
//           }

//           let imageUrl: string | null = null;
//           if (fileUploadPromises.length > 0) {
//             const uploadedResults = await Promise.all(fileUploadPromises);
//             imageUrl = uploadedResults[0] || null;
//           }

//           const item = await prisma.item.create({
//             data: {
//               name: fields.name,
//               description: fields.description || null,
//               price: parseFloat(fields.price),
//               tax: fields.gst ? parseFloat(fields.gst) : null,
//               discount: fields.otherTax ? parseFloat(fields.otherTax) : null,
//               stock: fields.openingStock ? parseInt(fields.openingStock) : null,
//               variants: fields.itemUnit ? JSON.stringify({ unit: fields.itemUnit }) : null,
//               imageUrl,
//               user: { connect: { clerkId: userId } },
//               category: { connect: { id: fields.categoryId } },
//             },
//           });

//           resolve(NextResponse.json(item, { status: 201 }));
//         } catch (err: any) {
//           reject(NextResponse.json({ error: err.message }, { status: 500 }));
//         }
//       });

//       const nodeStream = toNodeReadable(req.body as ReadableStream<Uint8Array>);
//       nodeStream.pipe(busboy);
//     });
//   } catch (err: any) {
//     console.error("❌ POST error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
