// 



















"use client";

import React, { useState, useEffect } from "react";

interface Party {
  id: string;
  name: string;
  phone: string;
}

interface PartySelectorProps {
  parties: Party[];
  selectedParty: string;
  setSelectedParty: (id: string) => void;
  refreshParties?: () => void;
}

export default function PartySelector({
  parties,
  selectedParty,
  setSelectedParty,
  refreshParties,
}: PartySelectorProps) {
  const [newPartyName, setNewPartyName] = useState("");
  const [newPartyPhone, setNewPartyPhone] = useState("");

  const handleAddNewParty = async () => {
    if (!newPartyName.trim() || !newPartyPhone.trim()) {
      alert("Please enter name and phone");
      return;
    }

    try {
      const res = await fetch("/api/parties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newPartyName, phone: newPartyPhone }),
      });

      const data = await res.json();

      if (res.ok) {
        setSelectedParty(data.id);
        setNewPartyName("");
        setNewPartyPhone("");
        alert("✅ Customer added!");
        refreshParties?.();
      } else {
        alert(data?.error || "Failed to add customer");
      }
    } catch (err) {
      console.error("Add party failed", err);
      alert("❌ Failed to add customer. Check console.");
    }
  };

  return (
    <div className="space-y-2 mb-6">
      <h2 className="font-semibold">👤 Select or Add Customer</h2>
      <select
        className="border p-2 rounded w-full"
        value={selectedParty}
        onChange={(e) => setSelectedParty(e.target.value)}
      >
        <option value="">Select Customer</option>
        {parties.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} ({p.phone})
          </option>
        ))}
      </select>
      <div className="flex gap-2 mt-2">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="New Customer Name"
          value={newPartyName}
          onChange={(e) => setNewPartyName(e.target.value)}
        />
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Phone"
          value={newPartyPhone}
          onChange={(e) => setNewPartyPhone(e.target.value)}
        />
        <button
          onClick={handleAddNewParty}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Add
        </button>
      </div>
    </div>
  );
}
