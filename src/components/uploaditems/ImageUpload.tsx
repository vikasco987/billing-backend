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

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  return (
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
  );
}
