"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";

type MenuItem = {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
  unit?: string;
};

type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export default function ViewMenuPage() {
  const { getToken } = useAuth();
  const [menus, setMenus] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        if (!token) throw new Error("Unauthorized");

        const res = await fetch("/api/menu/view", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch menus");
        const data = await res.json();
        setMenus(data.menus || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [getToken]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/5 bg-gray-50 border-r overflow-y-auto p-4">
        <h2 className="font-bold text-lg mb-4">Categories</h2>
        <ul className="space-y-2">
          {menus.map((cat) => (
            <li key={cat.id}>
              <a
                href={`#cat-${cat.id}`}
                className="block px-3 py-2 rounded-md hover:bg-green-100 hover:text-green-600 font-medium"
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Our Products</h1>

        {menus.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="space-y-12">
            {menus.map((cat) => (
              <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  {cat.name}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cat.items.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
                    >
                      {item.imageUrl && (
                        <div className="w-full h-32 relative mb-3">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                      )}
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-green-600 font-bold mt-1">
                        ₹{item.price?.toFixed(2) ?? "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">{item.unit || "Unit"}</p>
                      <button className="mt-3 w-full bg-green-500 text-white py-1.5 rounded-lg hover:bg-green-600 transition">
                        Add +
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
