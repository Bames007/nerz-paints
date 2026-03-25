"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  Paintbrush,
} from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  // Animation variants for the floating paint bucket
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 overflow-hidden relative">
      {/* 1. DYNAMIC BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Large soft color blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8B1E3F]/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#FFB800]/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Visual Content */}
          <div className="relative flex justify-center">
            {/* The "404" Backdrop */}
            <h1 className="absolute inset-0 flex items-center justify-center text-[15rem] md:text-[20rem] font-black text-slate-50 select-none z-0">
              404
            </h1>

            {/* Interactive Floating Element */}
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative z-10"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Custom 404 Illustration: A floating paint bucket "leaking" color */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B1E3F] to-[#6a1730] rounded-[3rem] shadow-2xl flex items-center justify-center transform -rotate-12 border-8 border-white">
                  <Paintbrush className="w-24 h-24 text-white" />
                </div>

                {/* Spilled Color Effect */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "120%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="absolute top-[80%] left-1/2 -translate-x-1/2 w-4 bg-[#8B1E3F] rounded-full blur-[2px]"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Text & Navigation */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 bg-[#8B1E3F]/10 text-[#8B1E3F] rounded-full text-xs font-black uppercase tracking-widest"
              >
                Page Not Found
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none"
              >
                LOOKS LIKE WE <br />
                <span className="text-[#8B1E3F]">MISSED A SPOT.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg font-medium max-w-md mx-auto lg:mx-0"
              >
                The page you're looking for has been moved, deleted, or never
                existed. Let's get you back to the right shade.
              </motion.p>
            </div>

            {/* Navigation Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <Link href="/">
                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white p-5 rounded-2xl font-bold hover:bg-[#8B1E3F] transition-all group">
                  <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  Home
                </button>
              </Link>
              <Link href="/products">
                <button className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-900 p-5 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                  <ShoppingBag className="w-5 h-5" />
                  Shop
                </button>
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6 flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-bold text-slate-400"
            >
              <button className="flex items-center gap-2 hover:text-[#8B1E3F] transition-colors">
                <Search className="w-4 h-4" /> Search Site
              </button>
              <button className="flex items-center gap-2 hover:text-[#8B1E3F] transition-colors">
                <MessageCircle className="w-4 h-4" /> Live Support
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 hover:text-[#8B1E3F] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-900">
          Nerzpaints Studio © 2024
        </p>
      </div>
    </div>
  );
};

export default NotFound;
