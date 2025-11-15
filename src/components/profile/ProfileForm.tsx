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
//       const payload = {
//         businessType: formData.businessType,
//         businessName: formData.businessName,
//         businessTagline: formData.businessTagline,
//         contactName: formData.contactName,
//         contactPhone: formData.contactPhone,
//         contactEmail: formData.contactEmail,
//         upi: formData.upi,
//         reviewLink: formData.reviewLink,
//         customField: formData.customField,
//         profileImage: formData.profileImageUrl,
//         logo: formData.logo,
//         signature: formData.signature,
//       };

//       const res = await fetch("/api/profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
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






// "use client";

// import { useState, useEffect } from "react";
// import ProfileImage from "./ProfileImage";
// import InputField from "./InputField";
// import SelectField from "./SelectField";
// import FileUpload from "./FileUpload";

// // Define props
// interface ProfileFormProps {
//   initialData?: Partial<{
//     businessType: string;
//     businessName: string;
//     businessTagline: string;
//     contactName: string;
//     contactPhone: string;
//     contactEmail: string;
//     upi: string;
//     reviewLink: string;
//     customField: string;
//     signature: string | null;
//     logo: string | null;
//     profileImageUrl: string | null;
//   }>;
//   onSuccess?: () => void;
// }

// export default function ProfileForm({ initialData, onSuccess }: ProfileFormProps) {
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

//   // Prefill form if initialData is provided
//   useEffect(() => {
//     if (initialData) {
//       setFormData((prev) => ({ ...prev, ...initialData }));
//     }
//   }, [initialData]);

//   const handleChange = (field: keyof typeof formData, value: string | null) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         businessType: formData.businessType,
//         businessName: formData.businessName,
//         businessTagline: formData.businessTagline,
//         contactName: formData.contactName,
//         contactPhone: formData.contactPhone,
//         contactEmail: formData.contactEmail,
//         upi: formData.upi,
//         reviewLink: formData.reviewLink,
//         customField: formData.customField,
//         profileImage: formData.profileImageUrl,
//         logo: formData.logo,
//         signature: formData.signature,
//       };

//       const res = await fetch("/api/profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Profile saved successfully!");
//         if (onSuccess) onSuccess(); // call sidebar refresh
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


















// "use client";

// import { useState, useEffect } from "react";
// import ProfileImage from "./ProfileImage";
// import InputField from "./InputField";
// import SelectField from "./SelectField";
// import FileUpload from "./FileUpload";

// interface ProfileFormProps {
//   initialData?: Partial<{
//     businessType: string;
//     businessName: string;
//     businessTagline: string;
//     contactName: string;
//     contactPhone: string;
//     contactEmail: string;
//     upi: string;
//     reviewLink: string;
//     customField: string;
//     gstNumber: string;
//     businessAddress: string;
//     state: string;
//     pincode: string;
//     signature: string | null;
//     logo: string | null;
//     profileImageUrl: string | null;
//   }>;
//   onSuccess?: () => void;
// }

// export default function ProfileForm({ initialData, onSuccess }: ProfileFormProps) {
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
//     gstNumber: "",
//     businessAddress: "",
//     state: "",
//     pincode: "",
//     signature: null as string | null,
//     logo: null as string | null,
//     profileImageUrl: null as string | null,
//   });

//   // Prefill form if initialData is provided
//   useEffect(() => {
//     if (initialData) {
//       setFormData((prev) => ({ ...prev, ...initialData }));
//     }
//   }, [initialData]);

//   const handleChange = (field: keyof typeof formData, value: string | null) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         ...formData,
//         profileImage: formData.profileImageUrl,
//       };

//       const res = await fetch("/api/profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Profile saved successfully!");
//         onSuccess?.();
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

//         <div className="grid grid-cols-2 gap-4">
//           <InputField
//             placeholder="GST Number"
//             value={formData.gstNumber}
//             onChange={(val) => handleChange("gstNumber", val)}
//           />
//           <InputField
//             placeholder="State"
//             value={formData.state}
//             onChange={(val) => handleChange("state", val)}
//           />
//         </div>

//         <InputField
//           placeholder="Business Address"
//           value={formData.businessAddress}
//           onChange={(val) => handleChange("businessAddress", val)}
//         />

//         <InputField
//           placeholder="Pin Code"
//           value={formData.pincode}
//           onChange={(val) => handleChange("pincode", val)}
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <InputField
//             placeholder="Contact Person Name"
//             value={formData.contactName}
//             onChange={(val) => handleChange("contactName", val)}
//           />
//           <InputField
//             placeholder="Contact Phone"
//             value={formData.contactPhone}
//             onChange={(val) => handleChange("contactPhone", val)}
//           />
//         </div>

//         <InputField
//           type="email"
//           placeholder="Contact Email"
//           value={formData.contactEmail}
//           onChange={(val) => handleChange("contactEmail", val)}
//         />

//         <InputField
//           placeholder="UPI ID"
//           value={formData.upi}
//           onChange={(val) => handleChange("upi", val)}
//         />

//         <InputField
//           placeholder="Google Review Link / URL"
//           value={formData.reviewLink}
//           onChange={(val) => handleChange("reviewLink", val)}
//         />

//         <InputField
//           placeholder="Custom Field"
//           value={formData.customField}
//           onChange={(val) => handleChange("customField", val)}
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <FileUpload
//             label="Signature"
//             value={formData.signature}
//             onChange={(val) => handleChange("signature", val)}
//           />
//           <FileUpload
//             label="Logo"
//             value={formData.logo}
//             onChange={(val) => handleChange("logo", val)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
//         >
//           💾 Save Profile
//         </button>
//       </form>
//     </div>
//   );
// }

































"use client";

import { useState, useEffect } from "react";
import ProfileImage from "./ProfileImage";
import InputField from "./InputField";
import SelectField from "./SelectField";
import FileUpload from "./FileUpload";

interface ProfileFormProps {
  initialData?: Partial<{
    businessType: string;
    businessName: string;
    businessTagline: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    upi: string;
    reviewLink: string;
    customField: string;
    gstNumber: string;
    businessAddress: string;
    state: string;
    pincode: string;
    signature: string | null;
    logo: string | null;
    profileImageUrl: string | null;
  }>;
  onSuccess?: () => void;
}

export default function ProfileForm({ initialData, onSuccess }: ProfileFormProps) {
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
    gstNumber: "",
    businessAddress: "",
    state: "",
    pincode: "",
    signature: null as string | null,
    logo: null as string | null,
    profileImageUrl: null as string | null,
  });

  // Prefill form if initialData is provided
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (field: keyof typeof formData, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        profileImage: formData.profileImageUrl,
      };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Profile saved successfully!");
        onSuccess?.();
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

        <div className="grid grid-cols-2 gap-4">
          <InputField
            placeholder="GST Number"
            value={formData.gstNumber}
            onChange={(val) => handleChange("gstNumber", val)}
          />
          <InputField
            placeholder="State"
            value={formData.state}
            onChange={(val) => handleChange("state", val)}
          />
        </div>

        <InputField
          placeholder="Business Address"
          value={formData.businessAddress}
          onChange={(val) => handleChange("businessAddress", val)}
        />

        <InputField
          placeholder="Pin Code"
          value={formData.pincode}
          onChange={(val) => handleChange("pincode", val)}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            placeholder="Contact Person Name"
            value={formData.contactName}
            onChange={(val) => handleChange("contactName", val)}
          />
          <InputField
            placeholder="Contact Phone"
            value={formData.contactPhone}
            onChange={(val) => handleChange("contactPhone", val)}
          />
        </div>

        <InputField
          type="email"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={(val) => handleChange("contactEmail", val)}
        />

        <InputField
          placeholder="UPI ID"
          value={formData.upi}
          onChange={(val) => handleChange("upi", val)}
        />

        <InputField
          placeholder="Google Review Link / URL"
          value={formData.reviewLink}
          onChange={(val) => handleChange("reviewLink", val)}
        />

        <InputField
          placeholder="Custom Field"
          value={formData.customField}
          onChange={(val) => handleChange("customField", val)}
        />

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          💾 Save Profile
        </button>
      </form>
    </div>
  );
}
