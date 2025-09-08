"use client";
import { useState } from "react";

interface FileUploadProps {
  label: string;
}

export default function FileUpload({ label }: FileUploadProps) {
  const [image, setImage] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>
      <div className="w-full h-24 border rounded-lg flex items-center justify-center bg-gray-50">
        {image ? (
          <img src={image} alt={label} className="h-24 object-contain" />
        ) : (
          <span className="text-gray-400">Upload {label}</span>
        )}
        <input type="file" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}
