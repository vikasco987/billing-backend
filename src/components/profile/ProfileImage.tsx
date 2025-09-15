// "use client";
// import { useState } from "react";
// import { Camera } from "lucide-react"; // optional icon

// export default function ProfileImage() {
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfileImage(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md">
//       {/* Profile Image */}
//       <div className="relative">
//         <img
//           src={profileImage || "https://via.placeholder.com/100"}
//           alt="Profile"
//           className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow"
//         />
//         <label className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 transition text-white px-3 py-1 rounded-lg cursor-pointer text-sm flex items-center gap-1">
//           <Camera size={14} /> Change
//           <input type="file" className="hidden" onChange={handleImageUpload} />
//         </label>
//       </div>

//       {/* Buttons */}
//       <button className="mt-4 text-purple-700 font-semibold hover:underline">
//         Switch Profile
//       </button>
//       <button className="mt-2 bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-lg shadow">
//         + Add New Profile
//       </button>
//     </div>
//   );
// }















"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

interface ProfileImageProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function ProfileImage({ value, onChange }: ProfileImageProps) {
  const [profileImage, setProfileImage] = useState<string | null>(value);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview locally
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
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
        setProfileImage(data.secure_url);
        onChange(data.secure_url); // update parent form
      } else {
        console.error("Upload failed:", data.error);
        onChange(null);
      }
    } catch (err) {
      console.error("Error uploading profile image:", err);
      onChange(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md">
      {/* Profile Image */}
      <div className="relative">
        <img
          src={profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow"
        />
        <label className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 transition text-white px-3 py-1 rounded-lg cursor-pointer text-sm flex items-center gap-1">
          <Camera size={14} /> {uploading ? "Uploading..." : "Change"}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Buttons */}
      <button className="mt-4 text-purple-700 font-semibold hover:underline">
        Switch Profile
      </button>
      <button className="mt-2 bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-lg shadow">
        + Add New Profile
      </button>
    </div>
  );
}
