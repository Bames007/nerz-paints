"use client";

import Link from "next/link";
import { Mail, ArrowUp, ChevronRight, ExternalLink } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const [droplets, setDroplets] = useState<
    { id: number; left: string; top: string; duration: number }[]
  >([]);

  useEffect(() => {
    // Fixes Hydration Mismatch: Values are generated only on the client
    setMounted(true);
    const generated = [...Array(6)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
    }));
    setDroplets(generated);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-white text-[#2A2A2A] pt-24 pb-8 overflow-hidden border-t border-gray-100">
      {/* Brand Accent: Subtle Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFB800] via-[#8B1E3F] to-[#FFB800] opacity-30" />

      {/* Floating Elements (Hydration Safe) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {droplets.map((d) => (
            <motion.div
              key={d.id}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#FFB800]/20"
              style={{ left: d.left, top: d.top }}
              animate={{ y: [0, -40, 0], opacity: [0, 0.4, 0] }}
              transition={{
                duration: d.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative w-24 h-12">
              {/* Replace with your actual logo path */}
              <Image
                src="/logo.jpeg"
                alt="Nerzpaints Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-sm font-medium">
              The Best Paints & Products in Nigeria. Bringing world-class
              architectural brilliance to every Nigerian home.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaFacebook, FaTwitter, FaYoutube].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3, color: "#FFB800" }}
                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#FFB800] transition-all shadow-sm"
                  >
                    <Icon size={18} />
                  </motion.a>
                ),
              )}
            </div>
          </div>

          {/* Strategic Navigation */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B1E3F]">
              Explore
            </h4>
            <ul className="space-y-4">
              {["Collections", "Sustainability", "Find a Store", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="group flex items-center text-sm font-bold text-[#2A2A2A] hover:text-[#FFB800] transition-colors"
                    >
                      <ChevronRight
                        className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all text-[#FFB800]"
                        size={14}
                      />
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Newsletter Access */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B1E3F]">
              Insider Club
            </h4>
            <p className="text-sm text-gray-400 font-medium">
              Subscribe for exclusive color trends and offers.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-2 text-[10px] font-bold tracking-widest outline-none focus:border-[#FFB800] focus:bg-white transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FFB800] group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Developer & Legal Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] text-gray-400 tracking-[0.15em] font-bold uppercase">
              © 2026 NERZ PAINTS · NIGERIA PLC
            </p>
            <a
              href="https://ebcomtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center md:justify-start gap-1.5 text-[10px] text-gray-300 hover:text-[#8B1E3F] transition-all tracking-[0.1em] font-black"
            >
              DESIGNED BY EBCOM TECHNOLOGIES
              <ExternalLink
                size={10}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>

          {/* Premium Scroll Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5, backgroundColor: "#FFB800", color: "#FFF" }}
            className="w-12 h-12 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center justify-center text-gray-400 transition-all"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
