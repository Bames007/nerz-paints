"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Handshake,
} from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Oluwaseun Akinwale",
    role: "Homeowner",
    quote:
      "Nerzpaints transformed our living room. The colour depth is incredible, and it's so easy to apply. Highly recommended!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
    accent: "#8B1E3F",
  },
  {
    id: 2,
    name: "Chioma Okafor",
    role: "Interior Designer",
    quote:
      "I've used many paint brands, but Nerzpaints stands out for its durability and rich pigmentation. My clients love it.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-27193f96c19d?w=400&auto=format&fit=crop",
    accent: "#FFB800",
  },
  {
    id: 3,
    name: "Michael Okonkwo",
    role: "Contractor",
    quote:
      "For large projects, Nerzpaints is my go-to. Great coverage, consistent quality, and excellent customer support.",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
    accent: "#28A745",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "50%" : "-50%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "50%" : "-50%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  const onDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -500) next();
    else if (swipe > 500) prev();
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  const active = testimonials[currentIndex];

  return (
    <section className="relative py-16 md:py-24 bg-[#FAF9F6] overflow-hidden">
      {/* Background Glow - Reduced size for mobile */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] opacity-10 md:opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: active.accent }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 md:mb-6 border border-slate-100"
          >
            <Handshake className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">
              Global Recognition
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-[1.1]">
            Voices of <span className="text-[#8B1E3F]">Trust</span>
          </h2>
        </header>

        <div
          className="relative max-w-6xl mx-auto flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              className="w-full cursor-grab active:cursor-grabbing"
            >
              <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center bg-white/60 md:bg-white/40 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 shadow-2xl border border-white/50">
                {/* Visual Side: Stacked first on mobile */}
                <div className="relative group order-1 lg:order-1">
                  <div className="relative aspect-square w-full max-w-[280px] md:max-w-[400px] mx-auto overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-2xl rotate-1 md:rotate-2 group-hover:rotate-0 transition-transform duration-700">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Rating Badge - Smaller on Mobile */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-4 -right-2 md:-right-10 bg-white p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-xl flex flex-col items-center z-10"
                  >
                    <div className="flex gap-0.5 md:gap-1 mb-1">
                      {[...Array(active.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 md:w-4 md:h-4 fill-[#FFB800] text-[#FFB800]"
                        />
                      ))}
                    </div>
                    <span className="text-[8px] md:text-[10px] font-black uppercase text-slate-400">
                      Verified Client
                    </span>
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="relative order-2 lg:order-2 flex flex-col text-center lg:text-left pt-4 md:pt-0">
                  <Quote className="w-12 h-12 md:w-24 md:h-24 text-[#8B1E3F]/10 absolute -top-4 -left-2 md:-top-16 md:-left-16" />

                  <h3 className="text-2xl md:text-5xl font-black text-slate-900 mb-2 md:mb-4 leading-tight">
                    {active.name}
                  </h3>
                  <p className="text-[#8B1E3F] font-bold text-sm md:text-lg mb-4 md:mb-8 tracking-wide">
                    {active.role}
                  </p>

                  <p className="text-lg md:text-2xl lg:text-3xl text-slate-600 leading-relaxed font-medium italic">
                    "{active.quote}"
                  </p>

                  <div className="mt-8 md:mt-12 flex items-center justify-center lg:justify-start gap-4">
                    <div className="h-[2px] w-8 md:w-12 bg-[#8B1E3F]/20" />
                    <span className="font-bold text-[10px] md:text-sm uppercase tracking-tighter text-slate-400">
                      Nerzpaints Partner
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:block">
            <button
              onClick={prev}
              className="absolute left-[-4%] top-1/2 -translate-y-1/2 bg-white w-16 h-16 rounded-full shadow-xl hover:bg-[#8B1E3F] hover:text-white transition-all flex items-center justify-center border border-slate-100 group"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={next}
              className="absolute right-[-4%] top-1/2 -translate-y-1/2 bg-white w-16 h-16 rounded-full shadow-xl hover:bg-[#8B1E3F] hover:text-white transition-all flex items-center justify-center border border-slate-100 group"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Pagination - Optimized for thumb tapping */}
        <div className="flex justify-center items-center gap-4 md:gap-6 mt-12 md:mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className="relative py-4 px-2"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? "w-8 md:w-12 bg-[#8B1E3F]"
                    : "w-3 md:w-4 bg-slate-200"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
