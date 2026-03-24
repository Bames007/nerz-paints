"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  ShoppingCart,
  Search,
  MapPin,
  Heart,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import CartModal from "../modals/CartModal";
import SearchModal from "../modals/SearchModal";
import WishlistModal from "../modals/WishlistModal"; // Ensure this is imported
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState("");

  // Modal states
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);

  const { cartCount, wishlist } = useCart();
  const wishlistCount = wishlist.length;

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Colours", href: "#colours" },
    { name: "Products", href: "#products" },
    { name: "Projects", href: "#projects" },
    { name: "Stores", href: "#stores" },
  ];

  // Smooth scroll logic
  const scrollToSection = (hash: string) => {
    const id = hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      window.history.pushState(null, "", href);
      scrollToSection(href);
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Active section detection...
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "py-6 bg-white border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* 1. Left: Search & Wishlist (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 flex-1">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#8B1E3F] transition-all"
            >
              <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Search</span>
            </button>
            <button
              onClick={() => setWishlistModalOpen(true)}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#8B1E3F] transition-all relative"
            >
              <Heart
                className={`w-4 h-4 ${wishlistCount > 0 ? "fill-[#8B1E3F] text-[#8B1E3F]" : ""}`}
              />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-[#8B1E3F] rounded-full animate-pulse" />
              )}
            </button>
          </div>

          {/* 2. Center: Logo */}
          <Link
            href="#home"
            onClick={(e) => handleHashClick(e, "#home")}
            className="flex-shrink-0 mx-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-12 h-12 md:w-14 md:h-14"
            >
              <Image
                alt="Nerzpaints"
                src="/logo.jpeg"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* 3. Right: Navigation & Cart */}
          <div className="flex items-center justify-end gap-8 flex-1">
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href)}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative text-[11px] font-black uppercase tracking-[0.2em] text-slate-900"
                >
                  {item.name}
                  <AnimatePresence>
                    {(hoveredNav === item.name || activeHash === item.href) && (
                      <motion.div
                        layoutId="navUnderline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8B1E3F]"
                      />
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={() => setCartModalOpen(true)}
                className="relative p-2 text-slate-900 hover:scale-110 transition-transform"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#8B1E3F] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-900"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[150] bg-slate-900/40 backdrop-blur-md lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[151] w-full max-w-xs bg-white flex flex-col lg:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.1)]"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Navigation
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-slate-50 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleHashClick(e, item.href)}
                      className="text-4xl font-bold text-slate-900 hover:text-[#8B1E3F] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <hr className="border-slate-100" />

                <div className="space-y-4 pt-4">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setWishlistModalOpen(true);
                    }}
                    className="flex items-center gap-3 text-lg font-medium text-slate-600"
                  >
                    <Heart className="w-5 h-5" /> Wishlist ({wishlistCount})
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setSearchModalOpen(true);
                    }}
                    className="flex items-center gap-3 text-lg font-medium text-slate-600"
                  >
                    <Search className="w-5 h-5" /> Search Products
                  </button>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#8B1E3F] rounded-2xl flex items-center justify-center text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Support
                    </p>
                    <p className="font-bold text-slate-900">+234 123 456 789</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
      />
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
      <WishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
      />

      {/* Spacer to prevent content jump */}
      <div className={isScrolled ? "h-20" : "h-24"} />
    </>
  );
};

export default Header;
