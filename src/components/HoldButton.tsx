// "use client";

// import React, { useState } from "react";
// import toast from "react-hot-toast";

// type BillItem = {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// };

// type Props = {
//   userClerkId: string;
//   billItems: BillItem[];
//   total: number;
//   onHeld?: () => void;
// };

// export default function HoldButton({ userClerkId, billItems, total, onHeld }: Props) {
//   const [loading, setLoading] = useState(false);

//   const holdBill = async () => {
//     if (!userClerkId) {
//       toast.error("Missing user info!");
//       return;
//     }
//     if (!billItems.length) {
//       toast.error("Add at least one item before holding!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/bills/hold", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId,
//           items: billItems.map((i) => ({
//             id: i.id,
//             itemName: i.itemName,
//             rate: i.rate,
//             quantity: i.quantity,
//             total: i.rate * i.quantity,
//           })),
//           total,
//         }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.message || "Failed to hold bill");
//       }

//       toast.success("✅ Bill held successfully!");
//       onHeld?.(); // callback to refresh held bills / clear current bill
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={holdBill}
//       disabled={loading}
//       className={`px-4 py-2 rounded-md text-white transition ${
//         loading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
//       }`}
//     >
//       {loading ? "Holding..." : "🕐 Hold Bill"}
//     </button>
//   );
// }











"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

type BillItem = {
  id: string;
  itemName: string;
  rate: number;
  quantity: number;
};

type Props = {
  userClerkId: string;
  billItems: BillItem[];
  total: number;
  customerId: string;              // ✅ FIXED (added missing prop)
  onHeld?: () => void;
};

export default function HoldButton({
  userClerkId,
  billItems,
  total,
  customerId,                      // ⬅️ now available
  onHeld
}: Props) {
  const [loading, setLoading] = useState(false);

  const holdBill = async () => {
    if (!userClerkId) {
      toast.error("Missing user info!");
      return;
    }
    if (!customerId) {
      toast.error("Select a customer before holding the bill!");
      return;
    }
    if (!billItems.length) {
      toast.error("Add at least one item before holding!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bills/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userClerkId,
          customerId,               // ✅ FIXED (included in request)
          items: billItems.map((i) => ({
            id: i.id,
            itemName: i.itemName,
            rate: i.rate,
            quantity: i.quantity,
            total: i.rate * i.quantity,
          })),
          total,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to hold bill");
      }

      toast.success("🕐 Bill held successfully!");
      onHeld?.(); // callback: refresh list, clear bill, etc
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={holdBill}
      disabled={loading}
      className={`px-4 py-2 rounded-md text-white transition ${
        loading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
      }`}
    >
      {loading ? "Holding..." : "🕐 Hold Bill"}
    </button>
  );
}
