"use client";

import { useEffect, useState } from "react";

export default function BusinessProfileCard() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  if (!profile) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        {profile.fields.find((f: any) => f.label === "Business Name")?.value}
      </h2>
      <p className="text-gray-600 italic">
        {profile.fields.find((f: any) => f.label === "Tagline")?.value}
      </p>

      <div className="space-y-2">
        <p>
          <strong>Type:</strong>{" "}
          {profile.fields.find((f: any) => f.label === "Business Type")?.value}
        </p>
        <p>
          <strong>Contact:</strong>{" "}
          {profile.fields.find((f: any) => f.label === "Contact Person Name")?.value}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          {profile.fields.find((f: any) => f.label === "Phone")?.value}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {profile.fields.find((f: any) => f.label === "Email")?.value}
        </p>
        <p>
          <strong>UPI:</strong>{" "}
          {profile.fields.find((f: any) => f.label === "UPI")?.value}
        </p>
      </div>

      {profile.fields.find((f: any) => f.label === "Logo")?.fileUrl && (
        <img
          src={profile.fields.find((f: any) => f.label === "Logo")?.fileUrl}
          alt="Business Logo"
          className="w-32 h-32 object-contain mt-4"
        />
      )}
    </div>
  );
}
