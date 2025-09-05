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









"use client";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ImageUpload({
  image,
  setImage,
}: {
  image: File | null;
  setImage: (file: File | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      setUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData, // ✅ don't set headers manually
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("❌ Upload failed:", data.error);
        alert("Upload failed: " + data.error);
        return;
      }

      setUploadedUrl(data.url);
      console.log("✅ Uploaded:", data.url);
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Something went wrong!");
    } finally {
      setUploading(false);
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

      {/* Upload button */}
      {image && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}

      {/* Show preview after upload */}
      {uploadedUrl && (
        <div className="mt-4">
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="w-40 h-40 rounded-lg object-cover shadow-md"
          />
          <p className="text-xs text-gray-600 mt-2 break-all">{uploadedUrl}</p>
        </div>
      )}
    </motion.div>
  );
}
