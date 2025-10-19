"use client";

import { useEffect, useState } from "react";
import PartySelector from "./PartySelector";
import ItemSelector, { MenuItem } from "./ItemSelector";
import BillSummary from "./BillSummary";

export default function BillForm() {
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Record<string, { item: MenuItem; quantity: number }>>({});

  useEffect(() => {
    fetch("/api/menu/view")
      .then((res) => res.json())
      .then((data) => {
        const allItems: MenuItem[] = data.menus.flatMap((cat: any) => cat.items);
        setMenuItems(allItems);
      });
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: { item, quantity: prev[item.id]?.quantity ? prev[item.id].quantity + 1 : 1 },
    }));
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prev) => {
      const current = prev[item
"use client";

import { useEffect, useState } from "react";
import PartySelector from "./PartySelector";
import ItemSelector, { MenuItem } from "./ItemSelector";
import BillSummary from "./BillSummary";

export default function BillForm() {
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Record<string, { item: MenuItem; quantity: number }>>({});

  // Fetch all menu items
  useEffect(() => {
    fetch("/api/menu/view")
      .then((res) => res.json())
      .then((data) => {
        const allItems: MenuItem[] = data.menus.flatMap((cat: any) => cat.items);
        setMenuItems(allItems);
      });
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: { item, quantity: prev[item.id]?.quantity ? prev[item.id].quantity + 1 : 1 },
    }));
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prev) => {
      const current = prev[item.id];
      if (!current) return prev;

      if (current.quantity <= 1) {
        const newCart = { ...prev };
        delete newCart[item.id];
        return newCart;
      }

      return { ...prev, [item.id]: { ...current, quantity: current.quantity - 1 } };
    });
  };

  const handleGenerateBill = async () => {
    if (!selectedPartyId) alert("Customer not selected, proceeding as walk-in");

    if (Object.values(cart).length === 0) return alert("Cart is empty");

    const billData = {
      partyId: selectedPartyId,
      items: Object.values(cart).map(({ item, quantity }) => ({
        itemId: item.id,
        quantity,
        price: item.price || 0,
      })),
    };

    const res = await fetch("/api/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Bill generated successfully!");
      setCart({});
      setSelectedPartyId(null);
      console.log("Generated bill:", data);
    } else {
      alert(data.error || "Failed to generate bill");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">💰 Create Bill</h1>

      <PartySelector
        selectedPartyId={selectedPartyId}
        setSelectedPartyId={setSelectedPartyId}
        onAddParty={(p) => setSelectedPartyId(p.id)}
      />

      <ItemSelector
        items={menuItems}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />

      <BillSummary cart={cart} setCart={setCart} onGenerateBill={handleGenerateBill} />
    </div>
  );
}
