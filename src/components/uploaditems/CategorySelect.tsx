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














"use client";

import { Dispatch, SetStateAction, useState } from "react";

export interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

export default function CategorySelect({
  categories,
  selectedCategory,
  setSelectedCategory,
  setCategories,
}: CategorySelectProps) {
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Add new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      const data = await res.json();

      if (res.ok) {
        setCategories((prev) => [...prev, data]); // add to parent categories
        setSelectedCategory(data.id); // auto-select new category
        setNewCategory(""); // clear input
      } else {
        alert(data.message || "Failed to add category");
      }
    } catch (error) {
      console.error("❌ Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Category</label>

      {/* Category dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full border p-2 rounded bg-white text-gray-800"
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Add new category */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 border p-2 rounded bg-white text-gray-800 placeholder-gray-500"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
