"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Search,
  ChevronRight,
  Info,
  Globe,
  Send,
  List,
  Map as MapIcon,
} from "lucide-react";
import Image from "next/image";

const stores = [
  {
    id: 1,
    name: "Nerzpaints Lagos",
    city: "Lagos",
    address: "12, Admiralty Way, Lekki Phase 1",
    phone: "+234 123 456 7890",
    hours: "08:00 - 18:00",
    coordinates: { top: "65%", left: "25%" },
    image:
      "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=800&auto=format&fit=crop",
    features: ["Color Mixing", "In-store Pickup"],
  },
  {
    id: 2,
    name: "Nerzpaints Abuja",
    city: "Abuja",
    address: "Plot 123, Ahmadu Bello Way, Wuse 2",
    phone: "+234 123 456 7891",
    hours: "09:00 - 17:00",
    coordinates: { top: "40%", left: "55%" },
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&auto=format&fit=crop",
    features: ["Industrial Coatings", "Delivery"],
  },
  {
    id: 3,
    name: "Nerzpaints Port Harcourt",
    city: "Port Harcourt",
    address: "15, Aba Road, PH City",
    phone: "+234 123 456 7892",
    hours: "08:00 - 18:00",
    coordinates: { top: "78%", left: "48%" },
    image:
      "https://images.unsplash.com/photo-1534433331355-534c11e84871?w=800&auto=format&fit=crop",
    features: ["Retail", "Consultation"],
  },
];

const StoreLocator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStoreId, setActiveStoreId] = useState<number>(1);
  const [mobileView, setMobileView] = useState<"map" | "list">("list");

  const filteredStores = useMemo(() => {
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.city.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const activeStore = stores.find((s) => s.id === activeStoreId) || stores[0];

  return (
    <section
      id="stores"
      className="relative py-12 md:py-24 bg-[#FCFCFC] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full md:w-1/3 h-1/3 bg-[#8B1E3F]/5 blur-[80px] md:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <header className="max-w-3xl mb-10 md:mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center md:justify-start gap-3 text-[#8B1E3F] font-bold tracking-widest uppercase text-[10px] md:text-sm mb-4"
          >
            <div className="hidden md:block w-12 h-[2px] bg-[#8B1E3F]" />
            Flagship Showrooms
          </motion.div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            Find the nearest <br className="hidden md:block" />
            <span className="text-[#8B1E3F] italic">Nerzpaints Hub.</span>
          </h2>
        </header>

        {/* Mobile View Toggle */}
        <div className="flex md:hidden bg-slate-100 p-1 rounded-2xl mb-6">
          <button
            onClick={() => setMobileView("list")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${mobileView === "list" ? "bg-white shadow-md text-[#8B1E3F]" : "text-slate-500"}`}
          >
            <List className="w-4 h-4" /> List View
          </button>
          <button
            onClick={() => setMobileView("map")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${mobileView === "map" ? "bg-white shadow-md text-[#8B1E3F]" : "text-slate-500"}`}
          >
            <MapIcon className="w-4 h-4" /> Interactive Map
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-10">
          {/* LEFT: Map Panel - Hidden on Mobile List View */}
          <div
            className={`lg:col-span-7 h-[500px] md:h-[650px] sticky top-24 ${mobileView === "list" ? "hidden md:block" : "block"}`}
          >
            <motion.div
              className="relative h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&auto=format&fit=crop"
                alt="Map Background"
                fill
                className="object-cover brightness-95 contrast-125"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Decorative Pins */}
              {stores.map((store) => (
                <motion.button
                  key={store.id}
                  onClick={() => {
                    setActiveStoreId(store.id);
                    if (window.innerWidth < 768) setMobileView("map");
                  }}
                  className="absolute z-20"
                  style={{
                    top: store.coordinates.top,
                    left: store.coordinates.left,
                  }}
                  animate={{ scale: activeStoreId === store.id ? 1.2 : 1 }}
                >
                  <div
                    className={`p-2 md:p-3 rounded-full shadow-2xl ${activeStoreId === store.id ? "bg-[#8B1E3F] text-white" : "bg-white text-[#8B1E3F]"}`}
                  >
                    <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                </motion.button>
              ))}

              {/* Floating Info Overlay (Bottom of Map) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStore.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center gap-4"
                >
                  <div className="hidden md:block relative w-20 h-20 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={activeStore.image}
                      alt={activeStore.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                      {activeStore.name}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-medium mb-2">
                      {activeStore.address}
                    </p>
                  </div>
                  <button className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#8B1E3F] flex items-center justify-center gap-2">
                    Navigate <Send className="w-4 h-4" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* RIGHT: Store Selection List - Hidden on Mobile Map View */}
          <div
            className={`lg:col-span-5 flex flex-col h-auto md:h-[650px] ${mobileView === "map" ? "hidden md:flex" : "flex"}`}
          >
            <div className="relative mb-6">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search city..."
                className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-14 pr-4 focus:border-[#8B1E3F] transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
              {filteredStores.map((store) => (
                <motion.div
                  key={store.id}
                  onClick={() => setActiveStoreId(store.id)}
                  className={`cursor-pointer p-4 md:p-6 rounded-[1.5rem] border-2 transition-all ${activeStoreId === store.id ? "bg-white border-[#8B1E3F] shadow-lg" : "bg-white/50 border-transparent hover:border-slate-200"}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-black text-[#8B1E3F] uppercase tracking-widest">
                        {store.city}
                      </span>
                      <h4 className="font-bold text-slate-900">{store.name}</h4>
                    </div>
                    <div className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-1 rounded-md flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{" "}
                      OPEN
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#8B1E3F]" />{" "}
                      {store.phone}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8B1E3F]" />{" "}
                      {store.hours}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-slate-100 text-slate-900 py-2.5 rounded-lg font-bold text-xs">
                      Call Store
                    </button>
                    <button
                      className="flex-1 bg-slate-100 text-slate-900 py-2.5 rounded-lg font-bold text-xs md:hidden"
                      onClick={() => setMobileView("map")}
                    >
                      Show on Map
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Consultation Footer - Optimized for iPad/Mobile */}
            <div className="mt-6 p-6 bg-[#8B1E3F] rounded-[2rem] text-white relative overflow-hidden hidden sm:block">
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs opacity-80 mb-1">Missing a location?</p>
                  <p className="text-lg font-black">Request a Consultation</p>
                </div>
                <button className="bg-white text-[#8B1E3F] px-5 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocator;
