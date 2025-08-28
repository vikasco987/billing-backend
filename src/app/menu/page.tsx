"use client";
import { useEffect, useState } from "react";

export default function MenuManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);

  // Fetch categories & items
  useEffect(() => {
    fetch("/api/categories").then(res => res.json()).then(setCategories);
    fetch("/api/items").then(res => res.json()).then(setItems);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🍔 Menu Management</h1>

      {/* Categories */}
      <h2 className="text-xl mb-2">Categories</h2>
      <ul className="mb-4">
        {categories.map((cat) => (
          <li key={cat.id} className="border p-2 rounded mb-2">
            {cat.name}
          </li>
        ))}
      </ul>

      {/* Items */}
      <h2 className="text-xl mb-2">Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border p-2 rounded mb-2">
            <div className="font-bold">{item.name}</div>
            <div>₹{item.price}</div>
            <div>Category: {item.category?.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
