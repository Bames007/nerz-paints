"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Shield, Globe, Paintbrush } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-white">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(90deg, #2A2A2A 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Bold Typography & Social Proof */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-[#8B1E3F] font-black tracking-[0.4em] text-[10px] uppercase"
              >
                <div className="w-10 h-[1px] bg-[#8B1E3F]" />
                The Inner Circle
              </motion.div>

              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#2A2A2A] leading-[0.9]">
                MASTER <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1.5px #2A2A2A" }}
                >
                  THE ART
                </span>{" "}
                <br />
                OF COLOUR<span className="text-[#FFB800]">.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-3xl font-black text-[#2A2A2A]">5.2k+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Global Subscribers
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#2A2A2A]">24/7</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Design Assistance
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The Interaction Hub */}
          <div className="lg:col-span-6 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative p-1 bg-[#2A2A2A] rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]"
            >
              <div className="bg-[#fafafa] rounded-[1.8rem] p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {status !== "success" ? (
                    <motion.div
                      key="form-content"
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-8"
                    >
                      <p className="text-gray-500 font-medium leading-relaxed">
                        Join our exclusive mailing list for quarterly lookbooks,
                        early access to the{" "}
                        <span className="text-[#8B1E3F] font-bold underline decoration-[#FFB800]">
                          Monarch Collection
                        </span>
                        , and professional color theory insights.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="group relative">
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full bg-white border-2 border-gray-100 py-5 px-6 rounded-2xl text-lg font-bold outline-none transition-all focus:border-[#2A2A2A] placeholder:text-gray-300"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                            <Paintbrush size={20} className="text-[#FFB800]" />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full bg-[#8B1E3F] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#2A2A2A] transition-all group disabled:opacity-70"
                        >
                          {status === "loading" ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              Submit Application
                              <ArrowRight
                                size={16}
                                className="group-hover:translate-x-2 transition-transform"
                              />
                            </>
                          )}
                        </button>
                      </form>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                          <Shield size={12} className="text-[#FFB800]" />{" "}
                          Encrypted Connection
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                          <Globe size={12} className="text-[#FFB800]" />{" "}
                          International Standards
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12 flex flex-col items-center text-center space-y-6"
                    >
                      <div className="w-20 h-20 bg-[#8B1E3F] rounded-full flex items-center justify-center text-[#FFB800]">
                        <Check size={40} strokeWidth={3} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-[#2A2A2A]">
                          WELCOME TO NERZ.
                        </h3>
                        <p className="text-gray-500 font-medium tracking-tight px-8">
                          Your profile has been authenticated. Check your inbox
                          for the Autumn Lookbook.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Luxury Footer Floating Accent */}
      <div className="absolute bottom-0 right-0 p-12 hidden lg:block">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-1.5 h-12 bg-[#8B1E3F]/10 rounded-full" />
          ))}
          <div className="w-1.5 h-12 bg-[#FFB800] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
