"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaUpload, FaEye } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 text-white h-screen p-4 transition-all duration-300`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 text-xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className="space-y-4">
          <Link
            href="/menu/upload"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <FaUpload /> {isOpen && "Upload Menu"}
          </Link>
          <Link
            href="/menu/view"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <FaEye /> {isOpen && "View Menu"}
          </Link>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold">Billg Software</h1>
        <p className="text-gray-600">Manage your restaurant menu here 🚀</p>
      </div>
    </div>
  );
}
