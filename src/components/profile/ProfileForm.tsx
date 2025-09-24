// "use client";

// import { useState } from "react";
// import ProfileImage from "./ProfileImage";
// import InputField from "./InputField";
// import SelectField from "./SelectField";
// import FileUpload from "./FileUpload";

// export default function ProfileForm() {
//   const [formData, setFormData] = useState({
//     businessType: "",
//     businessName: "",
//     businessTagline: "",
//     contactName: "",
//     contactPhone: "",
//     contactEmail: "",
//     upi: "",
//     reviewLink: "",
//     customField: "",
//     signature: null as string | null,
//     logo: null as string | null,
//     profileImageUrl: null as string | null,
//   });

//   const handleChange = (field: keyof typeof formData, value: string | null) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("✅ Form Data:", formData);

//     try {
//       const form = new FormData();

//       // Append text fields
//       form.append("businessType", formData.businessType);
//       form.append("businessName", formData.businessName);
//       form.append("businessTagline", formData.businessTagline);
//       form.append("contactName", formData.contactName);
//       form.append("contactPhone", formData.contactPhone);
//       form.append("contactEmail", formData.contactEmail);
//       form.append("upi", formData.upi);
//       form.append("reviewLink", formData.reviewLink);
//       form.append("customField", formData.customField);

//       // Append file URLs (already uploaded to Cloudinary)
//       if (formData.logo) form.append("logo", formData.logo);
//       if (formData.signature) form.append("signature", formData.signature);
//       if (formData.profileImageUrl) form.append("profileImage", formData.profileImageUrl);

//       const res = await fetch("/api/profile", {
//         method: "POST",
//         body: form, // ✅ FormData automatically sets multipart/form-data headers
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Profile saved successfully!");
//       } else {
//         alert("❌ Error: " + data.error);
//       }
//     } catch (err) {
//       console.error("Form submit error:", err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
//       {/* Profile Image */}
//       <div className="flex justify-center">
//         <ProfileImage
//           onChange={(url) => handleChange("profileImageUrl", url)}
//           value={formData.profileImageUrl}
//         />
//       </div>

//       <h2 className="text-xl font-bold text-center text-gray-800">
//         🧾 Business Profile (Bill Book)
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Business Type */}
//         <SelectField
//           label="Business Type"
//           value={formData.businessType}
//           onChange={(val) => handleChange("businessType", val)}
//         />

//         {/* Business Details */}
//         <InputField
//           placeholder="Business Name"
//           value={formData.businessName}
//           onChange={(val) => handleChange("businessName", val)}
//         />
//         <InputField
//           placeholder="Business Tag Line"
//           value={formData.businessTagline}
//           onChange={(val) => handleChange("businessTagline", val)}
//         />

//         {/* Contact Details */}
//         <InputField
//           placeholder="Contact Person Name"
//           value={formData.contactName}
//           onChange={(val) => handleChange("contactName", val)}
//         />
//         <InputField
//           placeholder="Contact Person Phone"
//           value={formData.contactPhone}
//           onChange={(val) => handleChange("contactPhone", val)}
//         />
//         <InputField
//           type="email"
//           placeholder="Contact Person Email"
//           value={formData.contactEmail}
//           onChange={(val) => handleChange("contactEmail", val)}
//         />

//         {/* Expandable Buttons */}
//         <button
//           type="button"
//           className="w-full p-3 border rounded-lg text-left text-gray-700 hover:bg-gray-50"
//         >
//           Business Details
//         </button>
//         <button
//           type="button"
//           className="w-full p-3 border rounded-lg text-left text-gray-700 hover:bg-gray-50"
//         >
//           Bank Details (Accept Online Payments)
//         </button>

//         {/* Payment + Review */}
//         <InputField
//           placeholder="UPI"
//           value={formData.upi}
//           onChange={(val) => handleChange("upi", val)}
//         />
//         <InputField
//           placeholder="Google Review Link / URL"
//           value={formData.reviewLink}
//           onChange={(val) => handleChange("reviewLink", val)}
//         />
//         <InputField
//           placeholder="Custom Fields"
//           value={formData.customField}
//           onChange={(val) => handleChange("customField", val)}
//         />

//         {/* File Uploads */}
//         <FileUpload
//           label="Signature"
//           value={formData.signature}
//           onChange={(val) => handleChange("signature", val)}
//         />
//         <FileUpload
//           label="Logo"
//           value={formData.logo}
//           onChange={(val) => handleChange("logo", val)}
//         />

//         {/* Save Button */}
//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
//         >
//           💾 Save Profile
//         </button>
//       </form>
//     </div>
//   );
// }




// "use client";

// import { useState } from "react";
// import ProfileImage from "./ProfileImage";
// import InputField from "./InputField";
// import SelectField from "./SelectField";
// import FileUpload from "./FileUpload";

// export default function ProfileForm() {
//   const [formData, setFormData] = useState({
//     businessType: "",
//     businessName: "",
//     businessTagline: "",
//     contactName: "",
//     contactPhone: "",
//     contactEmail: "",
//     upi: "",
//     reviewLink: "",
//     customField: "",
//     signature: null as string | null,
//     logo: null as string | null,
//     profileImageUrl: null as string | null,
//   });

//   const handleChange = (field: keyof typeof formData, value: string | null) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();

//       // Append text fields
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value !== null) form.append(key, value);
//       });

//       const res = await fetch("/api/profile", {
//         method: "POST",
//         body: form,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Profile saved successfully!");
//       } else {
//         alert("❌ Error: " + data.error);
//       }
//     } catch (err) {
//       console.error("Form submit error:", err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
//       <div className="flex justify-center">
//         <ProfileImage
//           value={formData.profileImageUrl}
//           onChange={(url) => handleChange("profileImageUrl", url)}
//         />
//       </div>

//       <h2 className="text-xl font-bold text-center text-gray-800">
//         🧾 Business Profile (Bill Book)
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <SelectField
//           label="Business Type"
//           value={formData.businessType}
//           onChange={(val) => handleChange("businessType", val)}
//         />

//         <InputField
//           placeholder="Business Name"
//           value={formData.businessName}
//           onChange={(val) => handleChange("businessName", val)}
//         />
//         <InputField
//           placeholder="Business Tag Line"
//           value={formData.businessTagline}
//           onChange={(val) => handleChange("businessTagline", val)}
//         />

//         <InputField
//           placeholder="Contact Person Name"
//           value={formData.contactName}
//           onChange={(val) => handleChange("contactName", val)}
//         />
//         <InputField
//           placeholder="Contact Person Phone"
//           value={formData.contactPhone}
//           onChange={(val) => handleChange("contactPhone", val)}
//         />
//         <InputField
//           type="email"
//           placeholder="Contact Person Email"
//           value={formData.contactEmail}
//           onChange={(val) => handleChange("contactEmail", val)}
//         />

//         <InputField
//           placeholder="UPI"
//           value={formData.upi}
//           onChange={(val) => handleChange("upi", val)}
//         />
//         <InputField
//           placeholder="Google Review Link / URL"
//           value={formData.reviewLink}
//           onChange={(val) => handleChange("reviewLink", val)}
//         />
//         <InputField
//           placeholder="Custom Fields"
//           value={formData.customField}
//           onChange={(val) => handleChange("customField", val)}
//         />

//         <FileUpload
//           label="Signature"
//           value={formData.signature}
//           onChange={(val) => handleChange("signature", val)}
//         />
//         <FileUpload
//           label="Logo"
//           value={formData.logo}
//           onChange={(val) => handleChange("logo", val)}
//         />

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
//         >
//           💾 Save Profile
//         </button>
//       </form>
//     </div>
//   );
// }











"use client";

import { useState } from "react";
import ProfileImage from "./ProfileImage";
import InputField from "./InputField";
import SelectField from "./SelectField";
import FileUpload from "./FileUpload";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    businessType: "",
    businessName: "",
    businessTagline: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    upi: "",
    reviewLink: "",
    customField: "",
    signature: null as string | null,
    logo: null as string | null,
    profileImageUrl: null as string | null,
  });

  const handleChange = (field: keyof typeof formData, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        businessType: formData.businessType,
        businessName: formData.businessName,
        businessTagline: formData.businessTagline,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        upi: formData.upi,
        reviewLink: formData.reviewLink,
        customField: formData.customField,
        profileImage: formData.profileImageUrl,
        logo: formData.logo,
        signature: formData.signature,
      };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Profile saved successfully!");
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Form submit error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
      <div className="flex justify-center">
        <ProfileImage
          value={formData.profileImageUrl}
          onChange={(url) => handleChange("profileImageUrl", url)}
        />
      </div>

      <h2 className="text-xl font-bold text-center text-gray-800">
        🧾 Business Profile (Bill Book)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <SelectField
          label="Business Type"
          value={formData.businessType}
          onChange={(val) => handleChange("businessType", val)}
        />

        <InputField
          placeholder="Business Name"
          value={formData.businessName}
          onChange={(val) => handleChange("businessName", val)}
        />
        <InputField
          placeholder="Business Tag Line"
          value={formData.businessTagline}
          onChange={(val) => handleChange("businessTagline", val)}
        />

        <InputField
          placeholder="Contact Person Name"
          value={formData.contactName}
          onChange={(val) => handleChange("contactName", val)}
        />
        <InputField
          placeholder="Contact Person Phone"
          value={formData.contactPhone}
          onChange={(val) => handleChange("contactPhone", val)}
        />
        <InputField
          type="email"
          placeholder="Contact Person Email"
          value={formData.contactEmail}
          onChange={(val) => handleChange("contactEmail", val)}
        />

        <InputField
          placeholder="UPI"
          value={formData.upi}
          onChange={(val) => handleChange("upi", val)}
        />
        <InputField
          placeholder="Google Review Link / URL"
          value={formData.reviewLink}
          onChange={(val) => handleChange("reviewLink", val)}
        />
        <InputField
          placeholder="Custom Fields"
          value={formData.customField}
          onChange={(val) => handleChange("customField", val)}
        />

        <FileUpload
          label="Signature"
          value={formData.signature}
          onChange={(val) => handleChange("signature", val)}
        />
        <FileUpload
          label="Logo"
          value={formData.logo}
          onChange={(val) => handleChange("logo", val)}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          💾 Save Profile
        </button>
      </form>
    </div>
  );
}
