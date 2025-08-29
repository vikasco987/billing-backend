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











"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h1 className="text-lg font-bold">📂 Menu</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 text-xl font-bold border-b border-gray-700 hidden md:block">
          📂 Menu
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link
            href="/menu/upload"
            className="block px-3 py-2 rounded hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // auto close on click
          >
            Upload Menu
          </Link>
          <Link
            href="/menu/view"
            className="block px-3 py-2 rounded hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // auto close on click
          >
            View Menu
          </Link>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
