"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colours } from "../data/colours";
import { ChevronRight, MousePointer2 } from "lucide-react";
import ColorDetailModal from "../modals/ColorDetailModal";

// Grouping logic remains, but we ensure the "All" view feels curated
const families = ["All", "Neutral", "Blue", "Green", "Red", "Earth", "Grey"];

const ColourGallery = () => {
  const [selectedFamily, setSelectedFamily] = useState("All");
  const [hoveredColour, setHoveredColour] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredColours =
    selectedFamily === "All"
      ? colours
      : colours.filter((c) => c.family === selectedFamily);

  const openColorModal = (color: any) => {
    setSelectedColor(color);
    setModalOpen(true);
  };

  return (
    <>
      <section id="colours" className="py-32 bg-white relative overflow-hidden">
        {/* 1. LUXURY BACKGROUND: Subtle Grain & Large Text Typography */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <span className="absolute -top-10 -left-10 text-[300px] font-serif font-black">
            PIGMENT
          </span>
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          {/* --- SECTION HEADER --- */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-10 bg-neutral-900" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neutral-400">
                  The 2026 Archive
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-neutral-900 italic">
                Curation{" "}
                <span className="text-neutral-300 font-light not-italic">
                  &
                </span>{" "}
                Depth
              </h2>
            </motion.div>

            {/* FILTER BUTTONS: Minimalist Underline Style */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {families.map((family) => (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(family)}
                  className={`relative py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                    selectedFamily === family
                      ? "text-neutral-900"
                      : "text-neutral-300 hover:text-neutral-500"
                  }`}
                >
                  {family}
                  {selectedFamily === family && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* --- COLOR GRID: Staggered Layout --- */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredColours.map((colour, index) => (
                <motion.div
                  key={colour.hex}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.02 }}
                  onHoverStart={() => setHoveredColour(colour.hex)}
                  onHoverEnd={() => setHoveredColour(null)}
                  onClick={() => openColorModal(colour)}
                  className="group cursor-none relative" // CUSTOM CURSOR EXPERIENCE
                >
                  {/* The Swatch Card */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-neutral-50">
                    <div
                      className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ backgroundColor: colour.hex }}
                    />

                    {/* Architectural Light Overlay (Simulates a real wall shadow) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 opacity-60 pointer-events-none" />

                    {/* Quick View Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <MousePointer2 className="w-5 h-5 text-neutral-900" />
                      </div>
                    </div>

                    {/* Popular Tag */}
                    {colour.family === "Blue" && (
                      <div className="absolute top-4 left-4 mix-blend-difference text-white text-[8px] font-bold uppercase tracking-widest">
                        Trending
                      </div>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="px-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-1 flex justify-between items-center">
                      {colour.name}
                      <span className="text-[9px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {colour.hex}
                      </span>
                    </h4>
                    <p className="text-[10px] italic text-neutral-400 font-serif">
                      {colour.family} Collection
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* --- FOOTER CTA --- */}
          <div className="mt-32 pt-16 border-t border-neutral-100 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-full border border-neutral-200 flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-all duration-500">
                <ChevronRight className="w-6 h-6 text-neutral-400 group-hover:text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-neutral-900">
                Request Physical Swatches
              </span>
              <p className="text-[10px] text-neutral-400 mt-2 uppercase tracking-widest">
                Delivered to your studio within 48 hours
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Colour Detail Modal */}
      <ColorDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        color={selectedColor}
      />
    </>
  );
};

export default ColourGallery;
