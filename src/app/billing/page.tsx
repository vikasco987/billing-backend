// "use client";

// import React, { useEffect, useState } from "react";

// export default function BillingPage() {
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [newPartyName, setNewPartyName] = useState("");
//   const [newPartyPhone, setNewPartyPhone] = useState("");
//   const [billItems, setBillItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   // Utility to safely fetch JSON
//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       const text = await res.text();
//       if (!text) return null;
//       return JSON.parse(text);
//     } catch (err) {
//       console.error("Failed to parse JSON from", url, err);
//       return null;
//     }
//   };

//   // Fetch business profile
//   useEffect(() => {
//     fetchJson("/api/profile/recent").then((data) => {
//       if (data) {
//         setCompanyName(data.businessName || "");
//         setCompanyAddress(
//           `${data.contactPersonName || ""}, ${data.contactPersonEmail || ""}, ${data.contactPersonPhone || ""}`
//         );
//         setCompanyPhone(data.contactPersonPhone || "");
//         setContactPerson(data.contactPersonName || "");
//         setCompanyLogo(data.logoUrl || "");
//         setCompanySignature(data.signatureUrl || "");
//         setCompanyWebsite(data.websiteUrl || "");
//       }
//       setLoadingProfile(false);
//     });
//   }, []);

//   // Fetch parties and items + restore cart from localStorage (ViewMenuPage)
//   useEffect(() => {
//     fetchJson("/api/parties").then((data) => data && setParties(data));
//     fetchJson("/api/items").then((data) => data && setItems(data));

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart) as Record<string, any>;
//         const itemsArray = Object.values(cartItems).map((item) => ({
//           id: item.id,
//           itemName: item.name,
//           rate: item.price ?? 0,
//           quantity: item.quantity,
//         }));
//         setBillItems(itemsArray);
//       } catch (err) {
//         console.error("Failed to parse pendingCart", err);
//       }
//     }
//   }, []);

//   const handleAddItem = (item: any) => {
//     const existing = billItems.find((i) => i.id === item.id);
//     if (existing) {
//       setBillItems(
//         billItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         )
//       );
//     } else {
//       setBillItems([...billItems, { ...item, quantity: 1 }]);
//     }
//   };

//   const handleQuantityChange = (id: string, qty: number) => {
//     setBillItems(
//       billItems.map((i) =>
//         i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
//       )
//     );
//   };

//   const total = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

//   const handleAddNewParty = async () => {
//     if (!newPartyName.trim() || !newPartyPhone.trim()) {
//       alert("Please enter name and phone");
//       return;
//     }

//     const res = await fetch("/api/parties", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: newPartyName, phone: newPartyPhone }),
//     });

//     const data = await res.text().then((t) => (t ? JSON.parse(t) : null));

//     if (res.ok && data) {
//       setParties([...parties, data]);
//       setSelectedParty(data.id);
//       setNewPartyName("");
//       setNewPartyPhone("");
//       alert("✅ Customer added!");
//     } else {
//       alert(data?.error || "Failed to add customer");
//     }
//   };

//   const handleGenerateBill = async () => {
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const res = await fetch("/api/bills", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         companyName,
//         companyAddress,
//         companyPhone,
//         contactPerson,
//         logoUrl: companyLogo,
//         signatureUrl: companySignature,
//         websiteUrl: companyWebsite,
//         partyId: selectedParty,
//         items: billItems.map((i) => ({
//           itemId: i.id,
//           quantity: i.quantity,
//           rate: i.rate,
//         })),
//         totalAmount: total,
//       }),
//     });
//     setLoading(false);

//     const data = await res.text().then((t) => (t ? JSON.parse(t) : null));

//     if (res.ok && data) {
//       alert("✅ Bill generated successfully!");
//       setBillItems([]);
//       localStorage.removeItem("pendingCart"); // clear saved cart
//       localStorage.removeItem("pendingTotal");
//     } else {
//       alert(data?.error || "❌ Failed to generate bill.");
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile) return <p className="p-6">Loading business profile...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Company Info */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🏢 Company Info</h2>
//         {companyLogo && (
//           <img src={companyLogo} alt="Company Logo" className="w-32 h-32 object-contain mb-2" />
//         )}
//         <input
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           className="border p-2 w-full rounded"
//           placeholder="Company Name"
//         />
//         <input
//           value={companyAddress}
//           onChange={(e) => setCompanyAddress(e.target.value)}
//           className="border p-2 w-full rounded"
//           placeholder="Company Address"
//         />
//         <input
//           value={companyPhone}
//           onChange={(e) => setCompanyPhone(e.target.value)}
//           className="border p-2 w-full rounded"
//           placeholder="Company Phone"
//         />
//         <input
//           value={contactPerson}
//           onChange={(e) => setContactPerson(e.target.value)}
//           className="border p-2 w-full rounded"
//           placeholder="Contact Person"
//         />
//         <input
//           value={companyWebsite}
//           onChange={(e) => setCompanyWebsite(e.target.value)}
//           className="border p-2 w-full rounded"
//           placeholder="Website URL"
//         />
//       </div>

//       {/* Party Selector */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">👤 Select or Add Customer</h2>
//         <select
//           className="border p-2 rounded w-full"
//           value={selectedParty}
//           onChange={(e) => setSelectedParty(e.target.value)}
//         >
//           <option value="">Select Customer</option>
//           {parties.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.name} ({p.phone})
//             </option>
//           ))}
//         </select>

//         <div className="flex gap-2">
//           <input
//             className="border p-2 flex-1 rounded"
//             placeholder="New Customer Name"
//             value={newPartyName}
//             onChange={(e) => setNewPartyName(e.target.value)}
//           />
//           <input
//             className="border p-2 flex-1 rounded"
//             placeholder="Phone"
//             value={newPartyPhone}
//             onChange={(e) => setNewPartyPhone(e.target.value)}
//           />
//           <button
//             onClick={handleAddNewParty}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             ➕ Add
//           </button>
//         </div>
//       </div>

//       {/* Items */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🛒 Select Items</h2>
//         {billItems.length === 0 && items.length === 0 && (
//           <p>No items found. Please add items first.</p>
//         )}
//         {items.map((item) => {
//           const inCart = billItems.find((i) => i.id === item.id)?.quantity || 0;
//           return (
//             <div key={item.id} className="flex justify-between border-b py-2 items-center">
//               <div>
//                 <span className="font-medium">{item.itemName}</span>
//                 <span className="text-sm text-gray-500 ml-2">₹{item.rate}</span>
//               </div>
//               <button
//                 onClick={() => handleAddItem(item)}
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Add
//               </button>
//               {inCart > 0 && <span className="ml-2 font-semibold text-green-600">{inCart}</span>}
//             </div>
//           );
//         })}
//       </div>

//       {/* Bill Summary */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>
//         {billItems.length === 0 && <p>No items added yet.</p>}
//         {billItems.map((bi) => (
//           <div key={bi.id} className="flex justify-between items-center border-b py-2">
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 value={bi.quantity}
//                 min="1"
//                 onChange={(e) =>
//                   handleQuantityChange(bi.id, parseInt(e.target.value))
//                 }
//                 className="w-16 border p-1 rounded text-center"
//               />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <div className="font-bold text-right mt-2">Total: ₹{total}</div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end">
//         <button
//           onClick={handleGenerateBill}
//           disabled={loading}
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//         >
//           💾 {loading ? "Saving..." : "Generate Bill"}
//         </button>
//         <button
//           onClick={handlePrint}
//           className="bg-gray-700 text-white px-4 py-2 rounded"
//         >
//           🖨️ Print
//         </button>
//       </div>
//     </div>
//   );
// }

















// "use client";

// import React, { useEffect, useState } from "react";

// export default function BillingPage() {
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [newPartyName, setNewPartyName] = useState("");
//   const [newPartyPhone, setNewPartyPhone] = useState("");
//   const [billItems, setBillItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       const text = await res.text();
//       if (!text) return null;
//       return JSON.parse(text);
//     } catch (err) {
//       console.error("Failed to parse JSON from", url, err);
//       return null;
//     }
//   };

//   useEffect(() => {
//     fetchJson("/api/profile/recent").then((data) => {
//       if (data) {
//         setCompanyName(data.businessName || "");
//         setCompanyAddress(
//           `${data.contactPersonName || ""}, ${data.contactPersonEmail || ""}, ${data.contactPersonPhone || ""}`
//         );
//         setCompanyPhone(data.contactPersonPhone || "");
//         setContactPerson(data.contactPersonName || "");
//         setCompanyLogo(data.logoUrl || "");
//         setCompanySignature(data.signatureUrl || "");
//         setCompanyWebsite(data.websiteUrl || "");
//       }
//       setLoadingProfile(false);
//     });
//   }, []);

//   useEffect(() => {
//     fetchJson("/api/parties").then((data) => data && setParties(data));
//     fetchJson("/api/items").then((data) => data && setItems(data));

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart) as Record<string, any>;
//         const itemsArray = Object.values(cartItems).map((item) => ({
//           id: item.id,
//           itemName: item.name,
//           rate: item.price ?? 0,
//           quantity: item.quantity,
//         }));
//         setBillItems(itemsArray);
//       } catch (err) {
//         console.error("Failed to parse pendingCart", err);
//       }
//     }
//   }, []);

//   const handleAddItem = (item: any) => {
//     const existing = billItems.find((i) => i.id === item.id);
//     if (existing) {
//       setBillItems(
//         billItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         )
//       );
//     } else {
//       setBillItems([...billItems, { ...item, quantity: 1 }]);
//     }
//   };

//   const handleQuantityChange = (id: string, qty: number) => {
//     setBillItems(
//       billItems.map((i) =>
//         i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
//       )
//     );
//   };

//   const total = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

//   const handleAddNewParty = async () => {
//     if (!newPartyName.trim() || !newPartyPhone.trim()) {
//       alert("Please enter name and phone");
//       return;
//     }

//     const res = await fetch("/api/parties", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: newPartyName, phone: newPartyPhone }),
//     });

//     const data = await res.text().then((t) => (t ? JSON.parse(t) : null));

//     if (res.ok && data) {
//       setParties([...parties, data]);
//       setSelectedParty(data.id);
//       setNewPartyName("");
//       setNewPartyPhone("");
//       alert("✅ Customer added!");
//     } else {
//       alert(data?.error || "Failed to add customer");
//     }
//   };

//   const handleGenerateBill = async () => {
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     const res = await fetch("/api/bills", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: "USER_ID_HERE", // replace with Clerk ID or session user
//         customerId: party?.id,
//         companyName,
//         companyAddress,
//         companyPhone,
//         contactPerson,
//         logoUrl: companyLogo,
//         signatureUrl: companySignature,
//         websiteUrl: companyWebsite,
//         products: billItems.map((i) => ({
//           productId: i.id,
//           quantity: i.quantity,
//           price: i.rate,
//           total: i.rate * i.quantity,
//         })),
//         total,
//       }),
//     });

//     setLoading(false);

//     const data = await res.text().then((t) => (t ? JSON.parse(t) : null));

//     if (res.ok && data) {
//       alert("✅ Bill saved successfully!");
//       setBillItems([]);
//       localStorage.removeItem("pendingCart");
//       localStorage.removeItem("pendingTotal");
//     } else {
//       alert(data?.error || "❌ Failed to save bill.");
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile) return <p className="p-6">Loading business profile...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Company Info */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🏢 Company Info</h2>
//         {companyLogo && <img src={companyLogo} alt="Logo" className="w-32 h-32 object-contain mb-2" />}
//         <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Name" />
//         <input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Address" />
//         <input value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Phone" />
//         <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="border p-2 w-full rounded" placeholder="Contact Person" />
//         <input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="border p-2 w-full rounded" placeholder="Website URL" />
//       </div>

//       {/* Party Selector */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">👤 Select or Add Customer</h2>
//         <select className="border p-2 rounded w-full" value={selectedParty} onChange={(e) => setSelectedParty(e.target.value)}>
//           <option value="">Select Customer</option>
//           {parties.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>)}
//         </select>
//         <div className="flex gap-2 mt-2">
//           <input className="border p-2 flex-1 rounded" placeholder="New Customer Name" value={newPartyName} onChange={(e) => setNewPartyName(e.target.value)} />
//           <input className="border p-2 flex-1 rounded" placeholder="Phone" value={newPartyPhone} onChange={(e) => setNewPartyPhone(e.target.value)} />
//           <button onClick={handleAddNewParty} className="bg-blue-600 text-white px-4 py-2 rounded">➕ Add</button>
//         </div>
//       </div>

//       {/* Items */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🛒 Select Items</h2>
//         {items.map((item) => {
//           const inCart = billItems.find((i) => i.id === item.id)?.quantity || 0;
//           return (
//             <div key={item.id} className="flex justify-between border-b py-2 items-center">
//               <div>
//                 <span className="font-medium">{item.itemName}</span>
//                 <span className="text-sm text-gray-500 ml-2">₹{item.rate}</span>
//               </div>
//               <button onClick={() => handleAddItem(item)} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
//               {inCart > 0 && <span className="ml-2 font-semibold text-green-600">{inCart}</span>}
//             </div>
//           );
//         })}
//       </div>

//       {/* Bill Summary */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>
//         {billItems.map((bi) => (
//           <div key={bi.id} className="flex justify-between items-center border-b py-2">
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input type="number" value={bi.quantity} min="1" onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))} className="w-16 border p-1 rounded text-center" />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <div className="font-bold text-right mt-2">Total: ₹{total}</div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end">
//         <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
//           💾 {loading ? "Saving..." : "Generate Bill"}
//         </button>
//         <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">🖨️ Print</button>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";

export default function BillingPage() {
  const [companyName, setCompanyName] = useState("My Billing Firm");
  const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
  const [companyPhone, setCompanyPhone] = useState("9876543210");
  const [contactPerson, setContactPerson] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companySignature, setCompanySignature] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const [parties, setParties] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedParty, setSelectedParty] = useState("");
  const [newPartyName, setNewPartyName] = useState("");
  const [newPartyPhone, setNewPartyPhone] = useState("");
  const [billItems, setBillItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Safe fetch JSON
  const fetchJson = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
    } catch (err) {
      console.error("Failed to fetch JSON from", url, err);
      return null;
    }
  };

  // Load business profile
  useEffect(() => {
    fetchJson("/api/profile/recent").then((data) => {
      if (data) {
        setCompanyName(data.businessName || "");
        setCompanyAddress(
          `${data.contactPersonName || ""}, ${data.contactPersonEmail || ""}, ${data.contactPersonPhone || ""}`
        );
        setCompanyPhone(data.contactPersonPhone || "");
        setContactPerson(data.contactPersonName || "");
        setCompanyLogo(data.logoUrl || "");
        setCompanySignature(data.signatureUrl || "");
        setCompanyWebsite(data.websiteUrl || "");
      }
      setLoadingProfile(false);
    });
  }, []);

  // Load parties, items, and restore cart
  useEffect(() => {
    fetchJson("/api/parties").then((data) => data && setParties(data));
    fetchJson("/api/items").then((data) => data && setItems(data));

    const pendingCart = localStorage.getItem("pendingCart");
    if (pendingCart) {
      try {
        const cartItems = JSON.parse(pendingCart) as Record<string, any>;
        const itemsArray = Object.values(cartItems).map((item) => ({
          id: item.id,
          itemName: item.name,
          rate: item.price ?? 0,
          quantity: item.quantity,
        }));
        setBillItems(itemsArray);
      } catch (err) {
        console.error("Failed to parse pendingCart", err);
      }
    }
  }, []);

  const handleAddItem = (item: any) => {
    const existing = billItems.find((i) => i.id === item.id);
    if (existing) {
      setBillItems(
        billItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setBillItems([...billItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id: string, qty: number) => {
    setBillItems(
      billItems.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
      )
    );
  };

  const total = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

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
        setParties([...parties, data]);
        setSelectedParty(data.id);
        setNewPartyName("");
        setNewPartyPhone("");
        alert("✅ Customer added!");
      } else {
        alert(data?.error || "Failed to add customer");
      }
    } catch (err) {
      console.error("Add party failed", err);
      alert("❌ Failed to add customer. Check console.");
    }
  };

  const handleGenerateBill = async () => {
    if (!selectedParty) return alert("Please select a customer!");
    if (!billItems.length) return alert("Add at least one item!");

    setLoading(true);
    const party = parties.find((p) => p.id === selectedParty);

    try {
      const res = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "USER_ID_HERE", // replace with Clerk ID/session
          customerId: party?.id,
          companyName,
          companyAddress,
          companyPhone,
          contactPerson,
          logoUrl: companyLogo,
          signatureUrl: companySignature,
          websiteUrl: companyWebsite,
          products: billItems.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.rate,
            total: i.rate * i.quantity,
          })),
          total,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Bill saved successfully!");
        setBillItems([]);
        localStorage.removeItem("pendingCart");
        localStorage.removeItem("pendingTotal");
      } else {
        alert(data?.error || "❌ Failed to save bill.");
      }
    } catch (err) {
      console.error("Bill generation failed", err);
      alert("❌ Failed to save bill. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => window.print();

  if (loadingProfile) return <p className="p-6">Loading business profile...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

      {/* Company Info */}
      <div className="space-y-2 mb-6">
        <h2 className="font-semibold">🏢 Company Info</h2>
        {companyLogo && <img src={companyLogo} alt="Logo" className="w-32 h-32 object-contain mb-2" />}
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Name" />
        <input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Address" />
        <input value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Phone" />
        <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="border p-2 w-full rounded" placeholder="Contact Person" />
        <input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="border p-2 w-full rounded" placeholder="Website URL" />
      </div>

      {/* Party Selector */}
      <div className="space-y-2 mb-6">
        <h2 className="font-semibold">👤 Select or Add Customer</h2>
        <select className="border p-2 rounded w-full" value={selectedParty} onChange={(e) => setSelectedParty(e.target.value)}>
          <option value="">Select Customer</option>
          {parties.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>)}
        </select>
        <div className="flex gap-2 mt-2">
          <input className="border p-2 flex-1 rounded" placeholder="New Customer Name" value={newPartyName} onChange={(e) => setNewPartyName(e.target.value)} />
          <input className="border p-2 flex-1 rounded" placeholder="Phone" value={newPartyPhone} onChange={(e) => setNewPartyPhone(e.target.value)} />
          <button onClick={handleAddNewParty} className="bg-blue-600 text-white px-4 py-2 rounded">➕ Add</button>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2 mb-6">
        <h2 className="font-semibold">🛒 Select Items</h2>
        {items.map((item) => {
          const inCart = billItems.find((i) => i.id === item.id)?.quantity || 0;
          return (
            <div key={item.id} className="flex justify-between border-b py-2 items-center">
              <div>
                <span className="font-medium">{item.itemName}</span>
                <span className="text-sm text-gray-500 ml-2">₹{item.rate}</span>
              </div>
              <button onClick={() => handleAddItem(item)} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
              {inCart > 0 && <span className="ml-2 font-semibold text-green-600">{inCart}</span>}
            </div>
          );
        })}
      </div>

      {/* Bill Summary */}
      <div className="space-y-2 mb-6 border-t pt-4">
        <h2 className="font-semibold">📋 Bill Summary</h2>
        {billItems.map((bi) => (
          <div key={bi.id} className="flex justify-between items-center border-b py-2">
            <span>{bi.itemName}</span>
            <div className="flex items-center gap-2">
              <input type="number" value={bi.quantity} min="1" onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))} className="w-16 border p-1 rounded text-center" />
              <span>₹{bi.rate * bi.quantity}</span>
            </div>
          </div>
        ))}
        <div className="font-bold text-right mt-2">Total: ₹{total}</div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
          💾 {loading ? "Saving..." : "Generate Bill"}
        </button>
        <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">🖨️ Print</button>
      </div>
    </div>
  );
}
