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










"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import ProfileForm from "@/components/profile/ProfileForm"; // ✅ Business Profile Form
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 shadow-md">
        <h1 className="text-lg font-bold">📂 Menu</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        <div className="p-4 text-xl font-extrabold border-b border-gray-700 hidden md:block">
          📂 Dashboard
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          <Link
            href="/menu/upload"
            className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Upload Menu
          </Link>

          <Link
            href="/menu/view"
            className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition"
            onClick={() => setIsOpen(false)}
          >
            View Menu
          </Link>

          {/* ✅ My Business Profile Button */}
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition font-medium"
          >
            <User className="w-5 h-5" />
            My Business Profile
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ✅ Drawer for Profile Form */}
      <AnimatePresence>
        {showProfile && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                  🏢 My Business Profile
                </h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Profile Form Inside Drawer */}
              <div className="p-6">
                <ProfileForm />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
