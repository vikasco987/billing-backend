"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export interface MenuItem {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
}

interface ItemSelectorProps {
  items: MenuItem[];
  cart: Record<string, { quantity: number; item: MenuItem }>;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (item: MenuItem) => void;
}

export default function ItemSelector({ items, cart, addToCart, removeFromCart }: ItemSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const inCart = cart[item.id]?.quantity || 0;
        return (
          <motion.div
            key={item.id}
            className={`border rounded-2xl p-2 shadow-md flex flex-col items-center cursor-pointer ${
              inCart > 0 ? "bg-green-100" : "bg-white"
            }`}
            onClick={() => addToCart(item)}
            whileHover={{ scale: 1.03 }}
            layout
          >
            {inCart > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(item);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg"
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

            <div className="text-center">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-green-600 font-bold mt-1">₹{item.price?.toFixed(2) ?? "N/A"}</p>
            </div>

            <AnimatePresence>
              {inCart > 0 && (
                <motion.div
                  key={inCart}
                  className="absolute bottom-2 left-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  {inCart}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
