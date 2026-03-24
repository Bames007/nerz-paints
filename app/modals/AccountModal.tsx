"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, Chrome, Github } from "lucide-react";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal = ({ isOpen, onClose }: AccountModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md"
          />
          {/* Modal Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-lg bg-white shadow-2xl flex flex-col"
          >
            {/* Design Header */}
            <div className="h-40 bg-[#8B1E3F] relative overflow-hidden flex-shrink-0 flex items-end p-8">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-4xl font-black text-white tracking-tight leading-none">
                {isLogin ? "Welcome\nBack" : "Create\nAccount"}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
              {/* Custom Segmented Control */}
              <div className="flex p-1 bg-slate-100 rounded-2xl mb-10">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${isLogin ? "bg-white text-[#8B1E3F] shadow-sm" : "text-slate-500"}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${!isLogin ? "bg-white text-[#8B1E3F] shadow-sm" : "text-slate-500"}`}
                >
                  Register
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#8B1E3F] transition-colors" />
                      <input
                        type="text"
                        placeholder="Akinwale Olu"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-[#8B1E3F]/20 focus:bg-white rounded-2xl transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#8B1E3F] transition-colors" />
                    <input
                      type="email"
                      placeholder="hello@nerzpaints.com"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-[#8B1E3F]/20 focus:bg-white rounded-2xl transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      Password
                    </label>
                    {isLogin && (
                      <button className="text-[10px] font-bold text-[#8B1E3F] hover:underline">
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#8B1E3F] transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-[#8B1E3F]/20 focus:bg-white rounded-2xl transition-all outline-none"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#8B1E3F] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#8B1E3F]/20 flex items-center justify-center gap-3 group transition-all"
                >
                  {isLogin ? "Sign In" : "Get Started"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              <div className="mt-10">
                <div className="relative flex items-center gap-4 mb-8">
                  <div className="h-px bg-slate-100 flex-1" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    Social Connect
                  </span>
                  <div className="h-px bg-slate-100 flex-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600 text-sm">
                    <Chrome className="w-4 h-4 text-red-500" /> Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600 text-sm">
                    <Github className="w-4 h-4 text-slate-900" /> GitHub
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountModal;
