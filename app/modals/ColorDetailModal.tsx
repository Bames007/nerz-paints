"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Droplet,
  Heart,
  Share2,
  Box,
  ChevronLeft,
  PaintRoller,
} from "lucide-react";

interface ColorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  color: { name: string; hex: string; family: string } | null;
}

const ColorDetailModal = ({
  isOpen,
  onClose,
  color,
}: ColorDetailModalProps) => {
  if (!color) return null;

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
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 md:inset-6 lg:inset-16 z-[101] bg-white md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Visual Side: Swatch */}
            <div
              className="w-full md:w-1/2 h-[40vh] md:h-auto relative shrink-0"
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Mobile Back Button */}
              <button
                onClick={onClose}
                className="absolute top-6 left-6 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-xl md:hidden z-20 border border-white/30"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20"
                >
                  Nerzpaints Premium
                </motion.span>
                <h2 className="text-4xl md:text-7xl font-black mt-4 leading-[0.9] tracking-tighter">
                  {color.name}
                </h2>
                <p className="text-lg md:text-xl opacity-80 mt-2 font-mono font-medium">
                  {color.hex.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 flex flex-col bg-white overflow-y-auto overflow-x-hidden">
              {/* Desktop Close */}
              <div className="hidden md:flex justify-end p-8 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-slate-100 rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-slate-400 group-hover:text-slate-900" />
                </button>
              </div>

              <div className="p-6 md:p-12 space-y-8 md:space-y-12">
                {/* Description */}
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B1E3F] mb-4">
                    Color Profile
                  </h4>
                  <p className="text-xl md:text-2xl text-slate-600 leading-snug font-medium">
                    A sophisticated{" "}
                    <span className="text-slate-900 font-black">
                      {color.family}
                    </span>{" "}
                    base that harmonizes with natural light and premium
                    architectural finishes.
                  </p>
                </section>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="bg-slate-50 p-4 md:p-0 md:bg-transparent rounded-2xl space-y-1 md:space-y-2">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Finish Type
                    </p>
                    <p className="font-bold text-sm md:text-base flex items-center gap-2 text-slate-900">
                      <PaintRoller className="w-4 h-4 text-[#FFB800]" /> Velvet
                      Matte
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 md:p-0 md:bg-transparent rounded-2xl space-y-1 md:space-y-2">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Coverage
                    </p>
                    <p className="font-bold text-sm md:text-base flex items-center gap-2 text-slate-900">
                      <Box className="w-4 h-4 text-slate-400" /> 12-14 m²/L
                    </p>
                  </div>
                </div>

                {/* Harmony Palette */}
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
                    Harmony Palette
                  </h4>
                  <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {["#F8F9FA", "#E9ECEF", "#DEE2E6", "#CED4DA"].map((c) => (
                      <div key={c} className="group shrink-0">
                        <div
                          className="w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-inner mb-2 border border-slate-100 group-hover:scale-105 transition-transform cursor-pointer"
                          style={{ backgroundColor: c }}
                        />
                        <p className="text-[9px] text-center font-bold text-slate-400 uppercase">
                          {c}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* CTA Actions */}
                <div className="pt-8 md:pt-12 border-t border-slate-100 flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white pb-6 md:pb-0">
                  <button className="flex-[2] bg-[#1A1A1A] text-white py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-[#8B1E3F] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
                    <Droplet className="w-4 h-4" /> Shop This Color
                  </button>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none p-5 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors flex justify-center">
                      <Heart className="w-5 h-5 text-slate-400" />
                    </button>
                    <button className="flex-1 sm:flex-none p-5 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors flex justify-center">
                      <Share2 className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ColorDetailModal;
