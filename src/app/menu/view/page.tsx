// "use client";

// import { useUser, useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// type MenuItem = {
//   id: string;
//   name: string;
//   price?: number;
//   imageUrl?: string;
//   unit?: string;
// };

// type MenuCategory = {
//   id: string;
//   name: string;
//   items: MenuItem[];
// };

// export default function ViewMenuPage() {
//   const { getToken } = useAuth();
//   const [menus, setMenus] = useState<MenuCategory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMenus = async () => {
//       setLoading(true);
//       try {
//         const token = await getToken();
//         if (!token) throw new Error("Unauthorized");

//         const res = await fetch("/api/menu/view", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("Failed to fetch menus");
//         const data = await res.json();
//         setMenus(data.menus || []);
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenus();
//   }, [getToken]);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

//   return (
//     <div className="flex h-screen">
//       {/* Left Sidebar */}
//       <div className="w-1/5 bg-gray-50 border-r overflow-y-auto p-4">
//         <h2 className="font-bold text-lg mb-4">Categories</h2>
//         <ul className="space-y-2">
//           {menus.map((cat) => (
//             <li key={cat.id}>
//               <a
//                 href={`#cat-${cat.id}`}
//                 className="block px-3 py-2 rounded-md hover:bg-green-100 hover:text-green-600 font-medium"
//               >
//                 {cat.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right Content */}
//       <div className="flex-1 overflow-y-auto p-6">
//         <h1 className="text-2xl font-bold mb-6">Our Products</h1>

//         {menus.length === 0 ? (
//           <p>No products found</p>
//         ) : (
//           <div className="space-y-12">
//             {menus.map((cat) => (
//               <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
//                 <h2 className="text-xl font-semibold mb-4 border-b pb-2">
//                   {cat.name}
//                 </h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {cat.items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
//                     >
//                       {item.imageUrl && (
//                         <div className="w-full h-32 relative mb-3">
//                           <Image
//                             src={item.imageUrl}
//                             alt={item.name}
//                             fill
//                             className="object-contain rounded-lg"
//                           />
//                         </div>
//                       )}
//                       <h3 className="font-medium text-gray-800">{item.name}</h3>
//                       <p className="text-green-600 font-bold mt-1">
//                         ₹{item.price?.toFixed(2) ?? "N/A"}
//                       </p>
//                       <p className="text-sm text-gray-500">{item.unit || "Unit"}</p>
//                       <button className="mt-3 w-full bg-green-500 text-white py-1.5 rounded-lg hover:bg-green-600 transition">
//                         Add +
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// type MenuItem = {
//   id: string;
//   name: string;
//   price?: number;
//   imageUrl?: string;
//   unit?: string;
// };

// type MenuCategory = {
//   id: string;
//   name: string;
//   items: MenuItem[];
// };

// type CartItem = MenuItem & { quantity: number };

// export default function ViewMenuPage() {
//   const { getToken } = useAuth();
//   const [menus, setMenus] = useState<MenuCategory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [cart, setCart] = useState<Record<string, CartItem>>({});
//   const [showDetail, setShowDetail] = useState(false);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMenus = async () => {
//       setLoading(true);
//       try {
//         const token = await getToken();
//         if (!token) throw new Error("Unauthorized");

//         const res = await fetch("/api/menu/view", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("Failed to fetch menus");
//         const data = await res.json();
//         setMenus(data.menus || []);
//         if (data.menus?.length > 0) setActiveCategory(data.menus[0].id);
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMenus();
//   }, [getToken]);

//   const addToCart = (item: MenuItem) => {
//     setCart((prev) => {
//       const existing = prev[item.id];
//       return {
//         ...prev,
//         [item.id]: { ...item, quantity: existing ? existing.quantity + 1 : 1 },
//       };
//     });
//   };

//   const removeFromCart = (item: MenuItem) => {
//     setCart((prev) => {
//       const existing = prev[item.id];
//       if (!existing) return prev;
//       if (existing.quantity === 1) {
//         const newCart = { ...prev };
//         delete newCart[item.id];
//         return newCart;
//       }
//       return { ...prev, [item.id]: { ...existing, quantity: existing.quantity - 1 } };
//     });
//   };

//   const scrollToCategory = (id: string) => {
//     const el = document.getElementById(`cat-${id}`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       setActiveCategory(id);
//     }
//   };

//   const totalPrice = Object.values(cart).reduce(
//     (sum, item) => sum + (item.price || 0) * item.quantity,
//     0
//   );

//   const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

//   if (loading) return <p className="p-4 text-center">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500 text-center">Error: {error}</p>;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar - Categories */}
//       <div className="w-1/5 bg-white border-r shadow-sm overflow-y-auto p-4">
//         <h2 className="font-bold text-xl mb-6 text-gray-700">Categories</h2>
//         <ul className="space-y-3">
//           {menus.map((cat) => (
//             <li key={cat.id}>
//               <button
//                 onClick={() => scrollToCategory(cat.id)}
//                 className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
//                   activeCategory === cat.id
//                     ? "bg-green-500 text-white"
//                     : "hover:bg-green-100 hover:text-green-700 text-gray-800"
//                 }`}
//               >
//                 {cat.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right - Items */}
//       <div className="flex-1 overflow-y-auto p-4 md:p-6">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>
//         <div className="space-y-12">
//           {menus.map((cat) => (
//             <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
//               <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
//                 {cat.name}
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {cat.items.map((item) => {
//                   const inCart = cart[item.id]?.quantity || 0;
//                   return (
//                     <motion.div
//                       key={item.id}
//                       className="border rounded-2xl p-2 shadow-md hover:shadow-xl transition relative bg-white cursor-pointer flex flex-col items-center"
//                       onClick={() => addToCart(item)}
//                       whileHover={{ scale: 1.03 }}
//                       layout
//                     >
//                       {/* Minus Button Top Right */}
//                       {inCart > 0 && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeFromCart(item);
//                           }}
//                           className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg shadow hover:bg-red-600 transition z-10"
//                         >
//                           -
//                         </button>
//                       )}

//                       <div className="w-full h-32 relative rounded-xl overflow-hidden mb-2">
//                         {item.imageUrl ? (
//                           <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
//                         ) : (
//                           <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 rounded-xl">
//                             No Image
//                           </div>
//                         )}
//                       </div>

//                       {/* Name & Price Centered */}
//                       <div className="flex flex-col items-center text-center">
//                         <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                         <p className="text-green-600 font-bold mt-1">₹{item.price?.toFixed(2) ?? "N/A"}</p>
//                       </div>

//                       {/* Quantity Badge Bottom Left */}
//                       {inCart > 0 && (
//                         <motion.div
//                           key={inCart}
//                           className="absolute bottom-2 left-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ type: "spring", stiffness: 500, damping: 20 }}
//                         >
//                           {inCart}
//                         </motion.div>
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </section>
//           ))}
//         </div>

//         {/* Bottom Cart Bar */}
//         {totalItems > 0 && (
//           <motion.div
//             className="fixed bottom-0 left-0 right-0 bg-white shadow-xl border-t z-50 px-4 py-3 flex justify-between items-center md:px-6"
//             initial={{ y: 100 }}
//             animate={{ y: 0 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             <div className="flex flex-col md:flex-row gap-2 md:gap-4 font-semibold text-gray-800">
//               <span>🛒 {totalItems} item{totalItems > 1 ? "s" : ""}</span>
//               <span>Total: ₹{totalPrice.toFixed(2)}</span>
//             </div>
//             <button
//               onClick={() => setShowDetail(true)}
//               className="bg-green-600 px-4 py-2 rounded-xl text-white font-semibold hover:bg-green-700 transition"
//             >
//               Details
//             </button>
//           </motion.div>
//         )}

//         {/* Modal for Full Details */}
//         <AnimatePresence>
//           {showDetail && (
//             <>
//               <motion.div
//                 className="fixed inset-0 bg-black/50 z-40"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setShowDetail(false)}
//               />
//               <motion.div
//                 className="fixed bottom-0 left-0 right-0 md:inset-0 md:max-w-2xl mx-auto bg-white rounded-t-2xl md:rounded-xl shadow-2xl z-50 overflow-y-auto max-h-[90vh]"
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 exit={{ y: "100%" }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               >
//                 <div className="p-6">
//                   <h2 className="text-2xl font-bold mb-4 text-gray-800">📝 Selected Items</h2>
//                   <ul className="space-y-2">
//                     {Object.values(cart).map((item) => (
//                       <li
//                         key={item.id}
//                         className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
//                       >
//                         <div>
//                           <p className="font-medium text-gray-800">{item.name}</p>
//                           <p className="text-gray-600 text-sm">
//                             Qty: {item.quantity} | ₹{(item.price! * item.quantity).toFixed(2)}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => removeFromCart(item)}
//                           className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
//                         >
//                           -
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="mt-4 font-bold text-gray-800 text-lg">Total: ₹{totalPrice.toFixed(2)}</p>
//                   <button
//                     onClick={() => {
//                       console.log("Generate Payment Slip:", cart);
//                       setShowDetail(false);
//                     }}
//                     className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl shadow-lg font-semibold hover:bg-green-700 transition"
//                   >
//                     ✅ Generate Payment Slip
//                   </button>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }












// "use client";

// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// type MenuItem = {
//   id: string;
//   name: string;
//   price?: number;
//   imageUrl?: string;
//   unit?: string;
// };

// type MenuCategory = {
//   id: string;
//   name: string;
//   items: MenuItem[];
// };

// type CartItem = MenuItem & { quantity: number };

// export default function ViewMenuPage() {
//   const { getToken } = useAuth();
//   const [menus, setMenus] = useState<MenuCategory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [cart, setCart] = useState<Record<string, CartItem>>({});
//   const [showDetail, setShowDetail] = useState(false);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//   // ✅ Audio for add/remove
//   const addSound = typeof Audio !== "undefined" ? new Audio("/sounds/add.mp3") : null;
//   const removeSound = typeof Audio !== "undefined" ? new Audio("/sounds/remove.mp3") : null;

//   useEffect(() => {
//     const fetchMenus = async () => {
//       setLoading(true);
//       try {
//         const token = await getToken();
//         if (!token) throw new Error("Unauthorized");

//         const res = await fetch("/api/menu/view", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("Failed to fetch menus");
//         const data = await res.json();
//         setMenus(data.menus || []);
//         if (data.menus?.length > 0) setActiveCategory(data.menus[0].id);
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMenus();
//   }, [getToken]);

//   const addToCart = (item: MenuItem) => {
//     setCart((prev) => {
//       const existing = prev[item.id];
//       return {
//         ...prev,
//         [item.id]: { ...item, quantity: existing ? existing.quantity + 1 : 1 },
//       };
//     });

//     // Play add sound
//     if (addSound) {
//       addSound.currentTime = 0;
//       addSound.play();
//     }
//   };

//   const removeFromCart = (item: MenuItem) => {
//     setCart((prev) => {
//       const existing = prev[item.id];
//       if (!existing) return prev;

//       // Play remove sound
//       if (removeSound) {
//         removeSound.currentTime = 0;
//         removeSound.play();
//       }

//       if (existing.quantity === 1) {
//         const newCart = { ...prev };
//         delete newCart[item.id];
//         return newCart;
//       }
//       return { ...prev, [item.id]: { ...existing, quantity: existing.quantity - 1 } };
//     });
//   };

//   const scrollToCategory = (id: string) => {
//     const el = document.getElementById(`cat-${id}`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       setActiveCategory(id);
//     }
//   };

//   const totalPrice = Object.values(cart).reduce(
//     (sum, item) => sum + (item.price || 0) * item.quantity,
//     0
//   );

//   const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

//   if (loading) return <p className="p-4 text-center">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500 text-center">Error: {error}</p>;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar - Categories */}
//       <div className="w-1/5 bg-white border-r shadow-sm overflow-y-auto p-4">
//         <h2 className="font-bold text-xl mb-6 text-gray-700">Categories</h2>
//         <ul className="space-y-3">
//           {menus.map((cat) => (
//             <li key={cat.id}>
//               <button
//                 onClick={() => scrollToCategory(cat.id)}
//                 className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
//                   activeCategory === cat.id
//                     ? "bg-green-500 text-white"
//                     : "hover:bg-green-100 hover:text-green-700 text-gray-800"
//                 }`}
//               >
//                 {cat.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right - Items */}
//       <div className="flex-1 overflow-y-auto p-4 md:p-6">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>
//         <div className="space-y-12">
//           {menus.map((cat) => (
//             <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
//               <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
//                 {cat.name}
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {cat.items.map((item) => {
//                   const inCart = cart[item.id]?.quantity || 0;
//                   return (
//                     <motion.div
//                       key={item.id}
//                       className="border rounded-2xl p-2 shadow-md hover:shadow-xl transition relative bg-white cursor-pointer flex flex-col items-center"
//                       onClick={() => addToCart(item)}
//                       whileHover={{ scale: 1.03 }}
//                       layout
//                     >
//                       {/* Minus Button Top Right */}
//                       {inCart > 0 && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeFromCart(item);
//                           }}
//                           className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg shadow hover:bg-red-600 transition z-10"
//                         >
//                           -
//                         </button>
//                       )}

//                       <div className="w-full h-32 relative rounded-xl overflow-hidden mb-2">
//                         {item.imageUrl ? (
//                           <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
//                         ) : (
//                           <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 rounded-xl">
//                             No Image
//                           </div>
//                         )}
//                       </div>

//                       {/* Name & Price Centered */}
//                       <div className="flex flex-col items-center text-center">
//                         <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                         <p className="text-green-600 font-bold mt-1">₹{item.price?.toFixed(2) ?? "N/A"}</p>
//                       </div>

//                       {/* Quantity Badge Bottom Left */}
//                       {inCart > 0 && (
//                         <motion.div
//                           key={inCart}
//                           className="absolute bottom-2 left-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ type: "spring", stiffness: 500, damping: 20 }}
//                         >
//                           {inCart}
//                         </motion.div>
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </section>
//           ))}
//         </div>

//         {/* Bottom Cart Bar */}
//         {totalItems > 0 && (
//           <motion.div
//             className="fixed bottom-0 left-0 right-0 bg-white shadow-xl border-t z-50 px-4 py-3 flex justify-between items-center md:px-6"
//             initial={{ y: 100 }}
//             animate={{ y: 0 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             <div className="flex flex-col md:flex-row gap-2 md:gap-4 font-semibold text-gray-800">
//               <span>🛒 {totalItems} item{totalItems > 1 ? "s" : ""}</span>
//               <span>Total: ₹{totalPrice.toFixed(2)}</span>
//             </div>
//             <button
//               onClick={() => setShowDetail(true)}
//               className="bg-green-600 px-4 py-2 rounded-xl text-white font-semibold hover:bg-green-700 transition"
//             >
//               Details
//             </button>
//           </motion.div>
//         )}

//         {/* Modal for Full Details */}
//         <AnimatePresence>
//           {showDetail && (
//             <>
//               <motion.div
//                 className="fixed inset-0 bg-black/50 z-40"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setShowDetail(false)}
//               />
//               <motion.div
//                 className="fixed bottom-0 left-0 right-0 md:inset-0 md:max-w-2xl mx-auto bg-white rounded-t-2xl md:rounded-xl shadow-2xl z-50 overflow-y-auto max-h-[90vh]"
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 exit={{ y: "100%" }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               >
//                 <div className="p-6">
//                   <h2 className="text-2xl font-bold mb-4 text-gray-800">📝 Selected Items</h2>
//                   <ul className="space-y-2">
//                     {Object.values(cart).map((item) => (
//                       <li
//                         key={item.id}
//                         className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
//                       >
//                         <div>
//                           <p className="font-medium text-gray-800">{item.name}</p>
//                           <p className="text-gray-600 text-sm">
//                             Qty: {item.quantity} | ₹{(item.price! * item.quantity).toFixed(2)}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => removeFromCart(item)}
//                           className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
//                         >
//                           -
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="mt-4 font-bold text-gray-800 text-lg">Total: ₹{totalPrice.toFixed(2)}</p>
//                   <button
//                     onClick={() => {
//                       console.log("Generate Payment Slip:", cart);
//                       setShowDetail(false);
//                     }}
//                     className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl shadow-lg font-semibold hover:bg-green-700 transition"
//                   >
//                     ✅ Generate Payment Slip
//                   </button>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
  unit?: string;
};

type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

type CartItem = MenuItem & { quantity: number };

export default function ViewMenuPage() {
  const { getToken } = useAuth();
  const [menus, setMenus] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [showDetail, setShowDetail] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // ✅ Audio for add/remove
  const addSound = typeof Audio !== "undefined" ? new Audio("/sounds/add.mp3") : null;
  const removeSound = typeof Audio !== "undefined" ? new Audio("/sounds/remove.mp3") : null;

  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        if (!token) throw new Error("Unauthorized");

        const res = await fetch("/api/menu/view", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch menus");
        const data = await res.json();
        setMenus(data.menus || []);
        if (data.menus?.length > 0) setActiveCategory(data.menus[0].id);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, [getToken]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: { ...item, quantity: existing ? existing.quantity + 1 : 1 },
      };
    });

    if (addSound) {
      addSound.currentTime = 0;
      addSound.play();
    }
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      if (!existing) return prev;

      if (removeSound) {
        removeSound.currentTime = 0;
        removeSound.play();
      }

      if (existing.quantity === 1) {
        const newCart = { ...prev };
        delete newCart[item.id];
        return newCart;
      }
      return { ...prev, [item.id]: { ...existing, quantity: existing.quantity - 1 } };
    });
  };

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(id);
    }
  };

  const totalPrice = Object.values(cart).reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Categories */}
      <div className="w-1/5 bg-white border-r shadow-sm overflow-y-auto p-4">
        <h2 className="font-bold text-xl mb-6 text-gray-700">Categories</h2>
        <ul className="space-y-3">
          {menus.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => scrollToCategory(cat.id)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                  activeCategory === cat.id
                    ? "bg-green-500 text-white"
                    : "hover:bg-green-100 hover:text-green-700 text-gray-800"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right - Items */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>
        <div className="space-y-12">
          {menus.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">{cat.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {cat.items.map((item) => {
                  const inCart = cart[item.id]?.quantity || 0;
                  return (
                    <motion.div
                      key={item.id}
                      className="border rounded-2xl p-2 shadow-md hover:shadow-xl transition relative bg-white cursor-pointer flex flex-col items-center"
                      onClick={() => addToCart(item)}
                      whileHover={{ scale: 1.03 }}
                      layout
                    >
                      {/* Minus Button Top Right */}
                      {inCart > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg shadow hover:bg-red-600 transition z-10"
                        >
                          -
                        </button>
                      )}

                      <div className="w-full h-32 relative rounded-xl overflow-hidden mb-2">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 rounded-xl">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Name & Price Centered */}
                      <div className="flex flex-col items-center text-center">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-green-600 font-bold mt-1">
                          ₹{item.price?.toFixed(2) ?? "N/A"}
                        </p>
                      </div>

                      {/* Quantity Badge Bottom Left with AnimatePresence */}
                      <AnimatePresence>
                        {inCart > 0 && (
                          <motion.div
                            key={inCart}
                            className="absolute bottom-2 left-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          >
                            {inCart}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Cart Bar */}
        {totalItems > 0 && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-xl border-t z-50 px-4 py-3 flex justify-between items-center md:px-6"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 font-semibold text-gray-800">
              <span>
                🛒 {totalItems} item{totalItems > 1 ? "s" : ""}
              </span>
              <span>Total: ₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setShowDetail(true)}
              className="bg-green-600 px-4 py-2 rounded-xl text-white font-semibold hover:bg-green-700 transition"
            >
              Details
            </button>
          </motion.div>
        )}

        {/* Modal for Full Details */}
        <AnimatePresence>
          {showDetail && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDetail(false)}
              />
              <motion.div
                className="fixed bottom-0 left-0 right-0 md:inset-0 md:max-w-2xl mx-auto bg-white rounded-t-2xl md:rounded-xl shadow-2xl z-50 overflow-y-auto max-h-[90vh]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">📝 Selected Items</h2>
                  <ul className="space-y-2">
                    {Object.values(cart).map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-gray-600 text-sm">
                            Qty: {item.quantity} | ₹{(item.price! * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
                        >
                          -
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-bold text-gray-800 text-lg">
                    Total: ₹{totalPrice.toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      console.log("Generate Payment Slip:", cart);
                      setShowDetail(false);
                    }}
                    className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl shadow-lg font-semibold hover:bg-green-700 transition"
                  >
                    ✅ Generate Payment Slip
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
