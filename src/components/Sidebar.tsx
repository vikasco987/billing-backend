// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { FaBars, FaTimes, FaUpload, FaEye } from "react-icons/fa";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isOpen ? "w-64" : "w-16"
//         } bg-gray-900 text-white h-screen p-4 transition-all duration-300`}
//       >
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="mb-6 text-xl focus:outline-none"
//         >
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         <nav className="space-y-4">
//           <Link
//             href="/menu/upload"
//             className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
//           >
//             <FaUpload /> {isOpen && "Upload Menu"}
//           </Link>
//           <Link
//             href="/menu/view"
//             className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
//           >
//             <FaEye /> {isOpen && "View Menu"}
//           </Link>
//         </nav>
//       </div>

//       {/* Content Area */}
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-2xl font-bold">Billg Software</h1>
//         <p className="text-gray-600">Manage your restaurant menu here 🚀</p>
//       </div>
//     </div>
//   );
// }










// "use client";

// import Link from "next/link";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
//       <div className="p-4 text-xl font-bold border-b border-gray-700">
//         📂 Menu
//       </div>
//       <nav className="flex-1 p-4 space-y-3">
//         <Link
//           href="/menu/upload"
//           className="block px-3 py-2 rounded hover:bg-gray-700"
//         >
//           Upload Menu
//         </Link>
//         <Link
//           href="/menu/view"
//           className="block px-3 py-2 rounded hover:bg-gray-700"
//         >
//           View Menu
//         </Link>
//       </nav>
//     </aside>
//   );
// }











// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import ProfileForm from "@/components/profile/ProfileForm"; // ✅ Import ProfileForm

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Top bar for mobile */}
//       <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
//         <h1 className="text-lg font-bold">📂 Menu</h1>
//         <button onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 h-full w-72 bg-gray-900 text-white transform 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         md:translate-x-0 transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
//       >
//         <div className="p-4 text-xl font-bold border-b border-gray-700 hidden md:block">
//           📂 Menu
//         </div>

//         <nav className="flex-1 p-4 space-y-3">
//           <Link
//             href="/menu/upload"
//             className="block px-3 py-2 rounded hover:bg-gray-700"
//             onClick={() => setIsOpen(false)}
//           >
//             Upload Menu
//           </Link>

//           <Link
//             href="/menu/view"
//             className="block px-3 py-2 rounded hover:bg-gray-700"
//             onClick={() => setIsOpen(false)}
//           >
//             View Menu
//           </Link>

//           {/* ✅ Always visible Profile Form */}
//           <div className="mt-6 bg-gray-800 p-3 rounded-lg shadow">
//             <h2 className="text-lg font-semibold mb-3">👤 Profile</h2>
//             <ProfileForm />
//           </div>
//         </nav>
//       </aside>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// }










// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X, User } from "lucide-react";
// import ProfileForm from "@/components/profile/ProfileForm"; // ✅ Business Profile Form
// import { motion, AnimatePresence } from "framer-motion";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);

//   return (
//     <>
//       {/* Top bar for mobile */}
//       <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 shadow-md">
//         <h1 className="text-lg font-bold">📂 Menu</h1>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="p-2 rounded-md bg-white/10 hover:bg-white/20"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg`}
//       >
//         <div className="p-4 text-xl font-extrabold border-b border-gray-700 hidden md:block">
//           📂 Dashboard
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-3">
//           <Link
//             href="/menu/upload"
//             className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition"
//             onClick={() => setIsOpen(false)}
//           >
//             Upload Menu
//           </Link>

//           <Link
//             href="/menu/view"
//             className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition"
//             onClick={() => setIsOpen(false)}
//           >
//             View Menu
//           </Link>

//           {/* ✅ My Business Profile Button */}
//           <button
//             onClick={() => setShowProfile(true)}
//             className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition font-medium"
//           >
//             <User className="w-5 h-5" />
//             My Business Profile
//           </button>
//         </nav>
//       </aside>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       {/* ✅ Drawer for Profile Form */}
//       <AnimatePresence>
//         {showProfile && (
//           <>
//             {/* Background Overlay */}
//             <motion.div
//               className="fixed inset-0 bg-black/50 z-40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowProfile(false)}
//             />

//             {/* Drawer */}
//             <motion.div
//               className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b bg-gray-100">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   🏢 My Business Profile
//                 </h2>
//                 <button
//                   onClick={() => setShowProfile(false)}
//                   className="text-gray-600 hover:text-red-600"
//                 >
//                   <X size={28} />
//                 </button>
//               </div>

//               {/* Profile Form Inside Drawer */}
//               <div className="p-6">
//                 <ProfileForm />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }






// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Menu, X, User, Edit3 } from "lucide-react";
// import ProfileForm from "@/components/profile/ProfileForm";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [profile, setProfile] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // ✅ Fetch most recent profile
//   const fetchProfile = async () => {
//     try {
//       const res = await fetch("/api/profile/recent");
//       if (res.ok) {
//         const data = await res.json();
//         setProfile(data || null);
//       }
//     } catch (err) {
//       console.error("Failed to load profile", err);
//     }
//   };

//   // Fetch when drawer opens
//   useEffect(() => {
//     if (showProfile) {
//       fetchProfile();
//     }
//   }, [showProfile]);

//   return (
//     <>
//       {/* Top bar for mobile */}
//       <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 shadow-md">
//         <h1 className="text-lg font-bold">📂 Menu</h1>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="p-2 rounded-md bg-white/10 hover:bg-white/20"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg`}
//       >
//         <div className="p-4 text-xl font-extrabold border-b border-gray-700 hidden md:block">
//           📂 Dashboard
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-3">
//           <Link
//             href="/menu/upload"
//             className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition"
//             onClick={() => setIsOpen(false)}
//           >
//             Upload Menu
//           </Link>

//           <Link
//             href="/menu/view"
//             className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition"
//             onClick={() => setIsOpen(false)}
//           >
//             View Menu
//           </Link>

//           {/* ✅ My Business Profile Button */}
//           <button
//             onClick={() => {
//               setShowProfile(true);
//               setIsEditing(false); // reset edit mode
//             }}
//             className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition font-medium"
//           >
//             <User className="w-5 h-5" />
//             My Business Profile
//           </button>
//         </nav>
//       </aside>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* ✅ Drawer for Profile */}
//       <AnimatePresence>
//         {showProfile && (
//           <>
//             {/* Background Overlay */}
//             <motion.div
//               className="fixed inset-0 bg-black/50 z-40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowProfile(false)}
//             />

//             {/* Drawer */}
//             <motion.div
//               className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b bg-gray-100">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   🏢 My Business Profile
//                 </h2>
//                 <button
//                   onClick={() => setShowProfile(false)}
//                   className="text-gray-600 hover:text-red-600"
//                 >
//                   <X size={28} />
//                 </button>
//               </div>

//               {/* ✅ Content */}
//               <div className="p-6">
//                 {/* Case 1: Profile exists & not editing → show card */}
//                 {profile && !isEditing ? (
//                   <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 border">
//                     {/* Logo */}
//                     {profile.fields.find((f: any) => f.label === "Logo")?.fileUrl && (
//                       <img
//                         src={profile.fields.find((f: any) => f.label === "Logo")?.fileUrl}
//                         alt="Logo"
//                         className="w-24 h-24 object-contain rounded-full mx-auto"
//                       />
//                     )}

//                     {/* Business Info */}
//                     <h3 className="text-2xl font-bold text-center text-gray-800">
//                       {profile.fields.find((f: any) => f.label === "Business Name")?.value}
//                     </h3>
//                     <p className="text-center text-gray-500">
//                       {profile.fields.find((f: any) => f.label === "Tagline")?.value}
//                     </p>

//                     <div className="space-y-2 text-gray-700">
//                       <p><strong>📌 Type:</strong> {profile.fields.find((f: any) => f.label === "Business Type")?.value}</p>
//                       <p><strong>👤 Contact:</strong> {profile.fields.find((f: any) => f.label === "Contact Person Name")?.value}</p>
//                       <p><strong>📞 Phone:</strong> {profile.fields.find((f: any) => f.label === "Phone")?.value}</p>
//                       <p><strong>✉️ Email:</strong> {profile.fields.find((f: any) => f.label === "Email")?.value}</p>
//                       <p><strong>💳 UPI:</strong> {profile.fields.find((f: any) => f.label === "UPI")?.value}</p>
//                       <p><strong>⭐ Reviews:</strong> {profile.fields.find((f: any) => f.label === "Google Review Link")?.value}</p>
//                       <p><strong>📝 Custom:</strong> {profile.fields.find((f: any) => f.label === "Custom Field")?.value}</p>
//                     </div>

//                     {/* Signature */}
//                     {profile.fields.find((f: any) => f.label === "Signature")?.fileUrl && (
//                       <div className="text-center">
//                         <p className="font-medium">Signature</p>
//                         <img
//                           src={profile.fields.find((f: any) => f.label === "Signature")?.fileUrl}
//                           alt="Signature"
//                           className="w-40 h-20 object-contain mx-auto"
//                         />
//                       </div>
//                     )}

//                     {/* Edit Button */}
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                     >
//                       <Edit3 size={18} /> Edit Profile
//                     </button>
//                   </div>
//                 ) : (
//                   /* Case 2: No profile OR editing → show form */
//                   <ProfileForm
//                     initialData={isEditing ? profile : null}
//                     onSuccess={() => {
//                       setIsEditing(false);
//                       fetchProfile(); // refresh after save
//                     }}
//                   />
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
















// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Menu, X, User, Edit3 } from "lucide-react";
// import ProfileForm from "@/components/profile/ProfileForm";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [profile, setProfile] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // ✅ Fetch most recent profile
//   const fetchProfile = async () => {
//     try {
//       const res = await fetch("/api/profile/recent");
//       if (res.ok) {
//         const data = await res.json();
//         setProfile(data || null);
//       }
//     } catch (err) {
//       console.error("Failed to load profile", err);
//     }
//   };

//   // Fetch when drawer opens
//   useEffect(() => {
//     if (showProfile) {
//       fetchProfile();
//     }
//   }, [showProfile]);

//   return (
//     <>
//       {/* Top bar for mobile */}
//       <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 shadow-md">
//         <h1 className="text-lg font-bold">📂 Menu</h1>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="p-2 rounded-md bg-white/10 hover:bg-white/20"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg`}
//       >
//         <div className="p-4 text-xl font-extrabold border-b border-gray-700 hidden md:block">
//           📂 Dashboard
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-3">
//           <Link
//             href="/menu/upload"
//             className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition"
//             onClick={() => setIsOpen(false)}
//           >
//             Upload Menu
//           </Link>

//           <Link
//             href="/menu/view"
//             className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition"
//             onClick={() => setIsOpen(false)}
//           >
//             View Menu
//           </Link>

//           {/* ✅ My Business Profile Button */}
//           <button
//             onClick={() => {
//               setShowProfile(true);
//               setIsEditing(false); // reset edit mode
//             }}
//             className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition font-medium"
//           >
//             <User className="w-5 h-5" />
//             My Business Profile
//           </button>
//         </nav>
//       </aside>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* ✅ Drawer for Profile */}
//       <AnimatePresence>
//         {showProfile && (
//           <>
//             {/* Background Overlay */}
//             <motion.div
//               className="fixed inset-0 bg-black/50 z-40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowProfile(false)}
//             />

//             {/* Drawer */}
//             <motion.div
//               className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b bg-gray-100">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   🏢 My Business Profile
//                 </h2>
//                 <button
//                   onClick={() => setShowProfile(false)}
//                   className="text-gray-600 hover:text-red-600"
//                 >
//                   <X size={28} />
//                 </button>
//               </div>

//               {/* ✅ Content */}
//               <div className="p-6">
//                 {/* Case 1: Profile exists & not editing → show card */}
//                 {profile && !isEditing ? (
//                   <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 border">
//                     {/* Logo */}
//                     {profile.logoUrl && (
//                       <img
//                         src={profile.logoUrl}
//                         alt="Logo"
//                         className="w-24 h-24 object-contain rounded-full mx-auto"
//                       />
//                     )}

//                     {/* Business Info */}
//                     <h3 className="text-2xl font-bold text-center text-gray-800">
//                       {profile.businessName}
//                     </h3>
//                     <p className="text-center text-gray-500">
//                       {profile.businessTagLine}
//                     </p>

//                     <div className="space-y-2 text-gray-700">
//                       <p><strong>📌 Type:</strong> {profile.businessType}</p>
//                       <p><strong>👤 Contact:</strong> {profile.contactPersonName}</p>
//                       <p><strong>📞 Phone:</strong> {profile.contactPersonPhone}</p>
//                       <p><strong>✉️ Email:</strong> {profile.contactPersonEmail}</p>
//                       <p><strong>💳 UPI:</strong> {profile.upi}</p>
//                       <p><strong>⭐ Reviews:</strong> {profile.googleReviewUrl}</p>
//                       <p><strong>📝 Custom:</strong> {profile.customField}</p>
//                     </div>

//                     {/* Profile Image */}
//                     {profile.profileImageUrl && (
//                       <div className="text-center">
//                         <img
//                           src={profile.profileImageUrl}
//                           alt="Profile Image"
//                           className="w-32 h-32 object-cover rounded-full mx-auto mt-2"
//                         />
//                       </div>
//                     )}

//                     {/* Signature */}
//                     {profile.signatureUrl && (
//                       <div className="text-center mt-4">
//                         <p className="font-medium">Signature</p>
//                         <img
//                           src={profile.signatureUrl}
//                           alt="Signature"
//                           className="w-40 h-20 object-contain mx-auto"
//                         />
//                       </div>
//                     )}

//                     {/* Edit Button */}
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                     >
//                       <Edit3 size={18} /> Edit Profile
//                     </button>
//                   </div>
//                 ) : (
//                   /* Case 2: No profile OR editing → show form */
//                   <ProfileForm
//                     initialData={isEditing ? profile : null}
//                     onSuccess={() => {
//                       setIsEditing(false);
//                       fetchProfile(); // refresh after save
//                     }}
//                   />
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }









"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, User, Edit3 } from "lucide-react";
import ProfileForm from "@/components/profile/ProfileForm";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile/recent");
      if (res.ok) {
        const data = await res.json();
        setProfile(data || null);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  useEffect(() => {
    if (showProfile) fetchProfile();
  }, [showProfile]);

  return (
    <>
      {/* Top Navbar (Sticky) */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 shadow-md">
        <h1 className="text-lg font-bold">📂 Dashboard</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar (Mobile Drawer + Desktop Static) */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 md:w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-40 shadow-2xl`}
      >
        <div className="p-4 text-xl font-extrabold border-b border-gray-700 hidden md:block">
          📂 Dashboard
        </div>

        <nav className="flex-1 p-4 space-y-3 mt-12 md:mt-0">
          <Link
            href="/menu/upload"
            className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-indigo-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Upload Menu
          </Link>

          <Link
            href="/menu/view"
            className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-indigo-700 transition"
            onClick={() => setIsOpen(false)}
          >
            View Menu
          </Link>

          <button
            onClick={() => {
              setShowProfile(true);
              setIsEditing(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium"
          >
            <User className="w-5 h-5" />
            My Business Profile
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Profile Drawer */}
      <AnimatePresence>
        {showProfile && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
            />

            <motion.div
              className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-100 sticky top-0 z-10">
                <h2 className="text-lg font-bold text-gray-800">🏢 My Business Profile</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto pb-24">
                {profile && !isEditing ? (
                  <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 border">
                    {profile.logoUrl && (
                      <img
                        src={profile.logoUrl}
                        alt="Logo"
                        className="w-24 h-24 object-contain rounded-full mx-auto"
                      />
                    )}

                    <h3 className="text-2xl font-bold text-center">{profile.businessName}</h3>
                    <p className="text-center text-gray-500">{profile.businessTagLine}</p>

                    <div className="space-y-2 text-gray-700">
                      <p><strong>📌 Type:</strong> {profile.businessType}</p>
                      <p><strong>👤 Contact:</strong> {profile.contactPersonName}</p>
                      <p><strong>📞 Phone:</strong> {profile.contactPersonPhone}</p>
                      <p><strong>✉️ Email:</strong> {profile.contactPersonEmail}</p>
                      <p><strong>💳 UPI:</strong> {profile.upi}</p>
                      <p><strong>⭐ Reviews:</strong> {profile.googleReviewUrl}</p>
                      <p><strong>📝 Custom:</strong> {profile.customField}</p>
                    </div>

                    {profile.profileImageUrl && (
                      <img
                        src={profile.profileImageUrl}
                        alt="Profile Image"
                        className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
                      />
                    )}

                    {profile.signatureUrl && (
                      <div className="text-center mt-4">
                        <p className="font-medium">Signature</p>
                        <img
                          src={profile.signatureUrl}
                          alt="Signature"
                          className="w-40 h-20 object-contain mx-auto"
                        />
                      </div>
                    )}

                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mt-4"
                    >
                      <Edit3 size={18} /> Edit Profile
                    </button>
                  </div>
                ) : (
                  <ProfileForm
                    initialData={isEditing ? profile : null}
                    onSuccess={() => {
                      setIsEditing(false);
                      fetchProfile();
                    }}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}








