







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










import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import Busboy from "busboy";
import { Readable } from "stream";

// 🔹 Helper: Convert Web ReadableStream → Node Readable (for Busboy)
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
  const contentType = req.headers.get("content-type") || "";

  // ✅ Case 1: Handle JSON request (no file upload)
  if (contentType.includes("application/json")) {
    try {
      const data = await req.json();

      const item = await prisma.item.create({
        data: {
          name: data.name,
          description: data.description || null,
          price: parseFloat(data.price),
          categoryId: data.categoryId,
          imageUrl: null, // no image
        },
      });

      return NextResponse.json(item, { status: 201 });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  // ✅ Case 2: Handle multipart/form-data (with file upload)
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    if (!headers["content-type"]?.includes("multipart/form-data")) {
      return reject(
        NextResponse.json(
          { error: `Unsupported content type: ${headers["content-type"]}` },
          { status: 400 }
        )
      );
    }

    const busboy = Busboy({ headers });
    const fields: Record<string, any> = {};
    let fileUploadPromise: Promise<any> | null = null;

    // 🔹 Handle file upload → Cloudinary
    busboy.on("file", (_name, file, _info) => {
      fileUploadPromise = new Promise((res, rej) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "items" },
          (error, result) => {
            if (error) return rej(error);
            res(result);
          }
        );
        file.pipe(uploadStream);
      });
    });

    // 🔹 Collect text fields
    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    // 🔹 After parsing finishes
    busboy.on("finish", async () => {
      try {
        let imageUrl: string | null = null;

        if (fileUploadPromise) {
          const uploaded: any = await fileUploadPromise;
          imageUrl = uploaded.secure_url;
        }

        const item = await prisma.item.create({
          data: {
            name: fields.name,
            description: fields.description || null,
            price: parseFloat(fields.price),
            categoryId: fields.categoryId,
            imageUrl,
          },
        });

        resolve(NextResponse.json(item, { status: 201 }));
      } catch (err: any) {
        reject(NextResponse.json({ error: err.message }, { status: 500 }));
      }
    });

    // 🔹 Pipe request body to busboy
    try {
      const nodeStream = toNodeReadable(
        req.body as ReadableStream<Uint8Array>
      );
      nodeStream.pipe(busboy);
    } catch (err: any) {
      reject(NextResponse.json({ error: err.message }, { status: 400 }));
    }
  });
}
