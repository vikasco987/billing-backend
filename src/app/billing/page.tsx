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

//   // Safe fetch JSON
//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
//       return null;
//     }
//   };

//   // Load business profile
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

//   // Load parties, items, and restore cart
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

//     try {
//       const res = await fetch("/api/parties", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newPartyName, phone: newPartyPhone }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setParties([...parties, data]);
//         setSelectedParty(data.id);
//         setNewPartyName("");
//         setNewPartyPhone("");
//         alert("✅ Customer added!");
//       } else {
//         alert(data?.error || "Failed to add customer");
//       }
//     } catch (err) {
//       console.error("Add party failed", err);
//       alert("❌ Failed to add customer. Check console.");
//     }
//   };

//   const handleGenerateBill = async () => {
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     try {
//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: "USER_ID_HERE", // replace with Clerk ID/session
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products: billItems.map((i) => ({
//             productId: i.id,
//             quantity: i.quantity,
//             price: i.rate,
//             total: i.rate * i.quantity,
//           })),
//           total,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill. Check console.");
//     } finally {
//       setLoading(false);
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










// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";

// export default function BillingPage() {
//   const { user } = useUser(); // ✅ Get current Clerk user
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
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
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

//     try {
//       const res = await fetch("/api/parties", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newPartyName, phone: newPartyPhone }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setParties([...parties, data]);
//         setSelectedParty(data.id);
//         setNewPartyName("");
//         setNewPartyPhone("");
//         alert("✅ Customer added!");
//       } else {
//         alert(data?.error || "Failed to add customer");
//       }
//     } catch (err) {
//       console.error("Add party failed", err);
//       alert("❌ Failed to add customer. Check console.");
//     }
//   };

//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     try {
//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id, // ✅ send Clerk ID
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products: billItems.map((i) => ({
//             productId: i.id,
//             quantity: i.quantity,
//             price: i.rate,
//             total: i.rate * i.quantity,
//           })),
//           total,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill. Check console.");
//     } finally {
//       setLoading(false);
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









// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";

// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// export default function BillingPage() {
//   const { user } = useUser();
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
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
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
//         const itemsArray = Object.values(cartItems)
//           .filter(item => item.id && item.name)
//           .map((item) => ({
//             id: item.id,
//             itemName: item.name,
//             rate: item.price ?? 0,
//             quantity: item.quantity ?? 1,
//           }));
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

//     try {
//       const res = await fetch("/api/parties", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newPartyName, phone: newPartyPhone }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setParties([...parties, data]);
//         setSelectedParty(data.id);
//         setNewPartyName("");
//         setNewPartyPhone("");
//         alert("✅ Customer added!");
//       } else {
//         alert(data?.error || "Failed to add customer");
//       }
//     } catch (err) {
//       console.error("Add party failed", err);
//       alert("❌ Failed to add customer. Check console.");
//     }
//   };

//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       // Remove any products with missing productId to avoid Prisma null errors
//       const validProducts = products.filter(p => p.productId);

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products: validProducts,
//           total,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill. Check console.");
//     } finally {
//       setLoading(false);
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










// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";

// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function BillingPage() {
//   const { user } = useUser();
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [newPartyName, setNewPartyName] = useState("");
//   const [newPartyPhone, setNewPartyPhone] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
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
//     fetchJson("/api/billing/list").then((data) => data && setSavedBills(data)); // Fetch saved bills

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart) as Record<string, any>;
//         const itemsArray = Object.values(cartItems)
//           .filter((item) => item.id && item.name)
//           .map((item) => ({
//             id: item.id,
//             itemName: item.name,
//             rate: item.price ?? 0,
//             quantity: item.quantity ?? 1,
//           }));
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

//     try {
//       const res = await fetch("/api/parties", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newPartyName, phone: newPartyPhone }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setParties([...parties, data]);
//         setSelectedParty(data.id);
//         setNewPartyName("");
//         setNewPartyPhone("");
//         alert("✅ Customer added!");
//       } else {
//         alert(data?.error || "Failed to add customer");
//       }
//     } catch (err) {
//       console.error("Add party failed", err);
//       alert("❌ Failed to add customer. Check console.");
//     }
//   };

//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const validProducts = products.filter((p) => p.productId);

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products: validProducts,
//           total,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");

//         // Refresh saved bills list
//         setSavedBills((prev) => [...prev, {
//           id: data.id,
//           customerName: party?.name || "",
//           grandTotal: total,
//           createdAt: new Date().toISOString(),
//         }]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill. Check console.");
//     } finally {
//       setLoading(false);
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
//               <input type="number" value={bi.quantity} min={1} onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))} className="w-16 border p-1 rounded text-center" />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <div className="font-bold text-right mt-2">Total: ₹{total}</div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end mb-6">
//         <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
//           💾 {loading ? "Saving..." : "Generate Bill"}
//         </button>
//         <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">🖨️ Print</button>
//       </div>

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">{new Date(bill.createdAt).toLocaleDateString()}</td>
//                 <td className="border px-2 py-1">
//                   <a href={`/billing/${bill.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//             {savedBills.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-2 text-gray-500">No bills yet</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }











// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";

// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function BillingPage() {
//   const { user } = useUser();

//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [newPartyName, setNewPartyName] = useState("");
//   const [newPartyPhone, setNewPartyPhone] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   // ✅ Helper fetch wrapper
//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
//       return null;
//     }
//   };

//   // ✅ Load company profile
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

//   // ✅ Load parties, items, and saved bills
//   useEffect(() => {
//     fetchJson("/api/parties").then((data) => data && setParties(data));
//     fetchJson("/api/items").then((data) => data && setItems(data));
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         // API returns an array of bills directly
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       } else {
//         console.error("Unexpected /api/billing/list format:", data);
//       }
//     });

//     // ✅ Restore draft bill from localStorage
//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart) as Record<string, any>;
//         const itemsArray = Object.values(cartItems)
//           .filter((item: any) => item.id && item.name)
//           .map((item: any) => ({
//             id: item.id,
//             itemName: item.name,
//             rate: item.price ?? 0,
//             quantity: item.quantity ?? 1,
//           }));
//         setBillItems(itemsArray);
//       } catch (err) {
//         console.error("Failed to parse pendingCart", err);
//       }
//     }
//   }, []);

//   // ✅ Add item to current bill
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

//   // ✅ Change quantity
//   const handleQuantityChange = (id: string, qty: number) => {
//     setBillItems(
//       billItems.map((i) =>
//         i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
//       )
//     );
//   };

//   const total = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

//   // ✅ Add new customer
//   const handleAddNewParty = async () => {
//     if (!newPartyName.trim() || !newPartyPhone.trim()) {
//       alert("Please enter name and phone");
//       return;
//     }

//     try {
//       const res = await fetch("/api/parties", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newPartyName, phone: newPartyPhone }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setParties([...parties, data]);
//         setSelectedParty(data.id);
//         setNewPartyName("");
//         setNewPartyPhone("");
//         alert("✅ Customer added!");
//       } else {
//         alert(data?.error || "Failed to add customer");
//       }
//     } catch (err) {
//       console.error("Add party failed", err);
//       alert("❌ Failed to add customer. Check console.");
//     }
//   };

//   // ✅ Generate bill






// const handleGenerateBill = async () => {
//   if (!user?.id) return alert("User not authenticated!");
//   if (!selectedParty) return alert("Please select a customer!");
//   if (!billItems.length) return alert("Add at least one item!");

//   setLoading(true);
//   const party = parties.find((p) => p.id === selectedParty);

//   try {
//     const products = billItems.map((i) => ({
//       productId: i.id,
//       productName: i.itemName, // ✅ Save the item name here
//       quantity: i.quantity,
//       price: i.rate,
//       total: i.rate * i.quantity,
//     }));

//     const validProducts = products.filter((p) => p.productId);

//     const res = await fetch("/api/billing", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userClerkId: user.id,
//         customerId: party?.id,
//         companyName,
//         companyAddress,
//         companyPhone,
//         contactPerson,
//         logoUrl: companyLogo,
//         signatureUrl: companySignature,
//         websiteUrl: companyWebsite,
//         products: validProducts,
//         total,
//       }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("✅ Bill saved successfully!");
//       setBillItems([]);
//       localStorage.removeItem("pendingCart");
//       localStorage.removeItem("pendingTotal");

//       // ✅ Append new bill to savedBills
//       setSavedBills((prev) => [
//         ...prev,
//         {
//           id: data.id,
//           customerName: party?.name || "",
//           grandTotal: total,
//           createdAt: new Date().toISOString(),
//         },
//       ]);
//     } else {
//       alert(data?.error || "❌ Failed to save bill.");
//     }
//   } catch (err) {
//     console.error("Bill generation failed", err);
//     alert("❌ Failed to save bill. Check console.");
//   } finally {
//     setLoading(false);
//   }
// };





//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Company Info */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🏢 Company Info</h2>
//         {companyLogo && (
//           <img
//             src={companyLogo}
//             alt="Logo"
//             className="w-32 h-32 object-contain mb-2"
//           />
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
//         <div className="flex gap-2 mt-2">
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
//         {items.map((item) => {
//           const inCart = billItems.find((i) => i.id === item.id)?.quantity || 0;
//           return (
//             <div
//               key={item.id}
//               className="flex justify-between border-b py-2 items-center"
//             >
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
//               {inCart > 0 && (
//                 <span className="ml-2 font-semibold text-green-600">
//                   {inCart}
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Bill Summary */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>
//         {billItems.map((bi) => (
//           <div
//             key={bi.id}
//             className="flex justify-between items-center border-b py-2"
//           >
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 value={bi.quantity}
//                 min={1}
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
//       <div className="flex gap-3 justify-end mb-6">
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

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">
//                   {new Date(bill.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="border px-2 py-1 text-center">
//                   <a
//                     href={`/billing/view//${bill.id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//             {savedBills.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="text-center py-2 text-gray-500"
//                 >
//                   No bills yet
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }














// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import PartySelector from "./PartySelector"; // ✅ Import the new component

// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function BillingPage() {
//   const { user } = useUser();

//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
//       return null;
//     }
//   };

//   // Load company profile
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

//   // Load parties, items, and saved bills
//   useEffect(() => {
//     fetchJson("/api/parties").then((data) => data && setParties(data));
//     fetchJson("/api/items").then((data) => data && setItems(data));
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       }
//     });

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart) as Record<string, any>;
//         const itemsArray = Object.values(cartItems)
//           .filter((item: any) => item.id && item.name)
//           .map((item: any) => ({
//             id: item.id,
//             itemName: item.name,
//             rate: item.price ?? 0,
//             quantity: item.quantity ?? 1,
//           }));
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

//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         productName: i.itemName,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const validProducts = products.filter((p) => p.productId);

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products: validProducts,
//           total,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");

//         setSavedBills((prev) => [
//           ...prev,
//           {
//             id: data.id,
//             customerName: party?.name || "",
//             grandTotal: total,
//             createdAt: new Date().toISOString(),
//           },
//         ]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Company Info */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🏢 Company Info</h2>
//         {companyLogo && (
//           <img
//             src={companyLogo}
//             alt="Logo"
//             className="w-32 h-32 object-contain mb-2"
//           />
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
//       <PartySelector
//         parties={parties}
//         selectedParty={selectedParty}
//         setSelectedParty={setSelectedParty}
//         refreshParties={() => fetchJson("/api/parties").then((data) => data && setParties(data))}
//       />

//       {/* Items */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🛒 Select Items</h2>
//         {items.map((item) => {
//           const inCart = billItems.find((i) => i.id === item.id)?.quantity || 0;
//           return (
//             <div
//               key={item.id}
//               className="flex justify-between border-b py-2 items-center"
//             >
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
//               {inCart > 0 && (
//                 <span className="ml-2 font-semibold text-green-600">
//                   {inCart}
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Bill Summary */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>
//         {billItems.map((bi) => (
//           <div
//             key={bi.id}
//             className="flex justify-between items-center border-b py-2"
//           >
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 value={bi.quantity}
//                 min={1}
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
//       <div className="flex gap-3 justify-end mb-6">
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

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">
//                   {new Date(bill.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="border px-2 py-1 text-center">
//                   <a
//                     href={`/billing/view//${bill.id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//             {savedBills.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="text-center py-2 text-gray-500"
//                 >
//                   No bills yet
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }















// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import PartySelector from "./PartySelector";

// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function BillingPage() {
//   const { user } = useUser();

//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
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
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       }
//     });

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart) as Record<string, any>;
//         const itemsArray = Object.values(cartItems)
//           .filter((item: any) => item.id && item.name)
//           .map((item: any) => ({
//             id: item.id,
//             itemName: item.name,
//             rate: item.price ?? 0,
//             quantity: item.quantity ?? 1,
//           }));
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

//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         productName: i.itemName,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const validProducts = products.filter((p) => p.productId);

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products: validProducts,
//           total,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");

//         setSavedBills((prev) => [
//           ...prev,
//           {
//             id: data.id,
//             customerName: party?.name || "",
//             grandTotal: total,
//             createdAt: new Date().toISOString(),
//           },
//         ]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

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
//       <PartySelector
//         parties={parties}
//         selectedParty={selectedParty}
//         setSelectedParty={setSelectedParty}
//         refreshParties={() => fetchJson("/api/parties").then((data) => data && setParties(data))}
//       />

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
//               <button onClick={() => handleAddItem(item)} className="bg-green-500 text-white px-3 py-1 rounded">
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
//         {billItems.map((bi) => (
//           <div key={bi.id} className="flex justify-between items-center border-b py-2">
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input type="number" min={1} value={bi.quantity} onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))} className="w-16 border p-1 rounded text-center" />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <div className="font-bold text-right mt-2">Total: ₹{total}</div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end mb-6">
//         <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
//           💾 {loading ? "Saving..." : "Generate Bill"}
//         </button>
//         <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">
//           🖨️ Print
//         </button>
//       </div>

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-2 text-gray-500">No bills yet</td>
//               </tr>
//             )}
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">{new Date(bill.createdAt).toLocaleDateString()}</td>
//                 <td className="border px-2 py-1 text-center">
//                   <a href={`/billing/view/${bill.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View / Print</a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }









// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import PartySelector from "./PartySelector";

// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function BillingPage() {
//   const { user } = useUser();

//   // Company info states
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   // Toggle visibility of company info
//   const [showCompanyInfo, setShowCompanyInfo] = useState(false);

//   // Billing states
//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   // Discount & GST
//   const [discount, setDiscount] = useState(0);
//   const [gstPercent, setGstPercent] = useState(18);

//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
//       return null;
//     }
//   };

//   // Load company profile
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

//   // Load parties, items, saved bills, and pending cart
//   useEffect(() => {
//     fetchJson("/api/parties").then((data) => data && setParties(data));
//     fetchJson("/api/items").then((data) => data && setItems(data));
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       }
//     });

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart) as Record<string, any>;
//         const itemsArray = Object.values(cartItems)
//           .filter((item: any) => item.id && item.name)
//           .map((item: any) => ({
//             id: item.id,
//             itemName: item.name,
//             rate: item.price ?? 0,
//             quantity: item.quantity ?? 1,
//           }));
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

//   const subtotal = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);
//   const gstAmount = ((subtotal - discount) * gstPercent) / 100;
//   const grandTotal = subtotal - discount + gstAmount;

//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         productName: i.itemName,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const validProducts = products.filter((p) => p.productId);

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products: validProducts,
//           subtotal,
//           discount,
//           gstPercent,
//           gstAmount,
//           total: grandTotal,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");

//         setSavedBills((prev) => [
//           ...prev,
//           {
//             id: data.id,
//             customerName: party?.name || "",
//             grandTotal,
//             createdAt: new Date().toISOString(),
//           },
//         ]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Edit Company Profile Button */}
//       <div className="mb-6">
//         <button
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//           onClick={() => setShowCompanyInfo(!showCompanyInfo)}
//         >
//           {showCompanyInfo ? "Hide Company Profile" : "Edit Company Profile"}
//         </button>
//       </div>

//       {/* Company Info (hidden by default) */}
//       {showCompanyInfo && (
//         <div className="space-y-2 mb-6">
//           {companyLogo && (
//             <img
//               src={companyLogo}
//               alt="Logo"
//               className="w-32 h-32 object-contain mb-2"
//             />
//           )}
//           <input
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Company Name"
//           />
//           <input
//             value={companyAddress}
//             onChange={(e) => setCompanyAddress(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Company Address"
//           />
//           <input
//             value={companyPhone}
//             onChange={(e) => setCompanyPhone(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Company Phone"
//           />
//           <input
//             value={contactPerson}
//             onChange={(e) => setContactPerson(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Contact Person"
//           />
//           <input
//             value={companyWebsite}
//             onChange={(e) => setCompanyWebsite(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Website URL"
//           />
//         </div>
//       )}

//       {/* Party Selector */}
//       <PartySelector
//         parties={parties}
//         selectedParty={selectedParty}
//         setSelectedParty={setSelectedParty}
//         refreshParties={() =>
//           fetchJson("/api/parties").then((data) => data && setParties(data))
//         }
//       />

//       {/* Items */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🛒 Select Items</h2>
//         {items.map((item) => {
//           const inCart = billItems.find((i) => i.id === item.id)?.quantity || 0;
//           return (
//             <div
//               key={item.id}
//               className="flex justify-between border-b py-2 items-center"
//             >
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
//               {inCart > 0 && (
//                 <span className="ml-2 font-semibold text-green-600">{inCart}</span>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Bill Summary */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>

//         {billItems.map((bi) => (
//           <div
//             key={bi.id}
//             className="flex justify-between items-center border-b py-2"
//           >
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 min={1}
//                 value={bi.quantity}
//                 onChange={(e) =>
//                   handleQuantityChange(bi.id, parseInt(e.target.value))
//                 }
//                 className="w-16 border p-1 rounded text-center"
//               />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}

//         {/* Subtotal */}
//         <div className="flex justify-between font-medium">
//           <span>Subtotal:</span>
//           <span>₹{subtotal}</span>
//         </div>

//         {/* Discount */}
//         <div className="flex justify-between items-center">
//           <span>Discount (₹):</span>
//           <input
//             type="number"
//             min={0}
//             value={discount}
//             onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
//             className="w-24 border p-1 rounded text-right"
//           />
//         </div>

//         {/* GST */}
//         <div className="flex justify-between items-center">
//           <span>GST ({gstPercent}%):</span>
//           <span>₹{gstAmount.toFixed(2)}</span>
//         </div>

//         {/* Grand Total */}
//         <div className="font-bold text-right text-lg mt-2">
//           Grand Total: ₹{grandTotal.toFixed(2)}
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end mb-6">
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

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-2 text-gray-500">
//                   No bills yet
//                 </td>
//               </tr>
//             )}
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">
//                   {new Date(bill.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="border px-2 py-1 text-center">
//                   <a
//                     href={`/billing/view/${bill.id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }








// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import PartySelector from "./PartySelector";

// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// export default function BillingPage() {
//   const { user } = useUser();

//   // Company info states
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   // Toggle visibility of company info
//   const [showCompanyInfo, setShowCompanyInfo] = useState(false);

//   // Billing states
//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Failed to fetch JSON from", url, err);
//       return null;
//     }
//   };

//   // Load company profile
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

//   // Load parties, items, saved bills, and pending cart
//   useEffect(() => {
//     fetchJson("/api/parties").then((data) => data && setParties(data));
//     fetchJson("/api/items").then((data) => data && setItems(data));
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       }
//     });

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart) as Record<string, any>;
//         const itemsArray = Object.values(cartItems)
//           .filter((item: any) => item.id && item.name)
//           .map((item: any) => ({
//             id: item.id,
//             itemName: item.name,
//             rate: item.price ?? 0,
//             quantity: item.quantity ?? 1,
//           }));
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

//   const subtotal = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);

//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         productName: i.itemName,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const validProducts = products.filter((p) => p.productId);

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products: validProducts,
//           total: subtotal,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");

//         setSavedBills((prev) => [
//           ...prev,
//           {
//             id: data.id,
//             customerName: party?.name || "",
//             grandTotal: subtotal,
//             createdAt: new Date().toISOString(),
//           },
//         ]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Edit Company Profile Button */}
//       <div className="mb-6">
//         <button
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//           onClick={() => setShowCompanyInfo(!showCompanyInfo)}
//         >
//           {showCompanyInfo ? "Hide Company Profile" : "Edit Company Profile"}
//         </button>
//       </div>

//       {/* Company Info (hidden by default) */}
//       {showCompanyInfo && (
//         <div className="space-y-2 mb-6">
//           {companyLogo && (
//             <img
//               src={companyLogo}
//               alt="Logo"
//               className="w-32 h-32 object-contain mb-2"
//             />
//           )}
//           <input
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Company Name"
//           />
//           <input
//             value={companyAddress}
//             onChange={(e) => setCompanyAddress(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Company Address"
//           />
//           <input
//             value={companyPhone}
//             onChange={(e) => setCompanyPhone(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Company Phone"
//           />
//           <input
//             value={contactPerson}
//             onChange={(e) => setContactPerson(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Contact Person"
//           />
//           <input
//             value={companyWebsite}
//             onChange={(e) => setCompanyWebsite(e.target.value)}
//             className="border p-2 w-full rounded"
//             placeholder="Website URL"
//           />
//         </div>
//       )}

//       {/* Party Selector */}
//       <PartySelector
//         parties={parties}
//         selectedParty={selectedParty}
//         setSelectedParty={setSelectedParty}
//         refreshParties={() =>
//           fetchJson("/api/parties").then((data) => data && setParties(data))
//         }
//       />

//       {/* Items */}
//       <div className="space-y-2 mb-6">
//         <h2 className="font-semibold">🛒 Select Items</h2>
//         {items.map((item) => {
//           const inCart = billItems.find((i) => i.id === item.id)?.quantity || 0;
//           return (
//             <div
//               key={item.id}
//               className="flex justify-between border-b py-2 items-center"
//             >
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
//               {inCart > 0 && (
//                 <span className="ml-2 font-semibold text-green-600">{inCart}</span>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Bill Summary */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>

//         {billItems.map((bi) => (
//           <div
//             key={bi.id}
//             className="flex justify-between items-center border-b py-2"
//           >
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 min={1}
//                 value={bi.quantity}
//                 onChange={(e) =>
//                   handleQuantityChange(bi.id, parseInt(e.target.value))
//                 }
//                 className="w-16 border p-1 rounded text-center"
//               />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}

//         {/* Grand Total */}
//         <div className="font-bold text-right text-lg mt-2">
//           Grand Total: ₹{subtotal.toFixed(2)}
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end mb-6">
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

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-2 text-gray-500">
//                   No bills yet
//                 </td>
//               </tr>
//             )}
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">
//                   {new Date(bill.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="border px-2 py-1 text-center">
//                   <a
//                     href={`/billing/view/${bill.id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }









// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import PartySelector from "./PartySelector";

// // -------------------- TYPES --------------------
// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// // -------------------- COMPONENT --------------------
// export default function BillingPage() {
//   const { user } = useUser();

//   // Company info
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");
//   const [showCompanyInfo, setShowCompanyInfo] = useState(false);

//   // Billing states
//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   // NEW — held bills
//   const [heldBills, setHeldBills] = useState<any[]>([]);

//   // -------------------- HELPERS --------------------
//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Fetch failed:", url, err);
//       return null;
//     }
//   };

//   // -------------------- LOAD DATA --------------------
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
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       }
//     });
//     fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart);
//         const itemsArray = Object.values(cartItems).map((item: any) => ({
//           id: item.id,
//           itemName: item.name,
//           rate: item.price ?? 0,
//           quantity: item.quantity ?? 1,
//         }));
//         setBillItems(itemsArray);
//       } catch (err) {
//         console.error("Failed to parse pendingCart", err);
//       }
//     }
//   }, []);

//   // -------------------- ITEM HANDLERS --------------------
//   const handleAddItem = (item: any) => {
//     const existing = billItems.find((i) => i.id === item.id);
//     if (existing) {
//       setBillItems(billItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)));
//     } else {
//       setBillItems([...billItems, { ...item, quantity: 1 }]);
//     }
//   };

//   const handleQuantityChange = (id: string, qty: number) => {
//     setBillItems(billItems.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));
//   };

//   const subtotal = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

//   // -------------------- BILL GENERATION --------------------
//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);
//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         productName: i.itemName,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products,
//           total: subtotal,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");
//         setSavedBills((prev) => [
//           ...prev,
//           { id: data.id, customerName: party?.name || "", grandTotal: subtotal, createdAt: new Date().toISOString() },
//         ]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------- NEW: HOLD BILL --------------------
//   const handleHoldBill = async () => {
//     if (!billItems.length) return alert("Add at least one item before holding!");
//     if (!selectedParty) return alert("Select a customer first!");

//     const payload = {
//       userClerkId: user?.id,
//       customerId: selectedParty,
//       items: billItems,
//       total: subtotal,
//     };

//     try {
//       const res = await fetch(`/api/bills/${Date.now()}/hold`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (res.ok) {
//         alert("🟡 Bill held successfully!");
//         setBillItems([]);
//         fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));
//       } else {
//         alert("Failed to hold bill");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // -------------------- NEW: RESUME BILL --------------------
//   const handleResumeBill = async (billId: string) => {
//     try {
//       const res = await fetch(`/api/bills/${billId}/resume`, { method: "POST" });
//       const data = await res.json();

//       if (res.ok) {
//         setBillItems(data.items);
//         setSelectedParty(data.customerId);
//         alert("✅ Bill resumed!");
//       } else {
//         alert(data.error || "Failed to resume bill");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

//   // -------------------- UI --------------------
//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Edit Company Profile */}
//       <div className="mb-6">
//         <button
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//           onClick={() => setShowCompanyInfo(!showCompanyInfo)}
//         >
//           {showCompanyInfo ? "Hide Company Profile" : "Edit Company Profile"}
//         </button>
//       </div>

//       {showCompanyInfo && (
//         <div className="space-y-2 mb-6">
//           {companyLogo && <img src={companyLogo} alt="Logo" className="w-32 h-32 object-contain mb-2" />}
//           <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Name" />
//           <input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Address" />
//           <input value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Phone" />
//           <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="border p-2 w-full rounded" placeholder="Contact Person" />
//           <input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="border p-2 w-full rounded" placeholder="Website URL" />
//         </div>
//       )}

//       {/* Party Selector */}
//       <PartySelector
//         parties={parties}
//         selectedParty={selectedParty}
//         setSelectedParty={setSelectedParty}
//         refreshParties={() => fetchJson("/api/parties").then((data) => data && setParties(data))}
//       />

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
//               <input
//                 type="number"
//                 min={1}
//                 value={bi.quantity}
//                 onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))}
//                 className="w-16 border p-1 rounded text-center"
//               />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <div className="font-bold text-right text-lg mt-2">Grand Total: ₹{subtotal.toFixed(2)}</div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end mb-6 flex-wrap">
//         <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
//           💾 {loading ? "Saving..." : "Generate Bill"}
//         </button>
//         <button onClick={handleHoldBill} className="bg-yellow-500 text-white px-4 py-2 rounded">🟡 Hold</button>
//         <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">🖨️ Print</button>
//       </div>

//       {/* Held Bills */}
//       <div className="mt-8">
//         <h2 className="font-semibold mb-2">🕓 Held Bills</h2>
//         {heldBills.length === 0 && <p className="text-gray-500 text-sm">No held bills.</p>}
//         {heldBills.map((b) => (
//           <div key={b.id} className="flex justify-between border-b py-2 items-center">
//             <div>
//               <span className="font-medium">{b.customerName}</span>
//               <span className="text-sm text-gray-500 ml-2">₹{b.total}</span>
//             </div>
//             <button onClick={() => handleResumeBill(b.id)} className="bg-blue-500 text-white px-3 py-1 rounded">Resume</button>
//           </div>
//         ))}
//       </div>

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-2 text-gray-500">
//                   No bills yet
//                 </td>
//               </tr>
//             )}
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">
//                   {new Date(bill.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="border px-2 py-1 text-center">
//                   <a href={`/billing/view/${bill.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
















// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import PartySelector from "./PartySelector";

// // -------------------- TYPES --------------------
// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// // -------------------- COMPONENT --------------------
// export default function BillingPage() {
//   const { user } = useUser();

//   // Company info
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");
//   const [showCompanyInfo, setShowCompanyInfo] = useState(false);

//   // Billing states
//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [heldBills, setHeldBills] = useState<any[]>([]);

//   // -------------------- HELPERS --------------------
//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Fetch failed:", url, err);
//       return null;
//     }
//   };

//   // -------------------- LOAD DATA --------------------
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
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       }
//     });
//     fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart);
//         const itemsArray = Object.values(cartItems).map((item: any) => ({
//           id: item.id,
//           itemName: item.name,
//           rate: item.price ?? 0,
//           quantity: item.quantity ?? 1,
//         }));
//         setBillItems(itemsArray);
//       } catch (err) {
//         console.error("Failed to parse pendingCart", err);
//       }
//     }
//   }, []);

//   // -------------------- ITEM HANDLERS --------------------
//   const handleQuantityChange = (id: string, qty: number) => {
//     setBillItems(billItems.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));
//   };

//   const subtotal = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

//   // -------------------- BILL GENERATION --------------------
//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);
//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         productName: i.itemName,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products,
//           total: subtotal,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");
//         setSavedBills((prev) => [
//           ...prev,
//           { id: data.id, customerName: party?.name || "", grandTotal: subtotal, createdAt: new Date().toISOString() },
//         ]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------- HOLD & RESUME --------------------
//   const handleHoldBill = async () => {
//     if (!billItems.length) return alert("Add at least one item before holding!");
//     if (!selectedParty) return alert("Select a customer first!");

//     const payload = {
//       userClerkId: user?.id,
//       customerId: selectedParty,
//       items: billItems,
//       total: subtotal,
//     };

//     try {
//       const res = await fetch(`/api/bills/${Date.now()}/hold`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (res.ok) {
//         alert("🟡 Bill held successfully!");
//         setBillItems([]);
//         fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));
//       } else {
//         alert("Failed to hold bill");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleResumeBill = async (billId: string) => {
//     try {
//       const res = await fetch(`/api/bills/${billId}/resume`, { method: "POST" });
//       const data = await res.json();

//       if (res.ok) {
//         setBillItems(data.items);
//         setSelectedParty(data.customerId);
//         alert("✅ Bill resumed!");
//       } else {
//         alert(data.error || "Failed to resume bill");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

//   // -------------------- UI --------------------
//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Edit Company Profile */}
//       <div className="mb-6">
//         <button
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//           onClick={() => setShowCompanyInfo(!showCompanyInfo)}
//         >
//           {showCompanyInfo ? "Hide Company Profile" : "Edit Company Profile"}
//         </button>
//       </div>

//       {showCompanyInfo && (
//         <div className="space-y-2 mb-6">
//           {companyLogo && <img src={companyLogo} alt="Logo" className="w-32 h-32 object-contain mb-2" />}
//           <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Name" />
//           <input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Address" />
//           <input value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Phone" />
//           <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="border p-2 w-full rounded" placeholder="Contact Person" />
//           <input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="border p-2 w-full rounded" placeholder="Website URL" />
//         </div>
//       )}

//       {/* Party Selector */}
//       <PartySelector
//         parties={parties}
//         selectedParty={selectedParty}
//         setSelectedParty={setSelectedParty}
//         refreshParties={() => fetchJson("/api/parties").then((data) => data && setParties(data))}
//       />

//       {/* Bill Summary (Items Only) */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>
//         {billItems.map((bi) => (
//           <div key={bi.id} className="flex justify-between items-center border-b py-2">
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 min={1}
//                 value={bi.quantity}
//                 onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))}
//                 className="w-16 border p-1 rounded text-center"
//               />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <div className="font-bold text-right text-lg mt-2">Grand Total: ₹{subtotal.toFixed(2)}</div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end mb-6 flex-wrap">
//         <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
//           💾 {loading ? "Saving..." : "Generate Bill"}
//         </button>
//         <button onClick={handleHoldBill} className="bg-yellow-500 text-white px-4 py-2 rounded">🟡 Hold</button>
//         <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">🖨️ Print</button>
//       </div>

//       {/* Held Bills */}
//       <div className="mt-8">
//         <h2 className="font-semibold mb-2">🕓 Held Bills</h2>
//         {heldBills.length === 0 && <p className="text-gray-500 text-sm">No held bills.</p>}
//         {heldBills.map((b) => (
//           <div key={b.id} className="flex justify-between border-b py-2 items-center">
//             <div>
//               <span className="font-medium">{b.customerName}</span>
//               <span className="text-sm text-gray-500 ml-2">₹{b.total}</span>
//             </div>
//             <button onClick={() => handleResumeBill(b.id)} className="bg-blue-500 text-white px-3 py-1 rounded">Resume</button>
//           </div>
//         ))}
//       </div>

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-2 text-gray-500">
//                   No bills yet
//                 </td>
//               </tr>
//             )}
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">{new Date(bill.createdAt).toLocaleDateString()}</td>
//                 <td className="border px-2 py-1 text-center">
//                   <a href={`/billing/view/${bill.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }











// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import PartySelector from "./PartySelector";
// import HoldButton from "../../components/HoldButton";

// // ✅ Import your HoldButton component

// // -------------------- TYPES --------------------
// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// // -------------------- COMPONENT --------------------
// export default function BillingPage() {
//   const { user } = useUser();

//   // Company info
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");
//   const [showCompanyInfo, setShowCompanyInfo] = useState(false);

//   // Billing states
//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [heldBills, setHeldBills] = useState<any[]>([]);

//   // -------------------- HELPERS --------------------
//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Fetch failed:", url, err);
//       return null;
//     }
//   };

//   // -------------------- LOAD DATA --------------------
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
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       }
//     });
//     fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart);
//         const itemsArray = Object.values(cartItems).map((item: any) => ({
//           id: item.id,
//           itemName: item.name,
//           rate: item.price ?? 0,
//           quantity: item.quantity ?? 1,
//         }));
//         setBillItems(itemsArray);
//       } catch (err) {
//         console.error("Failed to parse pendingCart", err);
//       }
//     }
//   }, []);

//   // -------------------- ITEM HANDLERS --------------------
//   const handleQuantityChange = (id: string, qty: number) => {
//     setBillItems(billItems.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));
//   };

//   const subtotal = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

//   // -------------------- BILL GENERATION --------------------
//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);
//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         productName: i.itemName,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products,
//           total: subtotal,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");
//         setSavedBills((prev) => [
//           ...prev,
//           { id: data.id, customerName: party?.name || "", grandTotal: subtotal, createdAt: new Date().toISOString() },
//         ]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------- RESUME BILL --------------------
//   const handleResumeBill = async (billId: string) => {
//     try {
//       const res = await fetch(`/api/bills/${billId}/resume`, { method: "POST" });
//       const data = await res.json();

//       if (res.ok) {
//         setBillItems(data.items);
//         setSelectedParty(data.customerId);
//         alert("✅ Bill resumed!");
//       } else {
//         alert(data.error || "Failed to resume bill");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

//   // -------------------- UI --------------------
//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Edit Company Profile */}
//       <div className="mb-6">
//         <button
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//           onClick={() => setShowCompanyInfo(!showCompanyInfo)}
//         >
//           {showCompanyInfo ? "Hide Company Profile" : "Edit Company Profile"}
//         </button>
//       </div>

//       {showCompanyInfo && (
//         <div className="space-y-2 mb-6">
//           {companyLogo && <img src={companyLogo} alt="Logo" className="w-32 h-32 object-contain mb-2" />}
//           <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Name" />
//           <input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Address" />
//           <input value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Phone" />
//           <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="border p-2 w-full rounded" placeholder="Contact Person" />
//           <input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="border p-2 w-full rounded" placeholder="Website URL" />
//         </div>
//       )}

//       {/* Party Selector */}
//       <PartySelector
//         parties={parties}
//         selectedParty={selectedParty}
//         setSelectedParty={setSelectedParty}
//         refreshParties={() => fetchJson("/api/parties").then((data) => data && setParties(data))}
//       />

//       {/* Bill Summary */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>
//         {billItems.map((bi) => (
//           <div key={bi.id} className="flex justify-between items-center border-b py-2">
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 min={1}
//                 value={bi.quantity}
//                 onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))}
//                 className="w-16 border p-1 rounded text-center"
//               />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <div className="font-bold text-right text-lg mt-2">Grand Total: ₹{subtotal.toFixed(2)}</div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end mb-6 flex-wrap">
//         <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
//           💾 {loading ? "Saving..." : "Generate Bill"}
//         </button>

//         {/* ✅ Hold Button (new API) */}
//         <HoldButton
//           userClerkId={user?.id || ""}
//           billItems={billItems}
//           total={subtotal}
//           customerId={selectedParty}
//           onHeld={() => {
//             setBillItems([]);
//             fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));
//           }}
//         />

//         <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">
//           🖨️ Print
//         </button>
//       </div>

//       {/* Held Bills */}
//       <div className="mt-8">
//         <h2 className="font-semibold mb-2">🕓 Held Bills</h2>
//         {heldBills.length === 0 && <p className="text-gray-500 text-sm">No held bills.</p>}
//         {heldBills.map((b) => (
//           <div key={b.id} className="flex justify-between border-b py-2 items-center">
//             <div>
//               <span className="font-medium">{b.customerName}</span>
//               <span className="text-sm text-gray-500 ml-2">₹{b.total}</span>
//             </div>
//             <button onClick={() => handleResumeBill(b.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
//               Resume
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-2 text-gray-500">
//                   No bills yet
//                 </td>
//               </tr>
//             )}
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">{new Date(bill.createdAt).toLocaleDateString()}</td>
//                 <td className="border px-2 py-1 text-center">
//                   <a href={`/billing/view/${bill.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }













































// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import PartySelector from "./PartySelector";
// import HoldButton from "../../components/HoldButton";

// // -------------------- TYPES --------------------
// interface BillItem {
//   id: string;
//   itemName: string;
//   rate: number;
//   quantity: number;
// }

// interface SavedBill {
//   id: string;
//   customerName: string;
//   grandTotal: number;
//   createdAt: string;
// }

// // -------------------- COMPONENT --------------------
// export default function BillingPage() {
//   const { user } = useUser();

//   // Company info
//   const [companyName, setCompanyName] = useState("My Billing Firm");
//   const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
//   const [companyPhone, setCompanyPhone] = useState("9876543210");
//   const [contactPerson, setContactPerson] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");
//   const [companySignature, setCompanySignature] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");
//   const [showCompanyInfo, setShowCompanyInfo] = useState(false);

//   // Billing states
//   const [parties, setParties] = useState<any[]>([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
//   const [selectedParty, setSelectedParty] = useState("");
//   const [billItems, setBillItems] = useState<BillItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [heldBills, setHeldBills] = useState<any[]>([]);

//   // -------------------- HELPERS --------------------
//   const fetchJson = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       return res.json();
//     } catch (err) {
//       console.error("Fetch failed:", url, err);
//       return null;
//     }
//   };

//   // -------------------- LOAD DATA --------------------
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
//     fetchJson("/api/billing/list").then((data) => {
//       if (Array.isArray(data)) {
//         const formatted = data.map((b: any) => ({
//           id: b.id,
//           customerName: b.customer?.name || "Unknown",
//           grandTotal: b.grandTotal ?? b.total ?? 0,
//           createdAt: b.createdAt,
//         }));
//         setSavedBills(formatted);
//       }
//     });
//     fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));

//     const pendingCart = localStorage.getItem("pendingCart");
//     if (pendingCart) {
//       try {
//         const cartItems = JSON.parse(pendingCart);
//         const itemsArray = Object.values(cartItems).map((item: any) => ({
//           id: item.id,
//           itemName: item.name,
//           rate: item.price ?? 0,
//           quantity: item.quantity ?? 1,
//         }));
//         setBillItems(itemsArray);
//       } catch (err) {
//         console.error("Failed to parse pendingCart", err);
//       }
//     }
//   }, []);

//   // -------------------- ITEM HANDLERS --------------------
//   const handleQuantityChange = (id: string, qty: number) => {
//     setBillItems(billItems.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));
//   };

//   const subtotal = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

//   // -------------------- BILL GENERATION --------------------
//   const handleGenerateBill = async () => {
//     if (!user?.id) return alert("User not authenticated!");
//     if (!selectedParty) return alert("Please select a customer!");
//     if (!billItems.length) return alert("Add at least one item!");

//     setLoading(true);
//     const party = parties.find((p) => p.id === selectedParty);
//     try {
//       const products = billItems.map((i) => ({
//         productId: i.id,
//         productName: i.itemName,
//         quantity: i.quantity,
//         price: i.rate,
//         total: i.rate * i.quantity,
//       }));

//       const res = await fetch("/api/billing", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userClerkId: user.id,
//           customerId: party?.id,
//           companyName,
//           companyAddress,
//           companyPhone,
//           contactPerson,
//           logoUrl: companyLogo,
//           signatureUrl: companySignature,
//           websiteUrl: companyWebsite,
//           products,
//           total: subtotal,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Bill saved successfully!");
//         setBillItems([]);
//         localStorage.removeItem("pendingCart");
//         localStorage.removeItem("pendingTotal");
//         setSavedBills((prev) => [
//           ...prev,
//           { id: data.id, customerName: party?.name || "", grandTotal: subtotal, createdAt: new Date().toISOString() },
//         ]);
//       } else {
//         alert(data?.error || "❌ Failed to save bill.");
//       }
//     } catch (err) {
//       console.error("Bill generation failed", err);
//       alert("❌ Failed to save bill.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------- RESUME BILL --------------------
//   const handleResumeBill = async (billId: string) => {
//     try {
//       const res = await fetch(`/api/bills/${billId}/resume`, { method: "POST" });
//       const data = await res.json();

//       if (res.ok) {
//         setBillItems(data.resumedBill.products.map((p: any) => ({
//           id: p.productId,
//           itemName: p.productName,
//           rate: p.price,
//           quantity: p.quantity,
//         })));
//         setSelectedParty(data.resumedBill.customerId || "");
//         fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));
//         alert("✅ Bill resumed!");
//       } else {
//         alert(data.error || "Failed to resume bill");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to resume bill");
//     }
//   };

//   const handlePrint = () => window.print();

//   if (loadingProfile)
//     return <p className="p-6 text-center">Loading business profile...</p>;

//   // -------------------- UI --------------------
//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

//       {/* Company Profile */}
//       <div className="mb-6">
//         <button
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//           onClick={() => setShowCompanyInfo(!showCompanyInfo)}
//         >
//           {showCompanyInfo ? "Hide Company Profile" : "Edit Company Profile"}
//         </button>
//       </div>
//       {showCompanyInfo && (
//         <div className="space-y-2 mb-6">
//           {companyLogo && <img src={companyLogo} alt="Logo" className="w-32 h-32 object-contain mb-2" />}
//           <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Name" />
//           <input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Address" />
//           <input value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Phone" />
//           <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="border p-2 w-full rounded" placeholder="Contact Person" />
//           <input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="border p-2 w-full rounded" placeholder="Website URL" />
//         </div>
//       )}

//       {/* Party Selector */}
//       <PartySelector
//         parties={parties}
//         selectedParty={selectedParty}
//         setSelectedParty={setSelectedParty}
//         refreshParties={() => fetchJson("/api/parties").then((data) => data && setParties(data))}
//       />

//       {/* Bill Summary */}
//       <div className="space-y-2 mb-6 border-t pt-4">
//         <h2 className="font-semibold">📋 Bill Summary</h2>
//         {billItems.map((bi) => (
//           <div key={bi.id} className="flex justify-between items-center border-b py-2">
//             <span>{bi.itemName}</span>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 min={1}
//                 value={bi.quantity}
//                 onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))}
//                 className="w-16 border p-1 rounded text-center"
//               />
//               <span>₹{bi.rate * bi.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <div className="font-bold text-right text-lg mt-2">Grand Total: ₹{subtotal.toFixed(2)}</div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end mb-6 flex-wrap">
//         <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
//           💾 {loading ? "Saving..." : "Generate Bill"}
//         </button>

//         <HoldButton
//           userClerkId={user?.id || ""}
//           billItems={billItems}
//           total={subtotal}
//           customerId={selectedParty}
//           onHeld={() => {
//             setBillItems([]);
//             fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));
//           }}
//         />

//         <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">
//           🖨️ Print
//         </button>
//       </div>

//       {/* Held Bills */}
//       <div className="mt-8">
//         <h2 className="font-semibold mb-2">🕓 Held Bills</h2>
//         {heldBills.length === 0 && <p className="text-gray-500 text-sm">No held bills.</p>}
//         {heldBills.map((b) => (
//           <div key={b.id} className="flex justify-between border-b py-2 items-center">
//             <div>
//               <span className="font-medium">{b.customerName}</span>
//               <span className="text-sm text-gray-500 ml-2">₹{b.total}</span>
//             </div>
//             <button onClick={() => handleResumeBill(b.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
//               Resume
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Saved Bills */}
//       <div className="space-y-2 mt-8">
//         <h2 className="font-semibold">📄 Saved Bills</h2>
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Customer</th>
//               <th className="border px-2 py-1">Total</th>
//               <th className="border px-2 py-1">Date</th>
//               <th className="border px-2 py-1">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedBills.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-2 text-gray-500">No bills yet</td>
//               </tr>
//             )}
//             {savedBills.map((bill) => (
//               <tr key={bill.id}>
//                 <td className="border px-2 py-1">{bill.customerName}</td>
//                 <td className="border px-2 py-1">₹{bill.grandTotal}</td>
//                 <td className="border px-2 py-1">{new Date(bill.createdAt).toLocaleDateString()}</td>
//                 <td className="border px-2 py-1 text-center">
//                   <a href={`/billing/view/${bill.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                     View / Print
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

















"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import PartySelector from "./PartySelector";
import HoldButton from "../../components/HoldButton";

// -------------------- TYPES --------------------
interface BillItem {
  id: string;
  itemName: string;
  rate: number;
  quantity: number;
}

interface SavedBill {
  id: string;
  customerName: string;
  grandTotal: number;
  createdAt: string;
}

// -------------------- COMPONENT --------------------
export default function BillingPage() {
  const { user } = useUser();

  // Company info
  const [companyName, setCompanyName] = useState("My Billing Firm");
  const [companyAddress, setCompanyAddress] = useState("123 Market Road, Delhi");
  const [companyPhone, setCompanyPhone] = useState("9876543210");
  const [contactPerson, setContactPerson] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companySignature, setCompanySignature] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  // Billing states
  const [parties, setParties] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
  const [selectedParty, setSelectedParty] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [heldBills, setHeldBills] = useState<any[]>([]);

  // -------------------- HELPERS --------------------
  const fetchJson = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (err) {
      console.error("Fetch failed:", url, err);
      return null;
    }
  };

  // -------------------- LOAD DATA --------------------
  useEffect(() => {
    // Load company profile
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

  useEffect(() => {
    // Load parties, items, saved bills
    fetchJson("/api/parties").then((data) => data && setParties(data));
    fetchJson("/api/items").then((data) => data && setItems(data));
    fetchJson("/api/billing/list").then((data) => {
      if (Array.isArray(data)) {
        const formatted = data.map((b: any) => ({
          id: b.id,
          customerName: b.customer?.name || "Unknown",
          grandTotal: b.grandTotal ?? b.total ?? 0,
          createdAt: b.createdAt,
        }));
        setSavedBills(formatted);
      }
    });

    // ✅ Held bills fetch (auto session)
    fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));

    // Load pending cart from localStorage
    const pendingCart = localStorage.getItem("pendingCart");
    if (pendingCart) {
      try {
        const cartItems = JSON.parse(pendingCart);
        const itemsArray = Object.values(cartItems).map((item: any) => ({
          id: item.id,
          itemName: item.name,
          rate: item.price ?? 0,
          quantity: item.quantity ?? 1,
        }));
        setBillItems(itemsArray);
      } catch (err) {
        console.error("Failed to parse pendingCart", err);
      }
    }
  }, [user?.id]); // ✅ Refetch when user changes

  // -------------------- ITEM HANDLERS --------------------
  const handleQuantityChange = (id: string, qty: number) => {
    setBillItems(billItems.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));
  };

  const subtotal = billItems.reduce((sum, it) => sum + it.rate * it.quantity, 0);

  // -------------------- BILL GENERATION --------------------
  const handleGenerateBill = async () => {
    if (!user?.id) return alert("User not authenticated!");
    if (!selectedParty) return alert("Please select a customer!");
    if (!billItems.length) return alert("Add at least one item!");

    setLoading(true);
    const party = parties.find((p) => p.id === selectedParty);
    try {
      const products = billItems.map((i) => ({
        productId: i.id,
        productName: i.itemName,
        quantity: i.quantity,
        price: i.rate,
        total: i.rate * i.quantity,
      }));

      const res = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userClerkId: user.id,
          customerId: party?.id,
          companyName,
          companyAddress,
          companyPhone,
          contactPerson,
          logoUrl: companyLogo,
          signatureUrl: companySignature,
          websiteUrl: companyWebsite,
          products,
          total: subtotal,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Bill saved successfully!");
        setBillItems([]);
        localStorage.removeItem("pendingCart");
        localStorage.removeItem("pendingTotal");
        setSavedBills((prev) => [
          ...prev,
          { id: data.id, customerName: party?.name || "", grandTotal: subtotal, createdAt: new Date().toISOString() },
        ]);
      } else {
        alert(data?.error || "❌ Failed to save bill.");
      }
    } catch (err) {
      console.error("Bill generation failed", err);
      alert("❌ Failed to save bill");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- RESUME BILL --------------------
  const handleResumeBill = async (billId: string) => {
    try {
      const res = await fetch(`/api/bills/${billId}/resume`, { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setBillItems(data.resumedBill.products.map((p: any) => ({
          id: p.productId,
          itemName: p.productName,
          rate: p.price,
          quantity: p.quantity,
        })));
        setSelectedParty(data.resumedBill.customerId || "");
        fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));
        alert("✅ Bill resumed!");
      } else {
        alert(data.error || "Failed to resume bill");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to resume bill");
    }
  };

  const handlePrint = () => window.print();

  if (loadingProfile)
    return <p className="p-6 text-center">Loading business profile...</p>;

  // -------------------- UI --------------------
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Billing System</h1>

      {/* Company Profile */}
      <div className="mb-6">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={() => setShowCompanyInfo(!showCompanyInfo)}
        >
          {showCompanyInfo ? "Hide Company Profile" : "Edit Company Profile"}
        </button>
      </div>

      {showCompanyInfo && (
        <div className="space-y-2 mb-6">
          {companyLogo && <img src={companyLogo} alt="Logo" className="w-32 h-32 object-contain mb-2" />}
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Name" />
          <input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Address" />
          <input value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="border p-2 w-full rounded" placeholder="Company Phone" />
          <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="border p-2 w-full rounded" placeholder="Contact Person" />
          <input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="border p-2 w-full rounded" placeholder="Website URL" />
        </div>
      )}

      {/* Party Selector */}
      <PartySelector
        parties={parties}
        selectedParty={selectedParty}
        setSelectedParty={setSelectedParty}
        refreshParties={() => fetchJson("/api/parties").then((data) => data && setParties(data))}
      />

      {/* Bill Summary */}
      <div className="space-y-2 mb-6 border-t pt-4">
        <h2 className="font-semibold">📋 Bill Summary</h2>
        {billItems.map((bi) => (
          <div key={bi.id} className="flex justify-between items-center border-b py-2">
            <span>{bi.itemName}</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={bi.quantity}
                onChange={(e) => handleQuantityChange(bi.id, parseInt(e.target.value))}
                className="w-16 border p-1 rounded text-center"
              />
              <span>₹{bi.rate * bi.quantity}</span>
            </div>
          </div>
        ))}
        <div className="font-bold text-right text-lg mt-2">Grand Total: ₹{subtotal.toFixed(2)}</div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end mb-6 flex-wrap">
        <button onClick={handleGenerateBill} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
          💾 {loading ? "Saving..." : "Generate Bill"}
        </button>

        <HoldButton
          userClerkId={user?.id || ""}
          billItems={billItems}
          total={subtotal}
          customerId={selectedParty}
          onHeld={() => {
            setBillItems([]);
            fetchJson("/api/bills/held").then((data) => data && setHeldBills(data));
          }}
        />

        <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded">
          🖨️ Print
        </button>
      </div>

      {/* Held Bills */}
      <div className="mt-8">
        <h2 className="font-semibold mb-2">🕓 Held Bills</h2>
        {heldBills.length === 0 && <p className="text-gray-500 text-sm">No held bills.</p>}
        {heldBills.map((b) => (
          <div key={b.id} className="flex justify-between border-b py-2 items-center">
            <div>
              <span className="font-medium">{b.customerName}</span>
              <span className="text-sm text-gray-500 ml-2">₹{b.total}</span>
            </div>
            <button onClick={() => handleResumeBill(b.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
              Resume
            </button>
          </div>
        ))}
      </div>

      {/* Saved Bills */}
      <div className="space-y-2 mt-8">
        <h2 className="font-semibold">📄 Saved Bills</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Customer</th>
              <th className="border px-2 py-1">Total</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {savedBills.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-2 text-gray-500">No bills yet</td>
              </tr>
            )}
            {savedBills.map((bill) => (
              <tr key={bill.id}>
                <td className="border px-2 py-1">{bill.customerName}</td>
                <td className="border px-2 py-1">₹{bill.grandTotal}</td>
                <td className="border px-2 py-1">{new Date(bill.createdAt).toLocaleDateString()}</td>
                <td className="border px-2 py-1 text-center">
                  <a href={`/billing/view/${bill.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View / Print
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
