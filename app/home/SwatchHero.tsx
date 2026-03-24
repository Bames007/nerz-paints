"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// 1. Define the 2026 Luxury Palette
const PIGMENTS = [
  {
    id: "taupe",
    name: "Warm Taupe",
    hex: "#A47864",
    description: "Sophisticated & Grounded",
  },
  {
    id: "teal",
    name: "Transformative Teal",
    hex: "#315B5D",
    description: "Eco-Conscious Depth",
  },
  {
    id: "damson",
    name: "Divine Damson",
    hex: "#4D3B4D",
    description: "Rich, Plummy Velvet",
  },
  {
    id: "mahogany",
    name: "Warm Mahogany",
    hex: "#6D3535",
    description: "Heritage Red",
  },
  {
    id: "eucalyptus",
    name: "Smoky Jade",
    hex: "#70827D",
    description: "Natural Serenity",
  },
];

const SwatchHero = () => {
  const [activePigment, setActivePigment] = useState(PIGMENTS[0]);

  return (
    <section className="relative min-h-screen bg-[#F8F7F4] overflow-hidden py-24">
      <div className="container mx-auto px-6 lg:px-16 grid lg:grid-cols-12 gap-16 items-center">
        {/* --- LEFT: The Control Panel --- */}
        <div className="lg:col-span-5 z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-neutral-400 mb-4 block">
              Color Concept 2026
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-neutral-900 mb-6 italic">
              Interactive <br />
              Pigments
            </h2>
            <p className="text-neutral-500 mb-12 max-w-sm leading-relaxed font-light">
              Select a signature shade to visualize how Nerzpaints’ reactive
              pigments interact with architectural light.
            </p>

            {/* Swatch Grid */}
            <div className="space-y-4">
              {PIGMENTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePigment(p)}
                  className={`w-full flex items-center gap-6 p-4 transition-all duration-500 rounded-sm border ${
                    activePigment.id === p.id
                      ? "bg-white border-neutral-200 shadow-xl translate-x-4"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full shadow-inner"
                    style={{ backgroundColor: p.hex }}
                  />
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-900">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-tighter">
                      {p.description}
                    </p>
                  </div>
                  {activePigment.id === p.id && (
                    <motion.div
                      layoutId="pointer"
                      className="ml-auto text-primary"
                    >
                      <div className="w-2 h-2 bg-neutral-900 rounded-full" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT: The Dynamic Visualizer --- */}
        <div className="lg:col-span-7 relative flex justify-center items-center">
          <motion.div
            className="relative w-full aspect-[4/5] md:aspect-video lg:aspect-[4/3] rounded-sm overflow-hidden shadow-[60px_60px_100px_-20px_rgba(0,0,0,0.1)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* The Base Architectural Image (Must be a relatively light/neutral wall) */}
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"
              alt="Architectural Wall"
              fill
              className="object-cover transition-opacity duration-1000"
              priority
            />

            {/* THE "MAGIC" LAYER: The Digital Paint Overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePigment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }} // Adjust opacity to keep wall texture visible
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: activePigment.hex,
                  mixBlendMode: "multiply", // STAIN EFFECT
                }}
              />
            </AnimatePresence>

            {/* Text Overlay on Image */}
            <div className="absolute bottom-10 left-10 z-30">
              <p className="text-white text-[8px] uppercase tracking-[0.6em] mb-2">
                Selected Shade
              </p>
              <h3 className="text-white text-3xl font-serif italic">
                {activePigment.name}
              </h3>
            </div>
          </motion.div>

          {/* Decorative Floating Label */}
          <div className="absolute -bottom-6 -right-6 bg-neutral-900 text-white p-8 hidden md:block z-40">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2">
              Pigment Data
            </p>
            <p className="font-mono text-sm leading-none tracking-widest">
              {activePigment.hex}
            </p>
            <p className="text-[9px] mt-4 opacity-50 uppercase">
              Light Reflectance Value: 24%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwatchHero;
