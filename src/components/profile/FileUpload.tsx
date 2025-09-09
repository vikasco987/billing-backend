"use client";
import { useState, useEffect } from "react";

interface FileUploadProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function FileUpload({ label, value, onChange }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(value);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPreview(value); // sync with parent form state
  }, [value]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        console.log("✅ Cloudinary URL:", data.secure_url);
        onChange(data.secure_url); // update parent state
      } else {
        console.error("Upload failed:", data.error);
        onChange(null);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      onChange(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>
      <div className="w-full h-24 border rounded-lg flex items-center justify-center bg-gray-50 relative">
        {preview ? (
          <img src={preview} alt={label} className="h-24 object-contain" />
        ) : (
          <span className="text-gray-400">
            {uploading ? "Uploading..." : `Upload ${label}`}
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}
