"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  Clock,
  Paintbrush,
  Zap,
  Gift,
  Tag,
  Percent,
  Droplet,
  TrendingUp,
  Eye,
  Star,
  ArrowRight,
} from "lucide-react";

// Updated Promo Data - Focused on Premium Tone
const promos = [
  {
    id: 1,
    title: "The Interior Edit",
    discount: "20% OFF",
    description: "Curated architectural palettes for living spaces.",
    gradientFrom: "#8B1E3F", // Deep Ruby
    gradientTo: "#5C132A",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
    badge: "Flash Sale",
    expiry: "2026-05-15T23:59:59",
    stock: 12,
    colours: ["#F5E6D3", "#A3C9A8", "#7B4B3A"],
    featured: true,
  },
  {
    id: 2,
    title: "Saffron Collection",
    discount: "New Release",
    description: "Limited run artisanal pigments for 2026.",
    gradientFrom: "#B45309",
    gradientTo: "#92400E",
    icon: Gift,
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000&auto=format&fit=crop",
    badge: "Limited Edition",
    expiry: "2026-06-01T23:59:59",
    stock: 25,
    colours: ["#FFB800", "#F4C2C2", "#2C3E50"],
    featured: false,
  },
  {
    id: 3,
    title: "Exterior Armor",
    discount: "Complimentary Finish",
    description: "Buy 40L, get 5L of high-gloss trim free.",
    gradientFrom: "#064E3B",
    gradientTo: "#065F46",
    icon: Tag,
    image:
      "https://images.unsplash.com/photo-1616486341353-c5833ad83021?q=80&w=1000&auto=format&fit=crop",
    badge: "Pro-Offer",
    expiry: "2026-05-20T23:59:59",
    stock: 8,
    featured: false,
    colours: ["#2F4F4F", "#4A6FA5", "#8B5A2B"],
  },
];

const PromoBanner = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Parallax for Background
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [timeLeft, setTimeLeft] = useState<any>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime: any = {};
      promos.forEach((p) => {
        const diff = new Date(p.expiry).getTime() - new Date().getTime();
        if (diff > 0) {
          newTime[p.id] = {
            d: Math.floor(diff / (1000 * 60 * 60 * 24)),
            h: Math.floor((diff / (1000 * 60 * 60)) % 24),
            m: Math.floor((diff / 1000 / 60) % 60),
            s: Math.floor((diff / 1000) % 60),
          };
        }
      });
      setTimeLeft(newTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-[#FAF9F6] overflow-hidden"
    >
      {/* 1. ARCHITECTURAL BACKGROUND ELEMENTS */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
      >
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4 text-primary font-bold tracking-[0.3em] text-[10px] uppercase">
              <span className="w-8 h-[1px] bg-primary"></span>
              Seasonal Opportunities
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-neutral-900 leading-[1.1]">
              Refine Your{" "}
              <span className="italic text-neutral-400">Environment</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-neutral-500 lg:max-w-xs text-sm leading-relaxed"
          >
            Access exclusive pigment collections and seasonal incentives for
            professional-grade architectural projects.
          </motion.p>
        </div>

        {/* PROMO GRID - ASYMMETRICAL 12-COLUMN GRID */}
        <div className="grid grid-cols-12 gap-8">
          {/* FEATURED CARD (Spans 7 Cols) */}
          {promos
            .filter((p) => p.featured)
            .map((promo) => (
              <motion.div
                key={promo.id}
                className="col-span-12 lg:col-span-7 group relative h-[600px] overflow-hidden rounded-sm"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/20 to-transparent opacity-80" />

                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-white text-neutral-900 text-[10px] font-bold px-4 py-1 tracking-widest uppercase">
                      {promo.badge}
                    </span>
                    {timeLeft[promo.id] && (
                      <div className="flex gap-4 text-white font-mono text-sm opacity-80">
                        <span>{timeLeft[promo.id].d}D</span>
                        <span>:</span>
                        <span>{timeLeft[promo.id].h}H</span>
                        <span>:</span>
                        <span>{timeLeft[promo.id].m}M</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-white text-5xl md:text-6xl font-serif mb-4 leading-none">
                    {promo.discount} <br />
                    <span className="text-2xl font-sans font-light opacity-80">
                      {promo.title}
                    </span>
                  </h3>

                  <p className="text-neutral-300 max-w-sm mb-8 text-sm leading-relaxed">
                    {promo.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <button className="bg-white text-neutral-900 px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300">
                      Acquire Selection
                    </button>
                    <div className="flex -space-x-2">
                      {promo.colours.map((c, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-neutral-900 shadow-xl"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* SECONDARY STACK (Spans 5 Cols) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
            {promos
              .filter((p) => !p.featured)
              .map((promo, idx) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="relative flex-1 bg-white border border-neutral-100 p-8 hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-3 bg-neutral-50 rounded-full group-hover:bg-primary/10 transition-colors">
                        <promo.icon className="w-5 h-5 text-neutral-400 group-hover:text-primary" />
                      </div>
                      <span className="text-[10px] font-bold tracking-tighter text-neutral-300 uppercase">
                        Stock: {promo.stock} Units Left
                      </span>
                    </div>

                    <h4 className="text-2xl font-serif text-neutral-900 mb-2">
                      {promo.title}
                    </h4>
                    <p className="text-primary font-bold text-lg mb-4">
                      {promo.discount}
                    </p>

                    <p className="text-neutral-500 text-xs leading-relaxed mb-8 flex-1">
                      {promo.description}
                    </p>

                    <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 group-hover:gap-5 transition-all">
                      View Offer <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtle Image Ghost Effect */}
                  <div className="absolute right-0 bottom-0 w-1/3 h-1/2 opacity-[0.03] grayscale pointer-events-none group-hover:opacity-10 transition-opacity">
                    <Image
                      src={promo.image}
                      alt="bg"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* BOTTOM MARQUEE - REFINED BRUTALIST STYLE */}
        <div className="mt-20 border-y border-neutral-200 py-6 overflow-hidden relative">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex whitespace-nowrap gap-20"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 italic">
                  2026 Pigment Forecast
                </span>
                <Droplet className="w-3 h-3 text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-900">
                  Nerzpaints Professional
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
