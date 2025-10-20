// "use client";

// import { prisma } from "@/lib/prisma";
// import React from "react";

// interface BillPageProps {
//   params: { id: string };
// }

// // Optional types for product snapshot
// interface ProductSnapshot {
//   productId: string;
//   quantity: number;
//   price: number;
//   total: number;
//   name?: string;
// }

// export default async function BillPage({ params }: BillPageProps) {
//   const { id } = params;

//   // Fetch bill with optional relations
//   const bill = await prisma.bill.findUnique({
//     where: { id },
//     include: {
//       customer: true,
//       products: {
//         include: {
//           product: true, // include actual product details if exist
//         },
//       },
//       history: {
//         orderBy: { createdAt: "desc" }, // latest snapshot first
//         take: 1,
//       },
//     },
//   });

//   if (!bill) return <div>Bill not found</div>;

//   // Use latest snapshot if products are missing
//   const products: ProductSnapshot[] =
//     bill.products.length > 0
//       ? bill.products.map((p) => ({
//           ...p,
//           name: p.product?.name || "Deleted Product",
//         }))
//       : bill.history[0]?.snapshot?.products || [];

//   const handlePrint = () => {
//     window.print();
//   };

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
//                 <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.name}</td>
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



// "use client";

// import { prisma } from "@/lib/prisma";
// import React from "react";

// interface BillPageProps {
//   params: { id: string };
// }

// // Optional types for product snapshot
// interface ProductSnapshot {
//   productId: string;
//   quantity: number;
//   price: number;
//   total: number;
//   productName?: string;
// }

// export default async function BillPage({ params }: BillPageProps) {
//   const { id } = params;

//   // Fetch bill with latest snapshot
//   const bill = await prisma.bill.findUnique({
//     where: { id },
//     include: {
//       customer: true,
//       history: {
//         orderBy: { createdAt: "desc" }, // latest snapshot first
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
//                 <td style={{ border: "1px solid #ccc", padding: "5px" }}>
//                   {p.quantity}
//                 </td>
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





// import { prisma } from "@/lib/prisma";
// import React from "react";

// interface ProductSnapshot {
//   productId: string;
//   quantity: number;
//   price: number;
//   total: number;
//   productName?: string;
// }

// export default async function BillPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   // Fetch bill with latest snapshot and related data
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

//   // Use snapshot products if available, fallback to deleted product name
//   const products: ProductSnapshot[] =
//     bill.history?.[0]?.snapshot?.products?.map((p: any) => ({
//       ...p,
//       productName: p.productName || "Deleted Product",
//     })) || [];

//   return (
//     <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
//       {/* Print Button */}
//       <button
//         onClick={() => window.print()}
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

//       {/* Bill Content */}
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

//         {/* Customer Section */}
//         <h2>Bill To:</h2>
//         <p>{bill.customer?.name || "Unknown Customer"}</p>
//         <p>{bill.customer?.phone || "N/A"}</p>
//         <p>{bill.customer?.address || "N/A"}</p>

//         <hr style={{ margin: "20px 0" }} />

//         {/* Product Table */}
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

//         {/* Totals */}
//         <p>Total: ₹{bill.total}</p>
//         {bill.discount && <p>Discount: ₹{bill.discount}</p>}
//         {bill.gst && <p>GST: ₹{bill.gst}</p>}
//         <h3>Grand Total: ₹{bill.grandTotal}</h3>

//         {/* Signature */}
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



// import { prisma } from "@/lib/prisma";
// import React from "react";

// // ✅ Move this small component here to allow "onClick"
// function PrintButton() {
//   return (
//     <button
//       onClick={() => window.print()}
//       style={{
//         marginBottom: "20px",
//         padding: "10px 15px",
//         backgroundColor: "#4f46e5",
//         color: "white",
//         borderRadius: "5px",
//         cursor: "pointer",
//       }}
//     >
//       🖨️ Print Bill
//     </button>
//   );
// }

// interface ProductSnapshot {
//   productId: string;
//   quantity: number;
//   price: number;
//   total: number;
//   productName?: string;
// }

// export default async function BillPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   // ✅ Fetch the bill and its related data
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

//   const products: ProductSnapshot[] =
//     bill.history?.[0]?.snapshot?.products?.map((p: any) => ({
//       ...p,
//       productName: p.productName || "Deleted Product",
//     })) || [];

//   return (
//     <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
//       {/* ✅ Client-side print button */}
//       <PrintButton />

//       {/* Bill Content */}
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

//         {/* Customer Section */}
//         <h2>Bill To:</h2>
//         <p>{bill.customer?.name || "Unknown Customer"}</p>
//         <p>{bill.customer?.phone || "N/A"}</p>
//         <p>{bill.customer?.address || "N/A"}</p>

//         <hr style={{ margin: "20px 0" }} />

//         {/* Product Table */}
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

//         {/* Totals */}
//         <p>Total: ₹{bill.total}</p>
//         {bill.discount && <p>Discount: ₹{bill.discount}</p>}
//         {bill.gst && <p>GST: ₹{bill.gst}</p>}
//         <h3>Grand Total: ₹{bill.grandTotal}</h3>

//         {/* Signature */}
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





// "use client";

// import React, { useEffect, useState } from "react";

// interface ProductSnapshot {
//   productId: string;
//   quantity: number;
//   price: number;
//   total: number;
//   productName?: string;
// }

// interface Bill {
//   id: string;
//   logoUrl?: string;
//   companyName?: string;
//   companyAddress?: string;
//   companyPhone?: string;
//   contactPerson?: string;
//   websiteUrl?: string;
//   customer?: {
//     name: string;
//     phone: string;
//     address: string;
//   };
//   history?: {
//     snapshot?: {
//       products?: ProductSnapshot[];
//     };
//   }[];
//   total: number;
//   discount?: number;
//   gst?: number;
//   grandTotal: number;
//   signatureUrl?: string;
// }

// export default function BillPage({ params }: { params: { id: string } }) {
//   const { id } = params;
//   const [bill, setBill] = useState<Bill | null>(null);

//   useEffect(() => {
//     fetch(`/api/billing/${id}`)
//       .then(res => res.json())
//       .then(data => setBill(data))
//       .catch(console.error);
//   }, [id]);

//   if (!bill) return <div>Loading...</div>;

//   const products: ProductSnapshot[] =
//     bill.history?.[0]?.snapshot?.products?.map(p => ({
//       ...p,
//       productName: p.productName || "Deleted Product",
//     })) || [];

//   return (
//     <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
//       <button
//         onClick={() => window.print()}
//         style={{
//           marginBottom: "20px",
//           padding: "10px 15px",
//           backgroundColor: "#4f46e5",
//           color: "white",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         🖨️ Print Bill
//       </button>

//       <div style={{ border: "1px solid #ccc", padding: "20px" }}>
//         {/* Bill Header */}
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

//         {/* Customer */}
//         <h2>Bill To:</h2>
//         <p>{bill.customer?.name || "Unknown Customer"}</p>
//         <p>{bill.customer?.phone || "N/A"}</p>
//         <p>{bill.customer?.address || "N/A"}</p>

//         <hr style={{ margin: "20px 0" }} />

//         {/* Product Table */}
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






// "use client";

// import React, { useEffect, useState } from "react";

// interface ProductSnapshot {
//   productId: string;
//   quantity: number;
//   price: number;
//   total: number;
//   productName: string;
// }

// interface Bill {
//   id: string;
//   logoUrl?: string;
//   companyName?: string;
//   companyAddress?: string;
//   companyPhone?: string;
//   contactPerson?: string;
//   websiteUrl?: string;
//   customer?: {
//     name: string;
//     phone: string;
//     address: string;
//   };
//   history?: {
//     snapshot?: {
//       products?: ProductSnapshot[];
//     };
//   }[];
//   total: number;
//   discount?: number;
//   gst?: number;
//   grandTotal: number;
//   signatureUrl?: string;
// }

// export default function BillPage({ params }: { params: { id: string } }) {
//   const { id } = params;
//   const [bill, setBill] = useState<Bill | null>(null);

//   useEffect(() => {
//     fetch(`/api/billing/${id}`)
//       .then(res => res.json())
//       .then(data => setBill(data))
//       .catch(console.error);
//   }, [id]);

//   if (!bill) return <div>Loading...</div>;

//   const products: ProductSnapshot[] =
//     bill.history?.[0]?.snapshot?.products || [];

//   return (
//     <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
//       <button
//         onClick={() => window.print()}
//         style={{
//           marginBottom: "20px",
//           padding: "10px 15px",
//           backgroundColor: "#4f46e5",
//           color: "white",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         🖨️ Print Bill
//       </button>

//       <div style={{ border: "1px solid #ccc", padding: "20px" }}>
//         {/* Header */}
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

//         {/* Customer */}
//         <h2>Bill To:</h2>
//         <p>{bill.customer?.name || "Unknown Customer"}</p>
//         <p>{bill.customer?.phone || "N/A"}</p>
//         <p>{bill.customer?.address || "N/A"}</p>

//         <hr style={{ margin: "20px 0" }} />

//         {/* Product Table */}
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
//                 <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.productName}</td>
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


"use client";

import React, { useEffect, useState } from "react";

interface ProductSnapshot {
  productId: string;
  quantity: number;
  price: number;
  total: number;
  productName: string;
}

interface Bill {
  id: string;
  logoUrl?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  contactPerson?: string;
  websiteUrl?: string;
  customer?: {
    name: string;
    phone: string;
    address: string;
  };
  history?: {
    snapshot?: {
      products?: ProductSnapshot[];
    };
  }[];
  total?: number | null;
  grandTotal?: number | null;
  signatureUrl?: string;
}

export default function BillPage(props: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("");
  const [bill, setBill] = useState<Bill | null>(null);

  // Unwrap params
  useEffect(() => {
    props.params.then((p) => setId(p.id));
  }, [props.params]);

  // Fetch bill
  useEffect(() => {
    if (!id) return;
    fetch(`/api/billing/${id}`)
      .then((res) => res.json())
      .then((data) => setBill(data))
      .catch(console.error);
  }, [id]);

  if (!bill) return <div>Loading...</div>;

  const products: ProductSnapshot[] = bill.history?.[0]?.snapshot?.products || [];

  return (
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        width: "240px",
        margin: "0 auto",
        padding: "5px",
      }}
    >
      <button
        onClick={() => window.print()}
        style={{
          marginBottom: "10px",
          padding: "5px 10px",
          backgroundColor: "#4f46e5",
          color: "white",
          borderRadius: "3px",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        🖨️ Print Bill
      </button>

      <div style={{ textAlign: "center", fontSize: "12px" }}>
        {bill.logoUrl && (
          <img
            src={bill.logoUrl}
            alt="Logo"
            style={{ maxWidth: "100%", maxHeight: "60px", margin: "0 auto" }}
          />
        )}
        <div><strong>{bill.companyName || "Your Company"}</strong></div>
        <div>{bill.companyAddress}</div>
        <div>Phone: {bill.companyPhone}</div>
        {bill.contactPerson && <div>Contact: {bill.contactPerson}</div>}
        {bill.websiteUrl && <div>{bill.websiteUrl}</div>}

        <hr style={{ borderTop: "1px dashed #000", margin: "5px 0" }} />

        <div style={{ textAlign: "left" }}>
          <strong>Bill To:</strong>
          <div>{bill.customer?.name || "Unknown Customer"}</div>
          <div>{bill.customer?.phone || "N/A"}</div>
          <div>{bill.customer?.address || "N/A"}</div>
        </div>

        <hr style={{ borderTop: "1px dashed #000", margin: "5px 0" }} />

        <table style={{ width: "100%", fontSize: "12px" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Item</th>
              <th style={{ textAlign: "center" }}>Qty</th>
              <th style={{ textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>{p.productName}</td>
                <td style={{ textAlign: "center" }}>{p.quantity}</td>
                <td style={{ textAlign: "right" }}>₹{p.total != null ? p.total.toFixed(2) : "0.00"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr style={{ borderTop: "1px dashed #000", margin: "5px 0" }} />

        <div style={{ textAlign: "right", fontSize: "12px" }}>
          <div>Total: ₹{bill.total != null ? bill.total.toFixed(2) : "0.00"}</div>
          <strong>Grand Total: ₹{bill.grandTotal != null ? bill.grandTotal.toFixed(2) : "0.00"}</strong>
        </div>

        {bill.signatureUrl && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <img
              src={bill.signatureUrl}
              alt="Signature"
              style={{ maxWidth: "100px", maxHeight: "40px" }}
            />
            <div style={{ fontSize: "10px" }}>Authorized Signatory</div>
          </div>
        )}

        <hr style={{ borderTop: "1px dashed #000", margin: "5px 0" }} />
        <div style={{ fontSize: "10px", textAlign: "center", marginTop: "5px" }}>
          Thank you for your business!
        </div>
      </div>
    </div>
  );
}
