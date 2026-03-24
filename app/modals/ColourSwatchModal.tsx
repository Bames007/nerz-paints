"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Palette,
  ChevronRight,
  Info,
  ChevronLeft,
} from "lucide-react";
import { colours } from "../data/colours";

interface ColourSwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ColourSwatchModal = ({ isOpen, onClose }: ColourSwatchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColours = colours.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.family.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Darker for mobile focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm md:backdrop-blur-md"
          />

          {/* Side Drawer - Full width on Mobile, max-md on Desktop */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[101] w-full md:max-w-md bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.2)] flex flex-col"
          >
            {/* Header Section - Sticky with mobile back button */}
            <div className="p-5 md:p-6 border-b border-slate-100 bg-white sticky top-0 z-20">
              <div className="flex items-center justify-between mb-5 md:mb-6">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button */}
                  <button onClick={onClose} className="md:hidden p-1 -ml-1">
                    <ChevronLeft className="w-6 h-6 text-slate-900" />
                  </button>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                      <Palette className="hidden md:block w-6 h-6 text-[#8B1E3F]" />
                      Explore Library
                    </h2>
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                      {colours.length} Signature Shades
                    </p>
                  </div>
                </div>

                {/* Desktop Close Button */}
                <button
                  onClick={onClose}
                  className="hidden md:flex p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Bar - Larger for mobile thumbs */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#8B1E3F] transition-colors" />
                <input
                  type="text"
                  placeholder="Search colors or families..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 md:py-3 bg-slate-50 border-2 border-transparent focus:border-[#8B1E3F]/10 focus:bg-white rounded-2xl transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            {/* Scrollable Swatch Grid */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 custom-scrollbar pb-32 md:pb-6">
              {filteredColours.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:gap-x-4 md:gap-y-6">
                  {filteredColours.map((colour, index) => (
                    <motion.div
                      key={colour.hex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="group cursor-pointer"
                      onClick={() => {
                        // Pass selected colour back or navigate
                        onClose();
                      }}
                    >
                      {/* Paint Chip Card */}
                      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 group-hover:shadow-xl transition-all duration-300">
                        <div
                          className="w-full aspect-[4/5] flex items-end p-3 md:p-4"
                          style={{ backgroundColor: colour.hex }}
                        >
                          {/* Inner Label - Always visible on mobile, hover on desktop */}
                          <div className="w-full bg-white/90 backdrop-blur-sm p-2.5 md:p-3 rounded-xl md:rounded-2xl flex justify-between items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase">
                              Select
                            </span>
                            <ChevronRight className="w-3 h-3 text-slate-900" />
                          </div>
                        </div>
                      </div>

                      {/* Info Text */}
                      <div className="mt-2.5 px-1 text-center">
                        <h3 className="font-bold text-slate-900 text-xs md:text-sm truncate">
                          {colour.name}
                        </h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                          {colour.family}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <Info className="w-8 h-8 text-slate-200 mb-2" />
                  <p className="text-slate-500 text-sm font-medium">
                    No shades found.
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#8B1E3F] text-xs font-bold mt-2 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Footer Tip - Sticky on Mobile bottom */}
            <div className="p-5 md:p-6 bg-slate-50 border-t border-slate-100 mt-auto">
              <div className="bg-[#8B1E3F]/5 rounded-2xl p-4 flex gap-3 md:gap-4 items-start">
                <div className="p-2 bg-[#8B1E3F] rounded-xl shrink-0">
                  <Palette className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-wide">
                    Pro Tip
                  </p>
                  <p className="text-[10px] md:text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Colors vary by screen. We recommend ordering a
                    <span className="text-[#8B1E3F] font-bold">
                      {" "}
                      Physical Swatch
                    </span>{" "}
                    before buying.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ColourSwatchModal;
