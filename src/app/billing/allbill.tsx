// "use client";

// import React, { useEffect, useState } from "react";

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string; // ISO string
// }

// export default function AllBillsPage() {
//   const [bills, setBills] = useState<SavedBill[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/billing/list") // Make sure your API returns all bills
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) setBills(data);
//         else console.error("Unexpected /api/billing/list format:", data);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading)
//     return <p className="p-6 text-center">Loading bills...</p>;

//   if (bills.length === 0)
//     return <p className="p-6 text-center text-gray-500">No bills generated yet.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">📄 All Generated Bills</h1>

//       <table className="w-full border text-sm">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Customer</th>
//             <th className="border px-2 py-1">Total</th>
//             <th className="border px-2 py-1">Date</th>
//             <th className="border px-2 py-1">Time</th>
//             <th className="border px-2 py-1">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bills.map((bill) => {
//             const date = new Date(bill.createdAt);
//             return (
//               <tr key={bill.id} className="hover:bg-gray-50">
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">{date.toLocaleDateString()}</td>
//                 <td className="border px-2 py-1">{date.toLocaleTimeString()}</td>
//                 <td className="border px-2 py-1 text-center">
//                   <a
//                     href={`/billing/${bill.id}`} // Open bill page
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }














// "use client";

// import React, { useEffect, useState } from "react";

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function AllBills() {
//   const [bills, setBills] = useState<SavedBill[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadBills() {
//       try {
//         const res = await fetch("/api/billing/list");
//         const data = await res.json();

//         if (Array.isArray(data)) {
//           setBills(data);
//         } else {
//           console.error("❌ Unexpected API response:", data);
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch bills:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadBills();
//   }, []);

//   if (loading)
//     return <p className="p-6 text-center">Loading bills...</p>;

//   if (bills.length === 0)
//     return (
//       <p className="p-6 text-center text-gray-500">
//         No bills generated yet.
//       </p>
//     );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">📄 All Generated Bills</h1>

//       <table className="w-full border text-sm">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Customer</th>
//             <th className="border px-2 py-1">Total</th>
//             <th className="border px-2 py-1">Date</th>
//             <th className="border px-2 py-1">Time</th>
//             <th className="border px-2 py-1">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {bills.map((bill) => {
//             const date = new Date(bill.createdAt);

//             return (
//               <tr key={bill.id} className="hover:bg-gray-50">
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">{date.toLocaleDateString()}</td>
//                 <td className="border px-2 py-1">{date.toLocaleTimeString()}</td>

//                 <td className="border px-2 py-1 text-center">
//                   <a
//                     href={`/billing/${bill.id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }






// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function AllBills() {
//   const [bills, setBills] = useState<SavedBill[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadBills() {
//       try {
//         const res = await fetch("/api/billing/list");
//         const data = await res.json();

//         if (Array.isArray(data)) setBills(data);
//         else console.error("❌ Unexpected API response:", data);
//       } catch (error) {
//         console.error("❌ Failed to fetch bills:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadBills();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6">

//       {/* NEW BUTTON HERE */}
//       <div className="mb-4 flex justify-end">
//         <Link
//           href="/bills"
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//         >
//           🔗 Open Bills Page
//         </Link>
//       </div>

//       <h1 className="text-3xl font-bold mb-6">📄 All Generated Bills</h1>

//       {loading && <p className="p-6 text-center">Loading bills...</p>}
//       {!loading && bills.length === 0 && (
//         <p className="p-6 text-center text-gray-500">No bills generated yet.</p>
//       )}

//       {!loading && bills.length > 0 && (
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Time</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bills.map((bill) => {
//               const date = new Date(bill.createdAt);
//               return (
//                 <tr key={bill.id} className="hover:bg-gray-50">
//                   <td className="border px-2 py-1">{bill.customerName}</td>
//                   <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                   <td className="border px-2 py-1">{date.toLocaleDateString()}</td>
//                   <td className="border px-2 py-1">{date.toLocaleTimeString()}</td>
//                   <td className="border px-2 py-1 text-center">
//                     <a
//                       href={`/billing/${bill.id}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       View / Print
//                     </a>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }



















// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function AllBills() {
//   const [bills, setBills] = useState<SavedBill[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadBills() {
//       try {
//         const res = await fetch("/api/billing/list");
//         const data = await res.json();

//         if (Array.isArray(data)) {
//           setBills(data);
//         } else {
//           console.error("❌ API returned unexpected data:", data);
//         }
//       } catch (error) {
//         console.error("❌ Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadBills();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6">

//       {/* ⭐ BUTTON TO GO TO /bills PAGE ⭐ */}
//       <div className="mb-4 flex justify-end">
//         <Link
//           href="/bills"
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//         >
//           🔗 Open Bills Page
//         </Link>
//       </div>

//       <h1 className="text-3xl font-bold mb-6">📄 All Generated Bills</h1>

//       {loading && <p className="p-6 text-center">Loading bills...</p>}
//       {!loading && bills.length === 0 && (
//         <p className="p-6 text-center text-gray-500">No bills generated yet.</p>
//       )}

//       {!loading && bills.length > 0 && (
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Time</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bills.map((bill) => {
//               const date = new Date(bill.createdAt);
//               return (
//                 <tr key={bill.id} className="hover:bg-gray-50">
//                   <td className="border px-2 py-1">{bill.customerName}</td>
//                   <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                   <td className="border px-2 py-1">{date.toLocaleDateString()}</td>
//                   <td className="border px-2 py-1">{date.toLocaleTimeString()}</td>
//                   <td className="border px-2 py-1 text-center">
//                     <a
//                       href={`/billing/${bill.id}`}
//                       target="_blank"
//                       className="text-blue-600 underline"
//                     >
//                       View / Print
//                     </a>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
                                                                                                                                                                                                                                                                                          













"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SavedBill {
  id: string;
  customerName: string;
  grandTotal: number;
  createdAt: string;
}

export default function AllBills() {
  const [bills, setBills] = useState<SavedBill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBills() {
      try {
        const res = await fetch("/api/billing/list");
        const data = await res.json();

        if (Array.isArray(data)) {
          setBills(data);
        } else {
          console.error("❌ API returned unexpected data:", data);
        }
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBills();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-3">📄 All Generated Bills</h1>

      {/* ⭐ BUTTON BELOW TITLE (ALWAYS VISIBLE) ⭐ */}
      <div className="mb-6">
        <Link
          href="/billing"
          className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          ➕ Create New Bill
        </Link>
      </div>

      {loading && <p className="p-6 text-center">Loading bills...</p>}
      {!loading && bills.length === 0 && (
        <p className="p-6 text-center text-gray-500">No bills generated yet.</p>
      )}

      {!loading && bills.length > 0 && (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-2">Customer</th>
              <th className="border px-2 py-2">Total</th>
              <th className="border px-2 py-2">Date</th>
              <th className="border px-2 py-2">Time</th>
              <th className="border px-2 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => {
              const date = new Date(bill.createdAt);
              return (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-2">{bill.customerName}</td>
                  <td className="border px-2 py-2">₹{bill.grandTotal}</td>
                  <td className="border px-2 py-2">
                    {date.toLocaleDateString()}
                  </td>
                  <td className="border px-2 py-2">
                    {date.toLocaleTimeString()}
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <a
                      href={`/billing/${bill.id}`}
                      target="_blank"
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
      )}
    </div>
  );
}
