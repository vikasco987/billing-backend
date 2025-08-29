// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Upload } from "lucide-react";

// export default function UploadItemPage() {
//   const [image, setImage] = useState<File | null>(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
//       <motion.div
//         className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           ➕ New Item
//         </h1>

//         {/* Image Upload */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className="mb-6 flex justify-center"
//         >
//           <label
//             htmlFor="fileUpload"
//             className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer bg-purple-50 hover:bg-purple-100 transition"
//           >
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="fileUpload"
//               onChange={(e) => setImage(e.target.files?.[0] || null)}
//             />
//             {image ? (
//               <span className="text-xs text-gray-700 font-medium text-center p-2">
//                 {image.name}
//               </span>
//             ) : (
//               <>
//                 <Upload className="w-8 h-8 text-purple-500 mb-2" />
//                 <span className="text-sm text-purple-700 font-semibold">
//                   Upload Image
//                 </span>
//               </>
//             )}
//           </label>
//         </motion.div>

//         {/* Product/Service Name */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Product/Service Name *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//         </div>

//         {/* Sell Price + Item Unit */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="number"
//             placeholder="Sell Price *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//           <select className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800">
//             <option>Item Unit</option>
//             <option>Piece</option>
//             <option>Kg</option>
//             <option>Litre</option>
//             <option>Pack</option>
//           </select>
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <select className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800">
//             <option>Select Item Category</option>
//             <option>Food</option>
//             <option>Drinks</option>
//             <option>Snacks</option>
//             <option>Services</option>
//           </select>
//         </div>

//         {/* MRP + Purchase Price */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <input
//             type="number"
//             placeholder="MRP"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//           />
//           <input
//             type="number"
//             placeholder="Purchase Price"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//           />
//         </div>

//         {/* Optional Sections */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="space-y-3 mb-6"
//         >
//           {[
//             "GST and Tax (Optional)",
//             "Product Details (Optional)",
//             "Inventory Details (Optional)",
//             "Product Display (Optional)",
//           ].map((label, idx) => (
//             <motion.button
//               key={idx}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               {label}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Save Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
//         >
//           SAVE
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }












// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Upload } from "lucide-react";

// export default function UploadItemPage() {
//   const [image, setImage] = useState<File | null>(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
//       <motion.div
//         className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           ➕ New Item
//         </h1>

//         {/* Image Upload */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className="mb-6 flex justify-center"
//         >
//           <label
//             htmlFor="fileUpload"
//             className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer bg-purple-50 hover:bg-purple-100 transition"
//           >
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="fileUpload"
//               onChange={(e) => setImage(e.target.files?.[0] || null)}
//             />
//             {image ? (
//               <span className="text-xs text-gray-700 font-medium text-center p-2">
//                 {image.name}
//               </span>
//             ) : (
//               <>
//                 <Upload className="w-8 h-8 text-purple-500 mb-2" />
//                 <span className="text-sm text-purple-700 font-semibold">
//                   Upload Image
//                 </span>
//               </>
//             )}
//           </label>
//         </motion.div>

//         {/* Product/Service Name */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Product/Service Name *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//         </div>

//         {/* Sell Price + Item Unit */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="number"
//             placeholder="Sell Price *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//           <select className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800">
//             <option>Item Unit</option>
//             <option>Piece</option>
//             <option>Kg</option>
//             <option>Litre</option>
//             <option>Pack</option>
//           </select>
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Enter Item Category *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//         </div>

//         {/* MRP + Purchase Price */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <input
//             type="number"
//             placeholder="MRP"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//           />
//           <input
//             type="number"
//             placeholder="Purchase Price"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//           />
//         </div>

//         {/* Optional Sections */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="space-y-3 mb-6"
//         >
//           {[
//             "GST and Tax (Optional)",
//             "Product Details (Optional)",
//             "Inventory Details (Optional)",
//             "Product Display (Optional)",
//           ].map((label, idx) => (
//             <motion.button
//               key={idx}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               {label}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Save Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
//         >
//           SAVE
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }














// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Upload } from "lucide-react";

// export default function UploadItemPage() {
//   const [image, setImage] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setImage(e.dataTransfer.files[0]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
//       <motion.div
//         className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           ➕ New Item
//         </h1>

//         {/* Image Upload with Drag & Drop */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className="mb-6 flex justify-center"
//         >
//           <label
//             htmlFor="fileUpload"
//             onDragOver={(e) => {
//               e.preventDefault();
//               setIsDragging(true);
//             }}
//             onDragLeave={() => setIsDragging(false)}
//             onDrop={handleDrop}
//             className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//               isDragging
//                 ? "border-purple-500 bg-purple-100"
//                 : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//             }`}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="fileUpload"
//               onChange={(e) => setImage(e.target.files?.[0] || null)}
//             />
//             {image ? (
//               <span className="text-xs text-gray-700 font-medium text-center p-2">
//                 {image.name}
//               </span>
//             ) : (
//               <>
//                 <Upload className="w-8 h-8 text-purple-500 mb-2" />
//                 <span className="text-sm text-purple-700 font-semibold">
//                   Drag & Drop or Click
//                 </span>
//               </>
//             )}
//           </label>
//         </motion.div>

//         {/* Product/Service Name */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Product/Service Name *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//         </div>

//         {/* Sell Price + Item Unit */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="number"
//             placeholder="Sell Price *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//           <select className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800">
//             <option>Item Unit</option>
//             <option>Piece</option>
//             <option>Kg</option>
//             <option>Litre</option>
//             <option>Pack</option>
//           </select>
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Enter Item Category *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//         </div>

//         {/* MRP + Purchase Price */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <input
//             type="number"
//             placeholder="MRP"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//           />
//           <input
//             type="number"
//             placeholder="Purchase Price"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//           />
//         </div>

//         {/* Optional Sections */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="space-y-3 mb-6"
//         >
//           {[
//             "GST and Tax (Optional)",
//             "Product Details (Optional)",
//             "Inventory Details (Optional)",
//             "Product Display (Optional)",
//           ].map((label, idx) => (
//             <motion.button
//               key={idx}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               {label}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Save Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
//         >
//           SAVE
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }
















// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Upload, ChevronDown, ChevronUp } from "lucide-react";

// export default function UploadItemPage() {
//   const [image, setImage] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [openSection, setOpenSection] = useState<string | null>(null);

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setImage(e.dataTransfer.files[0]);
//     }
//   };

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
//       <motion.div
//         className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           ➕ New Item
//         </h1>

//         {/* Image Upload with Drag & Drop */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className="mb-6 flex justify-center"
//         >
//           <label
//             htmlFor="fileUpload"
//             onDragOver={(e) => {
//               e.preventDefault();
//               setIsDragging(true);
//             }}
//             onDragLeave={() => setIsDragging(false)}
//             onDrop={handleDrop}
//             className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//               isDragging
//                 ? "border-purple-500 bg-purple-100"
//                 : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//             }`}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="fileUpload"
//               onChange={(e) => setImage(e.target.files?.[0] || null)}
//             />
//             {image ? (
//               <span className="text-xs text-gray-700 font-medium text-center p-2">
//                 {image.name}
//               </span>
//             ) : (
//               <>
//                 <Upload className="w-8 h-8 text-purple-500 mb-2" />
//                 <span className="text-sm text-purple-700 font-semibold">
//                   Drag & Drop or Click
//                 </span>
//               </>
//             )}
//           </label>
//         </motion.div>

//         {/* Product/Service Name */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Product/Service Name *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//         </div>

//         {/* Sell Price + Item Unit */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="number"
//             placeholder="Sell Price *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//           <select className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800">
//             <option>Item Unit</option>
//             <option>Piece</option>
//             <option>Kg</option>
//             <option>Litre</option>
//             <option>Pack</option>
//           </select>
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Enter Item Category *"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//             required
//           />
//         </div>

//         {/* MRP + Purchase Price */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <input
//             type="number"
//             placeholder="MRP"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//           />
//           <input
//             type="number"
//             placeholder="Purchase Price"
//             className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50 text-gray-800"
//           />
//         </div>

//         {/* Expandable Optional Sections */}
//         <div className="space-y-4 mb-6">
//           {/* GST Section */}
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleSection("gst")}
//               className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               GST and Tax (Optional)
//               {openSection === "gst" ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openSection === "gst" && (
//               <div className="mt-3 space-y-3">
//                 <input
//                   type="number"
//                   placeholder="GST %"
//                   className="w-full border rounded-lg px-4 py-2"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Other Tax %"
//                   className="w-full border rounded-lg px-4 py-2"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Product Details Section */}
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleSection("details")}
//               className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               Product Details (Optional)
//               {openSection === "details" ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openSection === "details" && (
//               <div className="mt-3 space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Brand"
//                   className="w-full border rounded-lg px-4 py-2"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Model/Size/Color"
//                   className="w-full border rounded-lg px-4 py-2"
//                 />
//                 <textarea
//                   placeholder="Description"
//                   className="w-full border rounded-lg px-4 py-2"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Inventory Section */}
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleSection("inventory")}
//               className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               Inventory Details (Optional)
//               {openSection === "inventory" ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openSection === "inventory" && (
//               <div className="mt-3 space-y-3">
//                 <input
//                   type="number"
//                   placeholder="Opening Stock"
//                   className="w-full border rounded-lg px-4 py-2"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Reorder Level"
//                   className="w-full border rounded-lg px-4 py-2"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Product Display Section */}
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleSection("display")}
//               className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               Product Display (Optional)
//               {openSection === "display" ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openSection === "display" && (
//               <div className="mt-3 space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Display Category"
//                   className="w-full border rounded-lg px-4 py-2"
//                 />
//                 <input
//                   type="color"
//                   className="w-full border rounded-lg px-4 py-2 h-12"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Save Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
//         >
//           SAVE
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }















// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Upload, ChevronDown, ChevronUp } from "lucide-react";

// export default function UploadItemPage() {
//   const [image, setImage] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [openSection, setOpenSection] = useState<string | null>(null);

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setImage(e.dataTransfer.files[0]);
//     }
//   };

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
//       <motion.div
//         className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           ➕ New Item
//         </h1>

//         {/* Image Upload with Drag & Drop */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className="mb-6 flex justify-center"
//         >
//           <label
//             htmlFor="fileUpload"
//             onDragOver={(e) => {
//               e.preventDefault();
//               setIsDragging(true);
//             }}
//             onDragLeave={() => setIsDragging(false)}
//             onDrop={handleDrop}
//             className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
//               isDragging
//                 ? "border-purple-500 bg-purple-100"
//                 : "border-purple-300 bg-purple-50 hover:bg-purple-100"
//             }`}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="fileUpload"
//               onChange={(e) => setImage(e.target.files?.[0] || null)}
//             />
//             {image ? (
//               <span className="text-xs text-gray-800 font-medium text-center p-2">
//                 {image.name}
//               </span>
//             ) : (
//               <>
//                 <Upload className="w-8 h-8 text-purple-500 mb-2" />
//                 <span className="text-sm text-purple-700 font-semibold">
//                   Drag & Drop or Click
//                 </span>
//               </>
//             )}
//           </label>
//         </motion.div>

//         {/* Product/Service Name */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Product/Service Name *"
//             className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
//             required
//           />
//         </div>

//         {/* Sell Price + Item Unit */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="number"
//             placeholder="Sell Price *"
//             className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
//             required
//           />
//           <select className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50">
//             <option value="">Item Unit</option>
//             <option>Piece</option>
//             <option>Kg</option>
//             <option>Litre</option>
//             <option>Pack</option>
//           </select>
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Enter Item Category *"
//             className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
//             required
//           />
//         </div>

//         {/* MRP + Purchase Price */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <input
//             type="number"
//             placeholder="MRP"
//             className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
//           />
//           <input
//             type="number"
//             placeholder="Purchase Price"
//             className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
//           />
//         </div>

//         {/* Expandable Optional Sections */}
//         <div className="space-y-4 mb-6">
//           {/* GST Section */}
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleSection("gst")}
//               className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               GST and Tax (Optional)
//               {openSection === "gst" ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openSection === "gst" && (
//               <div className="mt-3 space-y-3">
//                 <input
//                   type="number"
//                   placeholder="GST %"
//                   className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Other Tax %"
//                   className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Product Details Section */}
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleSection("details")}
//               className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               Product Details (Optional)
//               {openSection === "details" ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openSection === "details" && (
//               <div className="mt-3 space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Brand"
//                   className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Model/Size/Color"
//                   className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//                 />
//                 <textarea
//                   placeholder="Description"
//                   className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Inventory Section */}
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleSection("inventory")}
//               className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               Inventory Details (Optional)
//               {openSection === "inventory" ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openSection === "inventory" && (
//               <div className="mt-3 space-y-3">
//                 <input
//                   type="number"
//                   placeholder="Opening Stock"
//                   className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Reorder Level"
//                   className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Product Display Section */}
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleSection("display")}
//               className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
//             >
//               Product Display (Optional)
//               {openSection === "display" ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openSection === "display" && (
//               <div className="mt-3 space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Display Category"
//                   className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//                 />
//                 <input
//                   type="color"
//                   className="w-full border rounded-lg px-4 py-2 h-12"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Save Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
//         >
//           SAVE
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }















"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";

export default function UploadItemPage() {
  const [image, setImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          ➕ New Item
        </h1>

        {/* Image Upload with Drag & Drop */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mb-6 flex justify-center"
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
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            {image ? (
              <span className="text-xs text-gray-800 font-medium text-center p-2">
                {image.name}
              </span>
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

        {/* Product/Service Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product/Service Name *"
            className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            required
          />
        </div>

        {/* Sell Price + Item Unit */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            placeholder="Sell Price *"
            className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            required
          />
          <select className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50">
            <option value="">Item Unit</option>
            <option>Piece</option>
            <option>Kg</option>
            <option>Litre</option>
            <option>Pack</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Item Category *"
            className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            required
          />
        </div>

        {/* MRP + Purchase Price */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            placeholder="MRP"
            className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
          />
          <input
            type="number"
            placeholder="Purchase Price"
            className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
          />
        </div>

        {/* Expandable Optional Sections */}
        <div className="space-y-4 mb-6">
          {/* GST Section */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("gst")}
              className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
            >
              GST and Tax (Optional)
              {openSection === "gst" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSection === "gst" && (
              <div className="mt-3 space-y-3">
                <input
                  type="number"
                  placeholder="GST %"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                />
                <input
                  type="number"
                  placeholder="Other Tax %"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                />
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("details")}
              className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
            >
              Product Details (Optional)
              {openSection === "details" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSection === "details" && (
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder="Brand"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Model/Size/Color"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                />
                <textarea
                  placeholder="Description"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                />
              </div>
            )}
          </div>

          {/* Inventory Section */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("inventory")}
              className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
            >
              Inventory Details (Optional)
              {openSection === "inventory" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSection === "inventory" && (
              <div className="mt-3 space-y-3">
                <input
                  type="number"
                  placeholder="Opening Stock"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                />
                <input
                  type="number"
                  placeholder="Reorder Level"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                />
              </div>
            )}
          </div>

          {/* Product Display Section */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("display")}
              className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
            >
              Product Display (Optional)
              {openSection === "display" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSection === "display" && (
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder="Display Category"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                />
                <input
                  type="color"
                  className="w-full border rounded-lg px-4 py-2 h-12"
                />
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          SAVE
        </motion.button>
      </motion.div>
    </div>
  );
}