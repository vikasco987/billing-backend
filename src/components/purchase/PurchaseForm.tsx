"use client";
import { useState, useEffect } from "react";

export default function PurchaseForm() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [vendorId, setVendorId] = useState("");
  const [paymentMode, setPaymentMode] = useState("CASH");

  useEffect(() => {
    fetch("/api/vendors").then(r => r.json()).then(setVendors);
    fetch("/api/items").then(r => r.json()).then(setItems);
  }, []);

  const addItem = (item: any) => {
    setSelectedItems([...selectedItems, { ...item, quantity: 1, costPrice: item.purchasePrice || 0 }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const copy = [...selectedItems];
    copy[index][field] = value;
    setSelectedItems(copy);
  };

  const total = selectedItems.reduce((acc, it) => acc + it.quantity * it.costPrice, 0);

  const savePurchase = async () => {
    const res = await fetch("/api/purchases", {
      method: "POST",
      body: JSON.stringify({
        vendorId,
        items: selectedItems.map(it => ({
          itemId: it.id,
          quantity: it.quantity,
          costPrice: it.costPrice,
        })),
        paymentMode,
        invoiceNo: `INV-${Date.now()}`,
        userId: "YOUR_USER_ID", // replace with auth user
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    alert("Purchase Created!");
    console.log(data);
  };

  return (
    <div className="p-4 space-y-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">🧾 New Purchase Entry</h2>

      {/* Vendor */}
      <select value={vendorId} onChange={e => setVendorId(e.target.value)} className="border p-2 w-full">
        <option value="">Select Vendor</option>
        {vendors.map(v => (
          <option key={v.id} value={v.id}>{v.name}</option>
        ))}
      </select>

      {/* Item Selector */}
      <div>
        <h3 className="font-semibold mb-2">📦 Add Items</h3>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => addItem(item)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Items Table */}
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Item</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Cost Price</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((it, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{it.name}</td>
              <td className="p-2">
                <input type="number" value={it.quantity} min="1"
                  onChange={e => updateItem(i, "quantity", parseInt(e.target.value))}
                  className="w-16 border"
                />
              </td>
              <td className="p-2">
                <input type="number" value={it.costPrice}
                  onChange={e => updateItem(i, "costPrice", parseFloat(e.target.value))}
                  className="w-24 border"
                />
              </td>
              <td className="p-2">₹{it.quantity * it.costPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right font-bold text-lg">Grand Total: ₹{total}</div>

      {/* Payment Mode */}
      <select value={paymentMode} onChange={e => setPaymentMode(e.target.value)} className="border p-2 w-full">
        <option value="CASH">Cash</option>
        <option value="UPI">UPI</option>
        <option value="BANK">Bank Transfer</option>
      </select>

      <button onClick={savePurchase} className="w-full bg-indigo-600 text-white py-2 rounded">
        Save Purchase
      </button>
    </div>
  );
}
