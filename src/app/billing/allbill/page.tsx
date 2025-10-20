"use client";

import React, { useEffect, useState } from "react";

export default function AllBillsPage() {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Fetch all bills
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch("/api/billing/list");
        const data = await res.json();
        if (res.ok) setBills(data.bills || []);
      } catch (err) {
        console.error("Error fetching bills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Handle view click → open modal
  const handleViewBill = async (id: string) => {
    try {
      setModalLoading(true);
      const res = await fetch(`/api/billing/${id}`);
      const data = await res.json();
      if (res.ok && data.bill) setSelectedBill(data.bill);
      else alert("Failed to load bill details");
    } catch (err) {
      console.error("Error loading bill:", err);
      alert("Error loading bill");
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => setSelectedBill(null);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading bills...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow relative">
      <h1 className="text-3xl font-bold text-center mb-6">📜 All Generated Bills</h1>

      {bills.length === 0 ? (
        <p className="text-center text-gray-500">No bills found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Customer</th>
              <th className="border px-3 py-2 text-left">Total</th>
              <th className="border px-3 py-2 text-left">Created At</th>
              <th className="border px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">
                  {bill.customer?.customerName || "Unknown"}
                </td>
                <td className="border px-3 py-2">₹{bill.total}</td>
                <td className="border px-3 py-2">
                  {new Date(bill.createdAt).toLocaleString()}
                </td>
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => handleViewBill(bill.id)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    View / Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ======= Modal Popup ======= */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 font-bold text-xl"
            >
              ✕
            </button>

            {modalLoading ? (
              <div className="text-center text-gray-600 py-10">
                Loading bill details...
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Bill Details
                </h2>
                <div className="space-y-2">
                  <p><strong>Customer:</strong> {selectedBill.customer?.customerName}</p>
                  <p><strong>Phone:</strong> {selectedBill.customer?.phone}</p>
                  <p><strong>Date:</strong> {new Date(selectedBill.createdAt).toLocaleString()}</p>
                  <p><strong>Total:</strong> ₹{selectedBill.total}</p>
                </div>

                <h3 className="mt-6 mb-2 font-semibold">Products:</h3>
                <table className="w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1">Name</th>
                      <th className="border px-2 py-1">Qty</th>
                      <th className="border px-2 py-1">Price</th>
                      <th className="border px-2 py-1">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.products?.map((p: any, i: number) => (
                      <tr key={i}>
                        <td className="border px-2 py-1">{p.name}</td>
                        <td className="border px-2 py-1">{p.quantity}</td>
                        <td className="border px-2 py-1">₹{p.price}</td>
                        <td className="border px-2 py-1">₹{p.quantity * p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right mt-4">
                  <button
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    🖨 Print
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
