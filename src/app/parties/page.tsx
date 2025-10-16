"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Party {
  id: string;
  name: string;
  phone: string;
  address?: string;
  dob?: string;
}

export default function PartiesPage() {
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/parties")
      .then((res) => res.json())
      .then((data) => setParties(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🧾 Party List</h1>
        <Link
          href="/parties/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ➕ Add Party
        </Link>
      </div>

      {parties.length === 0 ? (
        <p>No parties found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">DOB</th>
            </tr>
          </thead>
          <tbody>
            {parties.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.phone}</td>
                <td className="py-2 px-4">{p.address || "—"}</td>
                <td className="py-2 px-4">
                  {p.dob ? new Date(p.dob).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
