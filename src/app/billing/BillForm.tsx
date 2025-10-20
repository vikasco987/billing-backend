// "use client";

// import { useEffect, useState } from "react";
// import PartySelector from "./PartySelector";
// import ItemSelector, { MenuItem } from "./ItemSelector";
// import BillSummary from "./BillSummary";

// export default function BillForm() {
//   const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [cart, setCart] = useState<Record<string, { item: MenuItem; quantity: number }>>({});

//   useEffect(() => {
//     fetch("/api/menu/view")
//       .then((res) => res.json())
//       .then((data) => {
//         const allItems: MenuItem[] = data.menus.flatMap((cat: any) => cat.items);
//         setMenuItems(allItems);
//       });
//   }, []);

//   const addToCart = (item: MenuItem) => {
//     setCart((prev) => ({
//       ...prev,
//       [item.id]: { item, quantity: prev[item.id]?.quantity ? prev[item.id].quantity + 1 : 1 },
//     }));
//   };

//   const removeFromCart = (item: MenuItem) => {
//     setCart((prev) => {
//       const current = prev[item
// "use client";

// import { useEffect, useState } from "react";
// import PartySelector from "./PartySelector";
// import ItemSelector, { MenuItem } from "./ItemSelector";
// import BillSummary from "./BillSummary";

// export default function BillForm() {
//   const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [cart, setCart] = useState<Record<string, { item: MenuItem; quantity: number }>>({});

//   // Fetch all menu items
//   useEffect(() => {
//     fetch("/api/menu/view")
//       .then((res) => res.json())
//       .then((data) => {
//         const allItems: MenuItem[] = data.menus.flatMap((cat: any) => cat.items);
//         setMenuItems(allItems);
//       });
//   }, []);

//   const addToCart = (item: MenuItem) => {
//     setCart((prev) => ({
//       ...prev,
//       [item.id]: { item, quantity: prev[item.id]?.quantity ? prev[item.id].quantity + 1 : 1 },
//     }));
//   };

//   const removeFromCart = (item: MenuItem) => {
//     setCart((prev) => {
//       const current = prev[item.id];
//       if (!current) return prev;

//       if (current.quantity <= 1) {
//         const newCart = { ...prev };
//         delete newCart[item.id];
//         return newCart;
//       }

//       return { ...prev, [item.id]: { ...current, quantity: current.quantity - 1 } };
//     });
//   };

//   const handleGenerateBill = async () => {
//     if (!selectedPartyId) alert("Customer not selected, proceeding as walk-in");

//     if (Object.values(cart).length === 0) return alert("Cart is empty");

//     const billData = {
//       partyId: selectedPartyId,
//       items: Object.values(cart).map(({ item, quantity }) => ({
//         itemId: item.id,
//         quantity,
//         price: item.price || 0,
//       })),
//     };

//     const res = await fetch("/api/bills", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(billData),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("✅ Bill generated successfully!");
//       setCart({});
//       setSelectedPartyId(null);
//       console.log("Generated bill:", data);
//     } else {
//       alert(data.error || "Failed to generate bill");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">💰 Create Bill</h1>

//       <PartySelector
//         selectedPartyId={selectedPartyId}
//         setSelectedPartyId={setSelectedPartyId}
//         onAddParty={(p) => setSelectedPartyId(p.id)}
//       />

//       <ItemSelector
//         items={menuItems}
//         cart={cart}
//         addToCart={addToCart}
//         removeFromCart={removeFromCart}
//       />

//       <BillSummary cart={cart} setCart={setCart} onGenerateBill={handleGenerateBill} />
//     </div>
//   );
// }





// import { prisma } from "@/lib/prisma";
// import React from "react";

// interface BillPageProps {
//   params: { id: string };
// }

// interface ProductSnapshot {
//   productId: string;
//   quantity: number;
//   price: number;
//   total: number;
//   productName?: string;
// }

// export default async function BillPage({ params }: BillPageProps) {
//   const id = params.id;

//   // Fetch bill with latest snapshot
//   const bill = await prisma.bill.findUnique({
//     where: { id },
//     include: {
//       customer: true,
//       history: {
//         orderBy: { createdAt: "desc" },
//         take: 1,
//       },
//     },
//   });

//   if (!bill) return <div>Bill not found</div>;

//   // Use snapshot products if available
//   const products: ProductSnapshot[] =
//     bill.history?.[0]?.snapshot?.products?.map((p: any) => ({
//       ...p,
//       productName: p.productName || "Deleted Product",
//     })) || [];

//   const handlePrint = () => window.print();

//   return (
//     <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
//       <button
//         onClick={handlePrint}
//         style={{
//           marginBottom: "20px",
//           padding: "10px 15px",
//           backgroundColor: "#4f46e5",
//           color: "white",
//           borderRadius: "5px",
//         }}
//       >
//         🖨️ Print Bill
//       </button>

//       <div style={{ border: "1px solid #ccc", padding: "20px" }}>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           {bill.logoUrl && (
//             <img
//               src={bill.logoUrl}
//               alt="Logo"
//               style={{ maxHeight: "80px", objectFit: "contain" }}
//             />
//           )}
//           <div style={{ textAlign: "right" }}>
//             <h1>{bill.companyName || "Your Company"}</h1>
//             <p>{bill.companyAddress}</p>
//             <p>Phone: {bill.companyPhone}</p>
//             <p>Contact: {bill.contactPerson}</p>
//             {bill.websiteUrl && <p>Website: {bill.websiteUrl}</p>}
//           </div>
//         </div>

//         <hr style={{ margin: "20px 0" }} />

//         <h2>Bill To:</h2>
//         <p>{bill.customer?.name || "Unknown Customer"}</p>
//         <p>{bill.customer?.phone || "N/A"}</p>
//         <p>{bill.customer?.address || "N/A"}</p>

//         <hr style={{ margin: "20px 0" }} />

//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #ccc", padding: "5px" }}>Product</th>
//               <th style={{ border: "1px solid #ccc", padding: "5px" }}>Qty</th>
//               <th style={{ border: "1px solid #ccc", padding: "5px" }}>Price</th>
//               <th style={{ border: "1px solid #ccc", padding: "5px" }}>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p, i) => (
//               <tr key={i}>
//                 <td style={{ border: "1px solid #ccc", padding: "5px" }}>
//                   {p.productName}
//                 </td>
//                 <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.quantity}</td>
//                 <td style={{ border: "1px solid #ccc", padding: "5px" }}>₹{p.price}</td>
//                 <td style={{ border: "1px solid #ccc", padding: "5px" }}>₹{p.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <hr style={{ margin: "20px 0" }} />
//         <p>Total: ₹{bill.total}</p>
//         {bill.discount && <p>Discount: ₹{bill.discount}</p>}
//         {bill.gst && <p>GST: ₹{bill.gst}</p>}
//         <h3>Grand Total: ₹{bill.grandTotal}</h3>

//         {bill.signatureUrl && (
//           <div style={{ marginTop: "40px", textAlign: "right" }}>
//             <img
//               src={bill.signatureUrl}
//               alt="Signature"
//               style={{ maxHeight: "60px", objectFit: "contain" }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// ✅ src/app/billing/[id]/page.tsx
import { prisma } from "@/lib/prisma";

interface BillPageProps {
  params: { id: string };
}

interface ProductSnapshot {
  productId: string;
  quantity: number;
  price: number;
  total: number;
  productName?: string;
}

export default async function BillPage({ params }: BillPageProps) {
  const { id } = params;

  // Fetch bill with latest snapshot
  const bill = await prisma.bill.findUnique({
    where: { id },
    include: {
      customer: true,
      history: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!bill) {
    return <div style={{ padding: 20 }}>❌ Bill not found</div>;
  }

  // Use snapshot products if available
  const products: ProductSnapshot[] =
    bill.history?.[0]?.snapshot?.products?.map((p: any) => ({
      ...p,
      productName: p.productName || "Deleted Product",
    })) || [];

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      {/* ✅ Print Button works directly in browser */}
      <button
        onClick={() => window.print()}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: "#4f46e5",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🖨️ Print Bill
      </button>

      <div style={{ border: "1px solid #ccc", padding: "20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {bill.logoUrl && (
            <img
              src={bill.logoUrl}
              alt="Logo"
              style={{ maxHeight: "80px", objectFit: "contain" }}
            />
          )}
          <div style={{ textAlign: "right" }}>
            <h1>{bill.companyName || "Your Company"}</h1>
            <p>{bill.companyAddress}</p>
            <p>Phone: {bill.companyPhone}</p>
            <p>Contact: {bill.contactPerson}</p>
            {bill.websiteUrl && <p>Website: {bill.websiteUrl}</p>}
          </div>
        </div>

        <hr style={{ margin: "20px 0" }} />

        {/* Customer Info */}
        <h2>Bill To:</h2>
        <p>{bill.customer?.name || "Unknown Customer"}</p>
        <p>{bill.customer?.phone || "N/A"}</p>
        <p>{bill.customer?.address || "N/A"}</p>

        <hr style={{ margin: "20px 0" }} />

        {/* Product Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>Product</th>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>Qty</th>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>Price</th>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                  {p.productName}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.quantity}</td>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>₹{p.price}</td>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>₹{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr style={{ margin: "20px 0" }} />

        {/* Summary */}
        <p>Total: ₹{bill.total}</p>
        {bill.discount && <p>Discount: ₹{bill.discount}</p>}
        {bill.gst && <p>GST: ₹{bill.gst}</p>}
        <h3>Grand Total: ₹{bill.grandTotal}</h3>

        {/* Signature */}
        {bill.signatureUrl && (
          <div style={{ marginTop: "40px", textAlign: "right" }}>
            <img
              src={bill.signatureUrl}
              alt="Signature"
              style={{ maxHeight: "60px", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
