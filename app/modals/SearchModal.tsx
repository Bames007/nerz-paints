"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  TrendingUp,
  Clock,
  ArrowRight,
  Paintbrush,
} from "lucide-react";
import { products } from "../data/products";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  "Interior Matte",
  "Exterior Gloss",
  "Automotive Pearl",
  "Sage Green",
  "Royal Velvet",
];
const recentSearches = ["WeatherShield", "Silk Finish"];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-white flex flex-col"
        >
          {/* Top Search Bar */}
          <div className="p-6 md:p-10 flex items-center gap-4 max-w-7xl mx-auto w-full">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#8B1E3F]" />
              <input
                type="text"
                placeholder="Search products, finishes, or colors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full pl-16 pr-8 py-6 bg-slate-50 border-none rounded-[2.5rem] text-xl font-medium focus:ring-4 focus:ring-[#8B1E3F]/5 transition-all outline-none placeholder:text-slate-300"
              />
            </div>
            <button
              onClick={onClose}
              className="p-5 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10 custom-scrollbar">
            <div className="max-w-7xl mx-auto w-full">
              {query.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <motion.div
                        layout
                        key={product.id}
                        className="flex items-center gap-6 p-4 rounded-[2rem] hover:bg-slate-50 cursor-pointer transition-colors group"
                        onClick={onClose}
                      >
                        <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-slate-400 font-medium">
                            {product.category}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-[#8B1E3F] text-xs font-black uppercase tracking-widest">
                            Shop Now <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <Paintbrush className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                      <p className="text-2xl font-bold text-slate-900">
                        No results found for "{query}"
                      </p>
                      <p className="text-slate-400 mt-2">
                        Try searching for generic terms like "Paints" or "Blue"
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Suggestions View */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">
                  <section>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
                      Recent History
                    </h3>
                    <div className="space-y-4">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="flex items-center gap-4 text-2xl font-bold text-slate-800 hover:text-[#8B1E3F] transition-colors group"
                        >
                          <Clock className="w-5 h-5 text-slate-300 group-hover:text-[#8B1E3F]" />{" "}
                          {term}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
                      Popular Now
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-6 py-3 bg-slate-50 hover:bg-[#8B1E3F] hover:text-white rounded-full text-sm font-bold text-slate-600 transition-all flex items-center gap-2"
                        >
                          <TrendingUp className="w-4 h-4 opacity-50" /> {term}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
