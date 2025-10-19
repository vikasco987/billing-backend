"use client";

import { MenuItem } from "./ItemSelector";

interface BillSummaryProps {
  cart: Record<string, { item: MenuItem; quantity: number }>;
  setCart: React.Dispatch<React.SetStateAction<Record<string, { item: MenuItem; quantity: number }>>>;
  onGenerateBill: () => void;
}

export default function BillSummary({ cart, setCart, onGenerateBill }: BillSummaryProps) {
  const totalPrice = Object.values(cart).reduce((sum, c) => sum + (c.item.price || 0) * c.quantity, 0);

  const increaseQty = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: prev[id].quantity + 1 },
    }));
  };

  const decreaseQty = (id: string) => {
    setCart((prev) => {
      const current = prev[id];
      if (current.quantity <= 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: { ...current, quantity: current.quantity - 1 } };
    });
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg mb-2">🛒 Cart Summary</h2>
      {Object.values(cart).length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul className="space-y-2">
          {Object.values(cart).map(({ item, quantity }) => (
            <li key={item.id} className="flex justify-between items-center border p-2 rounded">
              <span>
                {item.name} (₹{item.price}) x {quantity}
              </span>
              <div className="flex gap-1">
                <button onClick={() => decreaseQty(item.id)} className="bg-red-500 text-white px-2 rounded">
                  -
                </button>
                <button onClick={() => increaseQty(item.id)} className="bg-green-500 text-white px-2 rounded">
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-2 font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
      <button
        onClick={onGenerateBill}
        disabled={Object.values(cart).length === 0}
        className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        ✅ Generate Bill
      </button>
    </div>
  );
}
