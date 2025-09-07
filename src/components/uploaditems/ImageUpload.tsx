// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: File | null;
//   setImage: (file: File | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setImage(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex justify-center"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//         />
//         {image ? (
//           <span className="text-xs text-gray-800 font-medium text-center p-2">
//             {image.name}
//           </span>
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }









// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: File | null;
//   setImage: (file: File | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setImage(e.dataTransfer.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!image) return;

//     const formData = new FormData();
//     formData.append("file", image);

//     try {
//       setUploading(true);
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData, // ✅ don't set headers manually
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("❌ Upload failed:", data.error);
//         alert("Upload failed: " + data.error);
//         return;
//       }

//       setUploadedUrl(data.url);
//       console.log("✅ Uploaded:", data.url);
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//         />
//         {image ? (
//           <span className="text-xs text-gray-800 font-medium text-center p-2">
//             {image.name}
//           </span>
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>

//       {/* Upload button */}
//       {image && (
//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition disabled:opacity-50"
//         >
//           {uploading ? "Uploading..." : "Upload"}
//         </button>
//       )}

//       {/* Show preview after upload */}
//       {uploadedUrl && (
//         <div className="mt-4">
//           <img
//             src={uploadedUrl}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//           <p className="text-xs text-gray-600 mt-2 break-all">{uploadedUrl}</p>
//         </div>
//       )}
//     </motion.div>
//   );
// }





// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: File | null;
//   setImage: (file: File | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

//   const handleFileSelect = async (file: File) => {
//     setImage(file);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "mybillingmenu"); // 🔑 unsigned preset

//     try {
//       setUploading(true);
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("❌ Upload failed:", data.error?.message || data);
//         alert("Upload failed: " + (data.error?.message || "Unknown error"));
//         return;
//       }

//       setUploadedUrl(data.secure_url);
//       console.log("✅ Uploaded:", data.secure_url);

//       // Replace File with Cloudinary URL for saving in DB
//       setImage(new File([file], data.secure_url)); 
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />
//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : uploadedUrl ? (
//           <img
//             src={uploadedUrl}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }






// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: string | null; // ✅ store Cloudinary URL, not File
//   setImage: (url: string | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleFileSelect = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "mybillingmenu"); // 🔑 unsigned preset

//     try {
//       setUploading(true);
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("❌ Upload failed:", data.error?.message || data);
//         alert("Upload failed: " + (data.error?.message || "Unknown error"));
//         return;
//       }

//       console.log("✅ Uploaded:", data.secure_url);
//       setImage(data.secure_url); // ✅ Save Cloudinary URL directly
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />
//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }






// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: string | null; // Cloudinary URL
//   setImage: (url: string | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleFileSelect = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "mybillingmenu"); // unsigned preset

//     try {
//       setUploading(true);
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/digpvlfup/image/upload`, // use your real cloud name
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("❌ Upload failed:", data.error?.message || data);
//         alert("Upload failed: " + (data.error?.message || "Unknown error"));
//         return;
//       }

//       console.log("✅ Uploaded:", data.secure_url);
//       setImage(data.secure_url); // store URL
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />
//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }






// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: string | null; // Cloudinary URL
//   setImage: (url: string | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleFileSelect = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "mybillingmenu"); // unsigned preset name

//     try {
//       setUploading(true);

//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/digpvlfup/image/upload", // ✅ correct cloud name
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       // 🔎 Read raw response (debugging Cloudinary errors)
//       const text = await res.text();
//       console.log("📦 Cloudinary raw response:", text);

//       let data: any;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         alert("❌ Cloudinary did not return JSON. Check preset or cloud name.");
//         return;
//       }

//       if (!res.ok) {
//         console.error("❌ Upload failed:", data.error?.message || data);
//         alert("Upload failed: " + (data.error?.message || "Unknown error"));
//         return;
//       }

//       console.log("✅ Uploaded:", data.secure_url);
//       setImage(data.secure_url); // save Cloudinary URL
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />
//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }






// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: string | null; // store Cloudinary URL
//   setImage: (url: string | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleFileSelect = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "mybillingmenu"); // 🔑 unsigned preset

//     try {
//       setUploading(true);

//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/digpvlfup/auto/upload", // same as curl test
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("❌ Upload failed:", data.error?.message || data);
//         alert("Upload failed: " + (data.error?.message || "Unknown error"));
//         return;
//       }

//       console.log("✅ Uploaded:", data.secure_url);
//       setImage(data.secure_url); // store URL
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />
//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }


























// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: string | null; // store Cloudinary URL
//   setImage: (url: string | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // ✅ Updated: send file to backend API, not directly to Cloudinary
//   const handleFileSelect = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setUploading(true);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert("Upload failed: " + (data.error || "Unknown error"));
//         return;
//       }

//       console.log("✅ Uploaded URL:", data.url);
//       setImage(data.url); // store URL in state
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />
//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }


















// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: string | null; // store Cloudinary URL
//   setImage: (url: string | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // ✅ Upload file to backend API, get Cloudinary URL
//   const handleFileSelect = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setUploading(true);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       // always parse JSON
//       const data = await res.json();

//       if (!res.ok) {
//         console.error("❌ Upload failed:", data.error || data);
//         alert("Upload failed: " + (data.error || "Unknown error"));
//         return;
//       }

//       console.log("✅ Uploaded URL:", data.url || data.secure_url);
//       // store URL in state so it can be saved to MongoDB
//       setImage(data.url || data.secure_url);
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />
//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }



// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// interface ImageUploadProps {
//   image: string | null; // store Cloudinary URL
//   setImage: (url: string | null) => void;
// }

// export default function ImageUpload({ image, setImage }: ImageUploadProps) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // ✅ Upload file to backend API and get Cloudinary URL
//   const handleFileSelect = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setUploading(true);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         console.error("❌ Upload failed:", data.error || data);
//         alert("Upload failed: " + (data.error || "Unknown error"));
//         return;
//       }

//       // ✅ Save Cloudinary URL in state so /api/items can store it in MongoDB
//       const uploadedUrl = data.secure_url || data.url;
//       console.log("✅ Uploaded URL:", uploadedUrl);
//       setImage(uploadedUrl);
//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />

//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }





// "use client";
// import { Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ImageUpload({
//   image,
//   setImage,
// }: {
//   image: string | null; // store Cloudinary URL
//   setImage: (url: string | null) => void;
// }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleFileSelect = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setUploading(true);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert("Upload failed: " + (data.error || "Unknown error"));
//         return;
//       }

//       // ✅ Store uploaded Cloudinary URL in state
//       setImage(data.secure_url || data.url || null);
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Something went wrong during upload!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       className="mb-6 flex flex-col items-center gap-4"
//     >
//       <label
//         htmlFor="fileUpload"
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//         className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//           isDragging
//             ? "border-purple-500 bg-purple-100"
//             : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//         }`}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           id="fileUpload"
//           onChange={(e) => {
//             if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
//           }}
//         />
//         {uploading ? (
//           <span className="text-sm text-purple-600 font-semibold">
//             Uploading...
//           </span>
//         ) : image ? (
//           <img
//             src={image}
//             alt="Uploaded"
//             className="w-40 h-40 rounded-lg object-cover shadow-md"
//           />
//         ) : (
//           <>
//             <Upload className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-purple-700 font-semibold">
//               Drag & Drop or Click
//             </span>
//           </>
//         )}
//       </label>
//     </motion.div>
//   );
// }














"use client";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ImageUpload({
  image,
  setImage,
}: {
  image: string | null; // store Cloudinary URL
  setImage: (url: string | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 🔹 Load saved image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) setImage(savedImage);
  }, [setImage]);

  const handleFileSelect = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Upload failed: " + (data.error || "Unknown error"));
        return;
      }

      const url = data.secure_url || data.url || null;

      // ✅ Save in state
      setImage(url);

      // ✅ Save in localStorage
      if (url) localStorage.setItem("uploadedImage", url);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload!");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="mb-6 flex flex-col items-center gap-4"
    >
      <label
        htmlFor="fileUpload"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
          isDragging
            ? "border-purple-500 bg-purple-100"
            : "border-purple-300 bg-purple-50 hover:bg-purple-100"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="fileUpload"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
          }}
        />
        {uploading ? (
          <span className="text-sm text-purple-600 font-semibold">
            Uploading...
          </span>
        ) : image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-40 h-40 rounded-lg object-cover shadow-md"
          />
        ) : (
          <>
            <Upload className="w-8 h-8 text-purple-500 mb-2" />
            <span className="text-sm text-purple-700 font-semibold">
              Drag & Drop or Click
            </span>
          </>
        )}
      </label>
    </motion.div>
  );
}
