"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Check,
  ArrowUpRight,
  ShoppingBag,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Monarch Velvet",
    category: "Interior Matte",
    price: "₦18.9k",
    description: "Museum-grade matte finish with light-diffusing technology.",
    details: ["Coverage: 12m²/L", "Scrub-resistant", "Eco-Certified"],
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-2 col-span-1 row-span-1",
    badge: "Flagship",
  },
  {
    id: 2,
    name: "Celestial Gold",
    category: "Metallic",
    price: "₦29.5k",
    description: "Infused with real mica particles to reflect ambient light.",
    details: ["Reflective", "UV Guard", "Accent Grade"],
    image:
      "https://images.unsplash.com/photo-1556912177-c54030639a60?q=80&w=1200&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
    badge: "Limited",
  },
  {
    id: 3,
    name: "Obsidian Silk",
    category: "Satin Finish",
    price: "₦16k",
    description: "Deep, non-reflective pure black for modern statements.",
    details: ["High-Opacity", "Scentless", "Washable"],
    image:
      "https://images.unsplash.com/photo-1616486341353-c5833ad83021?q=80&w=800&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "New",
  },
  {
    id: 4,
    name: "Arctic White",
    category: "Trim & Detail",
    price: "₦14k",
    description: "The brightest white in the industry for crown moldings.",
    details: ["Non-Yellowing", "Glossy", "Quick Dry"],
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "Essential",
  },
  {
    id: 5,
    name: "Eco-Shield",
    category: "Exterior Pro",
    price: "₦24.5k",
    description: "Tropical climate protection designed for 10+ years.",
    details: ["Weather-proof", "Anti-Fungal", "Elastic"],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
    badge: "10Y Warranty",
  },
  {
    id: 6,
    name: "Tuscan Ochre",
    category: "Earth Tones",
    price: "₦17.2k",
    description: "Rich pigment-heavy clay tones for a warm feel.",
    details: ["Natural Pigments", "Breathable", "Matte"],
    image:
      "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=800&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "Designer",
  },
  {
    id: 7,
    name: "Azure Breeze",
    category: "Relaxation",
    price: "₦19.5k",
    description: "Calming blue hues optimized for spa environments.",
    details: ["Stress-Reducing", "Low VOC", "Odorless"],
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da977535?q=80&w=800&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "Pure Air",
  },
  {
    id: 8,
    name: "Concrete Loft",
    category: "Industrial",
    price: "₦22k",
    description: "Textured finish mimicking raw concrete surfaces.",
    details: ["Textured", "Durable", "Modern"],
    image:
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1000&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
    badge: "Architect",
  },
  {
    id: 9,
    name: "Royal Amethyst",
    category: "Luxury Velvet",
    price: "₦32k",
    description: "Deep regal purple with a velvet texture.",
    details: ["Premium", "Ultra-Matte", "Exclusive"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-2 col-span-1 row-span-1",
    badge: "Elite",
  },
  {
    id: 10,
    name: "Sage Whisper",
    category: "Nature",
    price: "₦18.5k",
    description: "Soft muted green for tranquility.",
    details: ["Biophilic", "Low Sheen", "Harmonious"],
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "Calm",
  },
  {
    id: 11,
    name: "Copper Embers",
    category: "Specialty",
    price: "₦27.8k",
    description: "Warm copper tones with pearlescent shimmer.",
    details: ["Pearlescent", "Interior", "Unique"],
    image:
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=1000&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "Lustre",
  },
  {
    id: 12,
    name: "Ivory Coast",
    category: "Timeless",
    price: "₦15.4k",
    description: "Perfect off-white balanced between tones.",
    details: ["Universal Fit", "High Coverage", "Smooth"],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
    badge: "Popular",
  },
  {
    id: 13,
    name: "Venetian Plaster",
    category: "Textured",
    price: "₦45k",
    description: "Traditional lime-based plaster for marble effect.",
    details: ["Artisanal", "Hand-applied", "Marble"],
    image:
      "https://images.unsplash.com/photo-1615876234582-29a30f47bbad?q=80&w=1000&auto=format&fit=crop",
    gridClass: "col-span-1 md:row-span-2",
    badge: "Artisan",
  },
  {
    id: 14,
    name: "Nordic Slate",
    category: "Satin Finish",
    price: "₦19.8k",
    description: "Cool grey with blue undertones.",
    details: ["Minimalist", "Durable", "Cool"],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=1000&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "Modern",
  },
  {
    id: 15,
    name: "Terracotta Soul",
    category: "Earth Tones",
    price: "₦21k",
    description: "Authentic baked-clay hue for rustic ambiance.",
    details: ["Organic", "Rich Depth", "Matt"],
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
    badge: "Organic",
  },
  {
    id: 16,
    name: "Midnight Indigo",
    category: "Feature Wall",
    price: "₦26.5k",
    description: "Sultry blue for dramatic depth.",
    details: ["Ultra-Pigmented", "Elegant", "Stain-Resistant"],
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "Dramatic",
  },
  {
    id: 17,
    name: "Sahara Sand",
    category: "Neutral",
    price: "₦14.8k",
    description: "Warm neutral capturing desert light.",
    details: ["Luminous", "Smooth Flow", "Easy Clean"],
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
    badge: "Light",
  },
  {
    id: 18,
    name: "Emerald Estate",
    category: "High Sheen",
    price: "₦30k",
    description: "Lush jewel-toned green for luxury.",
    details: ["Jewel Tone", "High Sheen", "Impactful"],
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-2 col-span-1 row-span-1",
    badge: "Luxe",
  },
  {
    id: 19,
    name: "Quartz Crystal",
    category: "Metallic",
    price: "₦28.2k",
    description: "Light-reflecting shimmer inspired by natural quartz.",
    details: ["Iridescent", "Feature Grade", "Reflective"],
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
    badge: "Shimmer",
  },
  {
    id: 20,
    name: "Urban Graphite",
    category: "Industrial",
    price: "₦23.5k",
    description: "Sleek gunmetal grey for urban lofts.",
    details: ["Matte-Metallic", "Modern Edge", "Professional"],
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
    badge: "Urban",
  },
];

const Toast = ({
  message,
  isVisible,
  onHide,
}: {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ y: 70, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        exit={{ y: 20, opacity: 0, x: "-50%" }}
        className="fixed bottom-6 left-1/2 z-[200] bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-xl w-[90%] md:w-auto"
      >
        <div className="w-8 h-8 rounded-full bg-[#8B1E3F] flex items-center justify-center shrink-0">
          <Check size={14} className="text-[#FFB800]" />
        </div>
        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-none">
          {message}
        </p>
        <X
          size={16}
          className="ml-auto cursor-pointer opacity-50 hover:opacity-100"
          onClick={onHide}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerToast = (msg: string) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <section className="bg-white py-12 md:py-32 px-3 md:px-10 lg:px-20">
      <Toast
        isVisible={toast.show}
        message={toast.message}
        onHide={() => setToast({ ...toast, show: false })}
      />

      {/* Header Section */}
      <div className="px-3 mb-12 md:mb-20">
        <div className="flex items-center gap-3 text-[#8B1E3F] font-black tracking-[0.4em] text-[9px] md:text-[10px] uppercase mb-4">
          <div className="w-8 h-[1px] bg-[#8B1E3F]" />
          Elite Collection
        </div>
        <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-[#1A1A1A] leading-[0.85]">
          NERZ{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1.2px #1A1A1A" }}
          >
            PAINTS
          </span>
          <span className="text-[#FFB800]">.</span>
        </h2>
      </div>

      {/* GRID LOGIC: 
          - Mobile (default): grid-cols-2 | auto-rows 220px (2x2 focus)
          - iPad (sm): grid-cols-3 | auto-rows 280px (3x3 focus)
          - Desktop (md): grid-cols-4 | auto-rows 400px (Bento focus)
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[220px] sm:auto-rows-[280px] md:auto-rows-[400px]">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative overflow-hidden rounded-[1.8rem] md:rounded-[2.5rem] bg-gray-100 cursor-pointer ${product.gridClass}`}
            onClick={() => setSelectedProduct(product)}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80" />

            {/* Product Card Info */}
            <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="bg-[#8B1E3F] text-[#FFB800] text-[6px] md:text-[8px] font-black uppercase tracking-wider px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-xl">
                  {product.badge}
                </span>
                <div className="hidden md:flex w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="space-y-0.5 md:space-y-1">
                <p className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase tracking-widest truncate">
                  {product.category}
                </p>
                <h3 className="text-white text-sm md:text-3xl font-black tracking-tight leading-none truncate md:whitespace-normal">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-1 md:pt-2">
                  <p className="text-[#FFB800] text-xs md:text-xl font-bold">
                    {product.price}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerToast(`${product.name} Added`);
                    }}
                    className="p-1.5 md:p-3 bg-white rounded-lg text-[#1A1A1A] hover:bg-[#FFB800] transition-colors"
                  >
                    <ShoppingBag
                      size={14}
                      className="md:w-[18px] md:h-[18px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-[#1A1A1A]/95 backdrop-blur-xl"
            />
            <motion.div
              layoutId={`prod-${selectedProduct.id}`}
              className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="relative h-[280px] md:h-full min-h-[350px]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-6 left-6 bg-black/40 backdrop-blur-md p-3 rounded-2xl text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-8 md:p-14 space-y-8">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <ShieldCheck size={16} className="text-[#8B1E3F]" />
                      <p className="text-[#8B1E3F] font-black text-[10px] uppercase tracking-[0.3em]">
                        {selectedProduct.category}
                      </p>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-none">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                      {selectedProduct.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.details.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-700 bg-gray-50 p-3 rounded-xl"
                      >
                        <Zap size={12} className="text-[#FFB800]" /> {d}
                      </div>
                    ))}
                  </div>
                  <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                      <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                        Premium Price
                      </p>
                      <p className="text-4xl font-black text-[#1A1A1A]">
                        {selectedProduct.price}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        triggerToast(`${selectedProduct.name} Secured`);
                        setSelectedProduct(null);
                      }}
                      className="w-full sm:w-auto bg-[#1A1A1A] text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#8B1E3F] transition-all shadow-xl active:scale-95"
                    >
                      Secure Item
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProducts;
