"use client";

import { useEffect, useState } from "react";

interface Party {
  id: string;
  name: string;
  phone: string;
}

interface PartySelectorProps {
  selectedPartyId: string | null;
  setSelectedPartyId: (id: string | null) => void;
  onAddParty: (party: Party) => void;
}

export default function PartySelector({ selectedPartyId, setSelectedPartyId, onAddParty }: PartySelectorProps) {
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("/api/parties")
      .then((res) => res.json())
      .then((data) => setParties(data))
      .finally(() => setLoading(false));
  }, []);

  const handleAddParty = async () => {
    if (!name || !phone) return alert("Name & Phone required");

    const res = await fetch("/api/parties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });

    const data = await res.json();
    if (res.ok) {
      onAddParty(data);
      setSelectedPartyId(data.id);
      setName("");
      setPhone("");
    } else {
      alert(data.error || "Failed to add party");
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Select Customer</label>
      {loading ? (
        <p>Loading parties...</p>
      ) : (
        <select
          className="border p-2 rounded w-full mb-2"
          value={selectedPartyId || ""}
          onChange={(e) => setSelectedPartyId(e.target.value)}
        >
          <option value="">Walk-in Customer</option>
          {parties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.phone})
            </option>
          ))}
        </select>
      )}

      <div className="flex gap-2 mt-2">
        <input
          className="border p-2 rounded flex-1"
          placeholder="New Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded flex-1"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={handleAddParty}
          className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
