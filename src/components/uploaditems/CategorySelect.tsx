// "use client";

// import { useEffect, useState } from "react";

// interface Category {
//   id: string;
//   name: string;
// }

// export default function CategorySelect({
//   selectedCategory,
//   setSelectedCategory,
// }: {
//   selectedCategory: string;
//   setSelectedCategory: (id: string) => void;
// }) {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [newCategory, setNewCategory] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch categories on load
//   useEffect(() => {
//     fetch("/api/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("❌ Failed to fetch categories", err));
//   }, []);

//   // ✅ Add new category
//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;
//     setLoading(true);
//     try {
//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newCategory }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setCategories((prev) => [...prev, data]); // add to dropdown
//         setSelectedCategory(data.id); // auto-select new category
//         setNewCategory(""); // clear input
//       } else {
//         alert(data.message || "Failed to add category");
//       }
//     } catch (error) {
//       console.error("❌ Error adding category:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 mb-2">Category</label>

//       {/* Category dropdown */}
//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         className="w-full border p-2 rounded bg-white text-gray-800"
//       >
//         <option value="">-- Select Category --</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       {/* Add new category */}
//       <div className="flex gap-2 mt-2">
//         <input
//           type="text"
//           placeholder="New category name"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           className="flex-1 border p-2 rounded bg-white text-gray-800 placeholder-gray-500"
//         />
//         <button
//           type="button"
//           onClick={handleAddCategory}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           {loading ? "Adding..." : "Add"}
//         </button>
//       </div>
//     </div>
//   );
// }
// \














// "use client";

// import { Dispatch, SetStateAction, useState } from "react";

// export interface Category {
//   id: string;
//   name: string;
// }

// interface CategorySelectProps {
//   categories: Category[];
//   selectedCategory: string;
//   setSelectedCategory: (id: string) => void;
//   setCategories: Dispatch<SetStateAction<Category[]>>;
// }

// export default function CategorySelect({
//   categories,
//   selectedCategory,
//   setSelectedCategory,
//   setCategories,
// }: CategorySelectProps) {
//   const [newCategory, setNewCategory] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Add new category
//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;
//     setLoading(true);
//     try {
//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newCategory }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setCategories((prev) => [...prev, data]); // add to parent categories
//         setSelectedCategory(data.id); // auto-select new category
//         setNewCategory(""); // clear input
//       } else {
//         alert(data.message || "Failed to add category");
//       }
//     } catch (error) {
//       console.error("❌ Error adding category:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 mb-2">Category</label>

//       {/* Category dropdown */}
//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         className="w-full border p-2 rounded bg-white text-gray-800"
//       >
//         <option value="">-- Select Category --</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       {/* Add new category */}
//       <div className="flex gap-2 mt-2">
//         <input
//           type="text"
//           placeholder="New category name"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           className="flex-1 border p-2 rounded bg-white text-gray-800 placeholder-gray-500"
//         />
//         <button
//           type="button"
//           onClick={handleAddCategory}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           {loading ? "Adding..." : "Add"}
//         </button>
//       </div>
//     </div>
//   );
// }












// "use client";

// import { useState, useEffect, ChangeEvent } from "react";
// import { motion } from "framer-motion";
// import ImageUpload from "@/components/uploaditems/ImageUpload";
// import CategorySelect, { Category } from "@/components/uploaditems/CategorySelect";
// import GstTaxSection from "@/components/uploaditems/GstTaxSection";
// import ProductDetailsSection from "@/components/uploaditems/ProductDetailsSection";
// import InventorySection from "@/components/uploaditems/InventorySection";
// import DisplaySection from "@/components/uploaditems/DisplaySection";

// export default function UploadItemPage() {
//   const [image, setImage] = useState<string | null>(null);
//   const [openSection, setOpenSection] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("");

//   const [formData, setFormData] = useState({
//     productName: "",
//     sellPrice: "",
//     itemUnit: "",
//     mrp: "",
//     purchasePrice: "",
//     gst: "",
//     otherTax: "",
//     brand: "",
//     model: "",
//     description: "",
//     openingStock: "",
//     reorderLevel: "",
//     displayCategory: "",
//     displayColor: "",
//   });

//   // Load categories from API
//   useEffect(() => {
//     fetch("/api/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("❌ Failed to fetch categories:", err));
//   }, []);

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please upload an image before saving.");
//       return;
//     }

//     if (!selectedCategory) {
//       alert("Please select a category.");
//       return;
//     }

//     setIsSaving(true);

//     const parseFloatOrNull = (v: string) => {
//       const n = parseFloat(v);
//       return isNaN(n) ? null : n;
//     };

//     const parseIntOrNull = (v: string) => {
//       const n = parseInt(v);
//       return isNaN(n) ? null : n;
//     };

//     const itemData = {
//       name: formData.productName || undefined,
//       price: parseFloatOrNull(formData.sellPrice),
//       unit: formData.itemUnit || null,
//       categoryId: selectedCategory,
//       mrp: parseFloatOrNull(formData.mrp),
//       purchasePrice: parseFloatOrNull(formData.purchasePrice),
//       sellingPrice: parseFloatOrNull(formData.sellPrice),
//       gst: parseFloatOrNull(formData.gst),
//       discount: parseFloatOrNull(formData.otherTax),
//       brand: formData.brand || null,
//       model: formData.model || null,
//       description: formData.description || null,
//       stock: parseIntOrNull(formData.openingStock),
//       reorderLevel: parseIntOrNull(formData.reorderLevel),
//       displayCategory: formData.displayCategory || null,
//       displayColor: formData.displayColor || null,
//       imageUrl: image,
//     };

//     try {
//       const res = await fetch("/api/items", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(itemData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save item");

//       alert("✅ Item saved successfully!");
//       setFormData({
//         productName: "",
//         sellPrice: "",
//         itemUnit: "",
//         mrp: "",
//         purchasePrice: "",
//         gst: "",
//         otherTax: "",
//         brand: "",
//         model: "",
//         description: "",
//         openingStock: "",
//         reorderLevel: "",
//         displayCategory: "",
//         displayColor: "",
//       });
//       setImage(null);
//       setOpenSection(null);
//       setSelectedCategory("");
//     } catch (error) {
//       console.error("❌ Failed to save item:", error);
//       alert("Failed to save item. Please check the form data.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
//       <motion.div
//         className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           ➕ New Item
//         </h1>

//         <form onSubmit={handleSave}>
//           <ImageUpload image={image} setImage={setImage} />

//           <div className="mb-4">
//             <input
//               type="text"
//               name="productName"
//               placeholder="Product/Service Name *"
//               value={formData.productName}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <input
//               type="number"
//               name="sellPrice"
//               placeholder="Sell Price *"
//               value={formData.sellPrice}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
//               required
//             />
//             <select
//               name="itemUnit"
//               value={formData.itemUnit}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
//             >
//               <option value="">Item Unit</option>
//               <option>Piece</option>
//               <option>Kg</option>
//               <option>Litre</option>
//               <option>Pack</option>
//             </select>
//           </div>

//           {/* ✅ CategorySelect updated with proper props */}
//           <CategorySelect
//             categories={categories}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//             setCategories={setCategories}
//           />

//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <input
//               type="number"
//               name="mrp"
//               placeholder="MRP"
//               value={formData.mrp}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-3"
//             />
//             <input
//               type="number"
//               name="purchasePrice"
//               placeholder="Purchase Price"
//               value={formData.purchasePrice}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-3"
//             />
//           </div>

//           <div className="space-y-4 mb-6">
//             <GstTaxSection
//               openSection={openSection}
//               toggleSection={toggleSection}
//               formData={formData}
//               handleChange={handleChange}
//             />
//             <ProductDetailsSection
//               openSection={openSection}
//               toggleSection={toggleSection}
//               formData={formData}
//               handleChange={handleChange}
//             />
//             <InventorySection
//               openSection={openSection}
//               toggleSection={toggleSection}
//               formData={formData}
//               handleChange={handleChange}
//             />
//             <DisplaySection
//               openSection={openSection}
//               toggleSection={toggleSection}
//               formData={formData}
//               handleChange={handleChange}
//             />
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
//             disabled={isSaving}
//           >
//             {isSaving ? "Saving..." : "SAVE"}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }












"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import ImageUpload from "@/components/uploaditems/ImageUpload";
import CategorySelect, { Category } from "@/components/uploaditems/CategorySelect";
import GstTaxSection from "@/components/uploaditems/GstTaxSection";
import ProductDetailsSection from "@/components/uploaditems/ProductDetailsSection";
import InventorySection from "@/components/uploaditems/InventorySection";
import DisplaySection from "@/components/uploaditems/DisplaySection";

export default function UploadItemPage() {
  const [image, setImage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [formData, setFormData] = useState({
    productName: "",
    sellPrice: "",
    itemUnit: "",
    mrp: "",
    purchasePrice: "",
    gst: "",
    otherTax: "",
    brand: "",
    model: "",
    description: "",
    openingStock: "",
    reorderLevel: "",
    displayCategory: "",
    displayColor: "",
  });

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (res.ok) setCategories(data);
      } catch (err) {
        console.error("❌ Failed to fetch categories:", err);
      }
    };
    loadCategories();
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return alert("Please upload an image before saving.");
    if (!selectedCategory) return alert("Please select a category.");

    setIsSaving(true);

    const parseFloatOrNull = (v: string) => {
      const n = parseFloat(v);
      return isNaN(n) ? null : n;
    };
    const parseIntOrNull = (v: string) => {
      const n = parseInt(v);
      return isNaN(n) ? null : n;
    };

    const itemData = {
      name: formData.productName || undefined,
      price: parseFloatOrNull(formData.sellPrice),
      unit: formData.itemUnit || null,
      categoryId: selectedCategory,
      mrp: parseFloatOrNull(formData.mrp),
      purchasePrice: parseFloatOrNull(formData.purchasePrice),
      sellingPrice: parseFloatOrNull(formData.sellPrice),
      gst: parseFloatOrNull(formData.gst),
      discount: parseFloatOrNull(formData.otherTax),
      brand: formData.brand || null,
      model: formData.model || null,
      description: formData.description || null,
      stock: parseIntOrNull(formData.openingStock),
      reorderLevel: parseIntOrNull(formData.reorderLevel),
      displayCategory: formData.displayCategory || null,
      displayColor: formData.displayColor || null,
      imageUrl: image,
    };

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save item");

      alert("✅ Item saved successfully!");
      setFormData({
        productName: "",
        sellPrice: "",
        itemUnit: "",
        mrp: "",
        purchasePrice: "",
        gst: "",
        otherTax: "",
        brand: "",
        model: "",
        description: "",
        openingStock: "",
        reorderLevel: "",
        displayCategory: "",
        displayColor: "",
      });
      setImage(null);
      setOpenSection(null);
      setSelectedCategory("");
    } catch (error) {
      console.error("❌ Failed to save item:", error);
      alert("Failed to save item. Please check the form data.");
    } finally {
      setIsSaving(false);
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

        <form onSubmit={handleSave}>
          <ImageUpload image={image} setImage={setImage} />

          <div className="mb-4">
            <input
              type="text"
              name="productName"
              placeholder="Product/Service Name *"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="number"
              name="sellPrice"
              placeholder="Sell Price *"
              value={formData.sellPrice}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
              required
            />
            <select
              name="itemUnit"
              value={formData.itemUnit}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            >
              <option value="">Item Unit</option>
              <option>Piece</option>
              <option>Kg</option>
              <option>Litre</option>
              <option>Pack</option>
            </select>
          </div>

          {/* ✅ Fixed CategorySelect usage */}
          <CategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setCategories={setCategories}
          />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="number"
              name="mrp"
              placeholder="MRP"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
            <input
              type="number"
              name="purchasePrice"
              placeholder="Purchase Price"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="space-y-4 mb-6">
            <GstTaxSection
              openSection={openSection}
              toggleSection={toggleSection}
              formData={formData}
              handleChange={handleChange}
            />
            <ProductDetailsSection
              openSection={openSection}
              toggleSection={toggleSection}
              formData={formData}
              handleChange={handleChange}
            />
            <InventorySection
              openSection={openSection}
              toggleSection={toggleSection}
              formData={formData}
              handleChange={handleChange}
            />
            <DisplaySection
              openSection={openSection}
              toggleSection={toggleSection}
              formData={formData}
              handleChange={handleChange}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "SAVE"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
