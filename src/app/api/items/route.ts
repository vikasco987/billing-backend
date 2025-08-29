// // src/app/api/items/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../:/lib/prisma";
// import { v2 as cloudinary } from "cloudinary";

// // ✅ Cloudinary config (you can also move this to lib/cloudinary.ts)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // ✅ GET all items
// export async function GET() {
//   try {
//     const items = await prisma.item.findMany({
//       include: { category: true },
//     });
//     return NextResponse.json(items);
//   } catch (error) {
//     console.error("GET /api/items error:", error);
//     return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
//   }
// }

// // ✅ POST create item (with image upload to Cloudinary)
// export async function POST(req: NextRequest) {
//   try {
//     // Parse multipart form-data instead of JSON
//     const formData = await req.formData();

//     const name = formData.get("name") as string;
//     const description = formData.get("description") as string;
//     const price = parseFloat(formData.get("price") as string);
//     const tax = formData.get("tax") ? parseFloat(formData.get("tax") as string) : null;
//     const discount = formData.get("discount") ? parseFloat(formData.get("discount") as string) : null;
//     const stock = formData.get("stock") ? parseInt(formData.get("stock") as string) : 0;
//     const variants = formData.get("variants") as string | null;
//     const categoryId = formData.get("categoryId") as string;

//     // ✅ Image upload to Cloudinary
//     let imageUrl: string | null = null;
//     const file = formData.get("image") as File | null;
//     if (file) {
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       const uploadResult = await new Promise<any>((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ folder: "items" }, (err, result) => {
//             if (err) reject(err);
//             else resolve(result);
//           })
//           .end(buffer);
//       });

//       imageUrl = uploadResult.secure_url;
//     }

//     // ✅ Save to MongoDB (Prisma)
//     const item = await prisma.item.create({
//       data: {
//         name,
//         description,
//         price,
//         tax,
//         discount,
//         stock,
//         variants,
//         categoryId,
//         image: imageUrl, // ⚡ make sure your Prisma schema has this field
//       },
//     });

//     return NextResponse.json(item);
//   } catch (error) {
//     console.error("POST /api/items error:", error);
//     return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
//   }
// }












import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/utils/prismaClient";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;
    const price = formData.get("price") as string;
    const tax = formData.get("tax") as string | null;
    const discount = formData.get("discount") as string | null;
    const stock = formData.get("stock") as string | null;
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("image") as File | null;
    
    // Validate required fields
    if (!name || !price || !categoryId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = null;

    // Upload image to Cloudinary if it exists
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "ecom_items" }, (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          })
          .end(buffer);
      });
      imageUrl = (result as { secure_url: string }).secure_url;
    }

    // Save the item data in the database
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        tax: tax ? parseFloat(tax) : 0,
        discount: discount ? parseFloat(discount) : 0,
        stock: stock ? parseInt(stock) : 0,
        categoryId,
        imageUrl,
      },
    });

    return NextResponse.json({ message: "Item created successfully", item: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}