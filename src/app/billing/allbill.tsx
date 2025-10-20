"use client";

import React, { useEffect, useState } from "react";

interface SavedBill {
  id: string;
  customerName: string;
  grandTotal: number;
  createdAt: string; // ISO string
}

export default function AllBillsPage() {
  const [bills, setBills] = useState<SavedBill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/billing/list") // Make sure your API returns all bills
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBills(data);
        else console.error("Unexpected /api/billing/list format:", data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="p-6 text-center">Loading bills...</p>;

  if (bills.length === 0)
    return <p className="p-6 text-center text-gray-500">No bills generated yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📄 All Generated Bills</h1>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Customer</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Time</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => {
            const date = new Date(bill.createdAt);
            return (
              <tr key={bill.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{bill.customerName}</td>
                <td className="border px-2 py-1">₹{bill.grandTotal}</td>
                <td className="border px-2 py-1">{date.toLocaleDateString()}</td>
                <td className="border px-2 py-1">{date.toLocaleTimeString()}</td>
                <td className="border px-2 py-1 text-center">
                  <a
                    href={`/billing/${bill.id}`} // Open bill page
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View / Print
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
