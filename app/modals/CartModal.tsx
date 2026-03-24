"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Lock,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, ...item } : null;
    })
    .filter((i): i is any => i !== null);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(item.priceRange.split("–")[0].replace(/[₦,]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const threshold = 50000;
  const shipping = subtotal >= threshold || subtotal === 0 ? 0 : 2500;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md"
          />

          {/* Drawer: Full width on mobile, 450px on desktop */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[101] w-full md:max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 md:p-6 border-b flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-2">
                {/* Mobile Back Button */}
                <button onClick={onClose} className="md:hidden p-1 -ml-2">
                  <ChevronLeft className="w-6 h-6 text-slate-900" />
                </button>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">
                    Your Cart
                  </h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {cartItems.length} Items Selected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hidden md:block p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Items Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    key={`${item.id}-${item.size}`}
                    className="flex gap-3 md:gap-4 p-3 md:p-4 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 relative group"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="pr-6">
                        <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight truncate">
                          {item.name}
                        </h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[9px] font-black bg-white px-2 py-0.5 rounded-full border border-slate-200 text-[#8B1E3F] uppercase tracking-tighter">
                            {item.size}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls - Bigger touch targets for mobile */}
                        <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, undefined, -1)
                            }
                            className="p-1.5 md:p-1 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, undefined, 1)
                            }
                            className="p-1.5 md:p-1 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Mobile Price Display */}
                        <p className="md:hidden font-black text-slate-900 text-sm">
                          ₦
                          {(
                            parseInt(
                              item.priceRange
                                .split("–")[0]
                                .replace(/[₦,]/g, ""),
                            ) * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Delete & Price (Desktop/Layout) */}
                    <div className="flex flex-col items-end justify-between py-0.5">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-slate-300 hover:text-red-500 transition-colors absolute top-3 right-3 md:relative md:top-0 md:right-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <p className="hidden md:block font-black text-slate-900">
                        ₦{item.priceRange.split("–")[0].replace("₦", "")}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6 py-20">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-10 h-10 text-slate-200" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Your cart is empty
                  </h4>
                  <p className="text-slate-400 text-sm mt-2 max-w-[250px]">
                    Looks like you haven't added any luxury paints to your
                    project yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 text-[#8B1E3F] font-black text-xs uppercase tracking-widest border-b-2 border-[#8B1E3F] pb-1"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer: Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 md:p-8 bg-slate-50 border-t space-y-4 md:space-y-6">
                {/* Shipping Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase text-slate-400">
                    <span>Free Delivery Limit</span>
                    <span
                      className={subtotal >= threshold ? "text-green-600" : ""}
                    >
                      {subtotal >= threshold
                        ? "Free Shipping Unlocked!"
                        : `₦${(threshold - subtotal).toLocaleString()} to go`}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min((subtotal / threshold) * 100, 100)}%`,
                      }}
                      className="h-full bg-[#28A745]"
                    />
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-sm text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-slate-900 font-bold">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-[#28A745] font-bold">
                      {shipping === 0
                        ? "FREE"
                        : `₦${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl md:text-3xl font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span>₦{(subtotal + shipping).toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-[#8B1E3F] text-white py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-base md:text-lg shadow-xl shadow-[#8B1E3F]/20 flex items-center justify-center gap-3 hover:bg-[#6b1731] active:scale-95 transition-all group">
                  Proceed to Checkout
                  <Lock className="w-4 h-4 md:w-5 md:h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
