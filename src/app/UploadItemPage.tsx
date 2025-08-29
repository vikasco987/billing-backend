"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";

export default function UploadItemPage() {
  const [loading, setLoading] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);





  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Collect all form data including the file
      const formData = new FormData(e.currentTarget);

      // Send the entire form data to the API route
      const res = await fetch("/api/items", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upload item.");
      }

      alert("Item uploaded successfully!");
      e.currentTarget.reset();
      setOpenSection(null);
    } catch (error) {
      console.error(error);
      alert("Error uploading item. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          ➕ New Item
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mb-6 flex justify-center"
          >
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-xl cursor-pointer transition border-purple-300 bg-purple-50 hover:bg-purple-100"
            >
              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                id="fileUpload"
              />
              <>
                <Upload className="w-8 h-8 text-purple-500 mb-2" />
                <span className="text-sm text-purple-700 font-semibold text-center">
                  Drag & Drop or Click
                </span>
              </>
            </label>
          </motion.div>

          {/* Product/Service Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Product/Service Name *"
              className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
              required
            />
          </div>

          {/* Sell Price + Item Unit */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="number"
              name="price"
              placeholder="Sell Price *"
              className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
              required
            />
            <select
              name="itemUnit"
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            >
              <option value="">Item Unit</option>
              <option>Piece</option>
              <option>Kg</option>
              <option>Litre</option>
              <option>Pack</option>
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <input
              type="text"
              name="categoryId"
              placeholder="Enter Item Category *"
              className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
              required
            />
          </div>

          {/* MRP + Purchase Price */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="number"
              name="mrp"
              placeholder="MRP"
              className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            />
            <input
              type="number"
              name="purchasePrice"
              placeholder="Purchase Price"
              className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            />
          </div>

          {/* Expandable Optional Sections */}
          <div className="space-y-4 mb-6">
            {/* GST Section */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("gst")}
                className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
              >
                GST and Tax (Optional)
                {openSection === "gst" ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openSection === "gst" && (
                <div className="mt-3 space-y-3">
                  <input
                    type="number"
                    name="tax"
                    placeholder="GST %"
                    className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                  />
                  <input
                    type="number"
                    name="otherTax"
                    placeholder="Other Tax %"
                    className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                  />
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("details")}
                className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
              >
                Product Details (Optional)
                {openSection === "details" ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openSection === "details" && (
                <div className="mt-3 space-y-3">
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                  />
                  <input
                    type="text"
                    name="model"
                    placeholder="Model/Size/Color"
                    className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                  />
                </div>
              )}
            </div>

            {/* Inventory Section */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("inventory")}
                className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
              >
                Inventory Details (Optional)
                {openSection === "inventory" ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openSection === "inventory" && (
                <div className="mt-3 space-y-3">
                  <input
                    type="number"
                    name="stock"
                    placeholder="Opening Stock"
                    className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                  />
                  <input
                    type="number"
                    name="reorderLevel"
                    placeholder="Reorder Level"
                    className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                  />
                </div>
              )}
            </div>

            {/* Product Display Section */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("display")}
                className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
              >
                Product Display (Optional)
                {openSection === "display" ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openSection === "display" && (
                <div className="mt-3 space-y-3">
                  <input
                    type="text"
                    name="displayCategory"
                    placeholder="Display Category"
                    className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
                  />
                  <input
                    type="color"
                    name="displayColor"
                    className="w-full border rounded-lg px-4 py-2 h-12"
                  />
                </div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
          >
            {loading ? "Uploading..." : "Upload Item"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}