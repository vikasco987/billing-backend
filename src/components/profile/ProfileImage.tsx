"use client";
import { useState } from "react";

export default function ProfileImage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />
        <label className="absolute -bottom-2 -right-2 bg-purple-600 text-white px-2 py-1 rounded-lg cursor-pointer text-sm">
          Change
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
      <button className="mt-2 text-purple-600 font-medium">Switch Profile</button>
      <button className="mt-1 text-white bg-purple-600 px-3 py-1 rounded-lg">
        + Add New Profile
      </button>
    </div>
  );
}
