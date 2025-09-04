// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import prisma from "../../..//utils/prismaClient";

// // Configure Cloudinary with environment variables
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     // Extract form fields
//     const name = formData.get("name") as string;
//     const description = (formData.get("description") as string) || null;
//     const price = formData.get("price") as string;
//     const tax = formData.get("tax") as string | null;
//     const discount = formData.get("discount") as string | null;
//     const stock = formData.get("stock") as string | null;
//     const categoryId = formData.get("categoryId") as string;
//     const imageFile = formData.get("image") as File | null;

//     // ✅ Validate required fields
//     if (!name || !price || !categoryId) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     let image: string | null = null;

//     // ✅ Upload image to Cloudinary if provided
//     if (imageFile) {
//       const arrayBuffer = await imageFile.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const result: any = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ folder: "ecom_items" }, (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           })
//           .end(buffer);
//       });

//       image = result.secure_url;
//     }

//     // ✅ Save item into MongoDB using Prisma
//     const newItem = await prisma.item.create({
//       data: {
//         name,
//         description,
//         price: parseFloat(price),
//         tax: tax ? parseFloat(tax) : null,
//         discount: discount ? parseFloat(discount) : null,
//         stock: stock ? parseInt(stock) : null,
//         categoryId,
//         image, // ✅ matches schema field
//       },
//     });

//     return NextResponse.json(
//       { message: "Item created successfully", item: newItem },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating item:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }












// import { NextResponse } from "next/server";
// import prisma from "@/utils/prismaClient";

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     console.log("📦 Incoming item data:", data); // 👈 debug log

//     const {
//       name,
//       description,
//       price,
//       tax,
//       discount,
//       stock,
//       categoryId,
//       image,
//     } = data;

//     if (!name || !price || !categoryId) {
//       return NextResponse.json(
//         { message: "Missing required fields", received: { name, price, categoryId } },
//         { status: 400 }
//       );
//     }

//     const newItem = await prisma.item.create({
//       data: {
//         name,
//         description: description || null,
//         price: parseFloat(price),
//         tax: tax ? parseFloat(tax) : null,
//         discount: discount ? parseFloat(discount) : null,
//         stock: stock ? parseInt(stock) : null,
//         categoryId,
//         image: image || null,
//       },
//     });

//     return NextResponse.json(
//       { message: "Item created successfully", item: newItem },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("❌ Error creating item:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }














// import { NextResponse } from "next/server";
// import prisma from "@/utils/prismaClient";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("📦 Incoming item payload:", body);

//     const {
//       name,
//       price,
//       description,
//       tax,
//       discount,
//       stock,
//       categoryId,
//       imageUrl,   // 👈 this is mapped to `image` in DB
//       variants,
//     } = body;

//     // ✅ Validate required fields
//     if (!name || !price || !categoryId) {
//       console.warn("⚠️ Missing required fields:", { name, price, categoryId });
//       return NextResponse.json(
//         {
//           message: "Missing required fields: name, price, categoryId",
//           received: { name, price, categoryId },
//         },
//         { status: 400 }
//       );
//     }

//     // ✅ Parse numeric fields safely
//     const parsedPrice = parseFloat(price);
//     if (isNaN(parsedPrice)) {
//       return NextResponse.json(
//         { message: "Invalid price value" },
//         { status: 400 }
//       );
//     }

//     const newItem = await prisma.item.create({
//       data: {
//         name,
//         description: description || null,
//         price: parsedPrice,
//         tax: tax ? parseFloat(tax) : null,
//         discount: discount ? parseFloat(discount) : null,
//         stock: stock ? parseInt(stock) : null,
//         categoryId,
//         imageUrl: imageUrl || null, // ✅ correct field name
//         variants: variants || null,
//       },
//     });

//     console.log("✅ Item created:", newItem);

//     return NextResponse.json(
//       { message: "Item created successfully", item: newItem },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("❌ Error creating item:", error.message, error.stack);
//     return NextResponse.json(
//       { message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
















import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import Busboy from "busboy";

export async function POST(req: Request) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    const fields: any = {};
    let fileUploadPromise: Promise<any> | null = null;

    // Handle file upload
    busboy.on("file", (name, file, info) => {
      // upload stream to cloudinary
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

    // Handle text fields
    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    // After everything finishes
    busboy.on("finish", async () => {
      try {
        let imageUrl: string | null = null;

        // Wait for file upload
        if (fileUploadPromise) {
          const uploaded: any = await fileUploadPromise;
          imageUrl = uploaded.secure_url;
        }

        // Save item to Prisma DB
        const item = await prisma.item.create({
          data: {
            name: fields.name,
            description: fields.description || null,
            price: parseFloat(fields.price),
            categoryId: fields.categoryId,
            imageUrl, // ✅ saved Cloudinary link
          },
        });

        resolve(NextResponse.json(item, { status: 201 }));
      } catch (err: any) {
        reject(NextResponse.json({ error: err.message }, { status: 500 }));
      }
    });

    // Pipe request body to busboy
     // @ts-ignore – because Next.js Request.body is ReadableStream, not Node stream
    req.body?.pipe(busboy);
  });
}
