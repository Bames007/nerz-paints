"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2, ShoppingCart, ArrowRight, Wand } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import toast from "react-hot-toast";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistModal = ({ isOpen, onClose }: WishlistModalProps) => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const wishlistItems = wishlist
    .map((item) => products.find((p) => p.id === item.id))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
    toast.error("Removed from wishlist", {
      style: { borderRadius: "15px", background: "#333", color: "#fff" },
    });
  };

  const handleAddToCart = (product: any) => {
    addToCart(product.id);
    toast.success(`${product.name} added to cart!`, {
      icon: "🛍️",
      style: { borderRadius: "15px" },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[121] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Elegant Header */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  Favorites{" "}
                  <Heart className="w-5 h-5 text-[#8B1E3F] fill-[#8B1E3F]" />
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  Saved for later ({wishlistItems.length})
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    className="group relative flex gap-4 p-4 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                  >
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-bold text-slate-900 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">
                        {item.category}
                      </p>
                      <p className="text-[#8B1E3F] font-black mt-2">
                        {item.priceRange}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 justify-center">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="p-3 bg-white shadow-sm border border-slate-100 text-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white rounded-xl transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-3 bg-white shadow-sm border border-slate-100 text-slate-300 hover:text-red-500 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="relative mb-6">
                    <Heart className="w-20 h-20 text-slate-100" />
                    <Wand className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Your wishlist is dreaming
                  </h4>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    Add the shades and finishes you love most. We'll keep them
                    safe for your next project.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#8B1E3F] transition-colors"
                  >
                    Start Exploring
                  </button>
                </div>
              )}
            </div>

            {wishlistItems.length > 0 && (
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <button className="w-full bg-[#8B1E3F] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-[#8B1E3F]/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                  Move All to Cart <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistModal;
