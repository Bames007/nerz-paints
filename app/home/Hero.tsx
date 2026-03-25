"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";

const Hero = () => {
  const { scrollY } = useScroll();

  // Parallax offsets for that "Deep" UI feel
  const yImage = useTransform(scrollY, [0, 500], [0, 120]);
  const yBadge = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-[#F8F7F4] pt-20 pb-12"
    >
      {/* 1. ARCHITECTURAL TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      <div className="container mx-auto px-6 lg:px-16 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* --- LEFT COLUMN: Editorial Content --- */}
        <div className="lg:col-span-7 xl:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-neutral-400"></span>
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-neutral-500">
                Premium Architectural Finishes
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl xl:text-9xl font-serif text-neutral-900 leading-[0.95] mb-10 tracking-tight">
              Define Your <br />
              <span className="italic font-light text-neutral-400">
                Atmosphere.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-xl leading-relaxed font-light">
              Nerzpaints engineers pigments that respond to light. From heritage
              restoration to modern industrial coating, we craft the skin of
              your environment.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ScrollLink
                to="colours"
                smooth={true}
                duration={1000}
                className="w-full sm:w-auto cursor-pointer group relative px-12 py-5 bg-neutral-900 text-white overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center"
              >
                <span className="relative z-10 font-medium tracking-widest uppercase text-xs">
                  Explore Palette
                </span>
                <div className="absolute inset-0 bg-[#C5A27D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </ScrollLink>

              <ScrollLink
                to="process"
                smooth={true}
                className="text-xs font-bold tracking-[0.2em] uppercase border-b border-neutral-300 hover:border-neutral-900 transition-all cursor-pointer py-2"
              >
                The Formulation
              </ScrollLink>
            </div>

            {/* MICRO-STATS (Social Proof) */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-neutral-200 pt-10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                  Finish Quality
                </p>
                <p className="text-2xl font-serif text-neutral-800 italic">
                  Ultra-Matte
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                  Eco-Standard
                </p>
                <p className="text-2xl font-serif text-neutral-800">Zero VOC</p>
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                  Longevity
                </p>
                <p className="text-2xl font-serif text-neutral-800">
                  25 Years +
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN: High-End Visuals --- */}
        <div className="lg:col-span-5 xl:col-span-5 order-1 lg:order-2 relative">
          <motion.div style={{ y: yImage }} className="relative z-20">
            {/* Main Luxury Image */}
            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-t-[200px] rounded-b-lg shadow-[40px_60px_100px_-20px_rgba(0,0,0,0.2)]">
              <Image
                src="https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2070&auto=format&fit=crop"
                alt="High-end interior design with Nerzpaints"
                fill
                priority
                className="object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
            </div>
          </motion.div>

          {/* FLOATING INTERACTIVE BADGE */}
          <motion.div
            style={{ y: yBadge }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute -top-10 -right-4 md:-right-12 w-32 h-32 md:w-44 md:h-44 bg-[#C5A27D] rounded-full flex items-center justify-center z-30 border-[8px] border-[#F8F7F4] shadow-2xl"
          >
            <div className="text-center text-white p-4">
              <span className="block text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
                Since
              </span>
              <span className="block text-2xl md:text-4xl font-serif font-bold italic">
                1998
              </span>
              <div className="w-8 h-[1px] bg-white/30 mx-auto my-2" />
              <span className="block text-[7px] md:text-[9px] tracking-widest uppercase opacity-80 leading-tight">
                Master Craftsmanship
              </span>
            </div>
          </motion.div>

          {/* BACKGROUND GEOMETRIC SHAPE */}
          <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-neutral-200/50 rounded-full -z-10 blur-3xl" />
        </div>
      </div>

      {/* 4. ANIMATED SCROLL INDICATOR */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold rotate-90 mb-8">
          Scroll
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-neutral-900 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
