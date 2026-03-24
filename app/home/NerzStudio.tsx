// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValue,
// } from "framer-motion";
// import {
//   Sparkles,
//   Maximize2,
//   Download,
//   Share2,
//   Heart,
//   ChevronRight,
//   Droplets,
//   Lightbulb,
//   MousePointer2,
//   Brush,
//   Sun,
//   Moon,
//   Paintbrush,
//   Zap,
// } from "lucide-react";
// import Image from "next/image";

// const palettes = [
//   {
//     id: "royal-heritage",
//     name: "Royal Heritage",
//     description:
//       "Deep, soulful tones inspired by Nigerian royalty and traditional textiles.",
//     themeColor: "#8B1E3F",
//     colors: [
//       { hex: "#8B1E3F", name: "Bini Crimson", feel: "Powerful" },
//       { hex: "#FFB800", name: "Savannah Gold", feel: "Radiant" },
//       { hex: "#2D5A27", name: "Forest Canopy", feel: "Grounding" },
//       { hex: "#FAF9F6", name: "Cotton Cloud", feel: "Pure" },
//     ],
//     image:
//       "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: "lagos-modern",
//     name: "Lagos Modern",
//     description:
//       "Cool, airy neutrals that maximize light in urban architectural spaces.",
//     themeColor: "#4682B4",
//     colors: [
//       { hex: "#E5E4E2", name: "Eko Silver", feel: "Sleek" },
//       { hex: "#B0C4DE", name: "Atlantic Mist", feel: "Calm" },
//       { hex: "#4682B4", name: "Marina Blue", feel: "Deep" },
//       { hex: "#F0F8FF", name: "Skyline White", feel: "Vast" },
//     ],
//     image:
//       "https://images.pexels.com/photos/1600217/pexels-photo-1600217.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: "terracotta",
//     name: "Terracotta Earth",
//     description:
//       "Warm, earthy tones inspired by African clay and sun-dried landscapes.",
//     themeColor: "#CD5C5C",
//     colors: [
//       { hex: "#CD5C5C", name: "Clay Terracotta", feel: "Warm" },
//       { hex: "#F4A261", name: "Sunset Ochre", feel: "Energetic" },
//       { hex: "#E9C46A", name: "Golden Sand", feel: "Radiant" },
//       { hex: "#2A9D8F", name: "Jade Oasis", feel: "Calm" },
//     ],
//     image:
//       "https://images.pexels.com/photos/2038720/pexels-photo-2038720.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
// ];

// // Particle component for color splash effect
// const Particle = ({ color, x, y, onComplete }: any) => {
//   const variants = {
//     initial: { scale: 0, opacity: 1, x: 0, y: 0 },
//     animate: {
//       scale: 4,
//       opacity: 0,
//       x: (Math.random() - 0.5) * 100,
//       y: (Math.random() - 0.5) * 100,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//     exit: { opacity: 0 },
//   };
//   return (
//     <motion.div
//       variants={variants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       onAnimationComplete={onComplete}
//       className="absolute pointer-events-none rounded-full"
//       style={{
//         left: x,
//         top: y,
//         width: 20,
//         height: 20,
//         backgroundColor: color,
//         boxShadow: `0 0 20px ${color}`,
//       }}
//     />
//   );
// };

// const ColorStudio = () => {
//   const [activePalette, setActivePalette] = useState(palettes[0]);
//   const [splashColor, setSplashColor] = useState(palettes[0].themeColor);
//   const [lightingMode, setLightingMode] = useState<"daylight" | "evening">(
//     "daylight",
//   );
//   const [particles, setParticles] = useState<
//     Array<{ id: number; color: string; x: number; y: number }>
//   >([]);
//   const containerRef = useRef(null);
//   const visualizerRef = useRef<HTMLDivElement>(null);

//   // Spring physics for smooth cursor/scroll following
//   const { scrollYProgress } = useScroll({ target: containerRef });
//   const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
//   const rotate = useTransform(smoothY, [0, 1], [0, 20]);
//   const scale = useTransform(smoothY, [0, 0.5], [1, 1.1]);

//   // Mouse parallax effect for "Floating Droplets"
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   useEffect(() => {
//     const handleMouse = (e: MouseEvent) => {
//       setMousePos({
//         x: e.clientX / window.innerWidth - 0.5,
//         y: e.clientY / window.innerHeight - 0.5,
//       });
//     };
//     window.addEventListener("mousemove", handleMouse);
//     return () => window.removeEventListener("mousemove", handleMouse);
//   }, []);

//   // Tilt effect for swatch cards
//   const tilt = (element: HTMLElement) => {
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);
//     const rotateX = useTransform(y, [-100, 100], [10, -10]);
//     const rotateY = useTransform(x, [-100, 100], [-10, 10]);
//     return { rotateX, rotateY, x, y };
//   };

//   // Handle color click with particle splash
//   const handleColorClick = (color: string, e: React.MouseEvent) => {
//     setSplashColor(color);
//     // Get click coordinates relative to the clicked element
//     const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const particleId = Date.now() + Math.random();
//     setParticles((prev) => [...prev, { id: particleId, color, x, y }]);
//     setTimeout(() => {
//       setParticles((prev) => prev.filter((p) => p.id !== particleId));
//     }, 600);
//   };

//   // Lighting filter effect on image
//   const imageFilter =
//     lightingMode === "daylight"
//       ? "brightness(1.05) contrast(1.02)"
//       : "brightness(0.85) contrast(1.1) saturate(0.9)";

//   return (
//     <div
//       className="bg-white text-slate-900 min-h-screen font-sans overflow-x-hidden selection:bg-[#8B1E3F] selection:text-white"
//       ref={containerRef}
//     >
//       {/* Splash background */}
//       <motion.div
//         animate={{ backgroundColor: splashColor + "10" }}
//         className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000"
//       />

//       {/* Particle container */}
//       <div className="fixed inset-0 pointer-events-none z-50">
//         <AnimatePresence>
//           {particles.map((particle) => (
//             <Particle
//               key={particle.id}
//               color={particle.color}
//               x={particle.x}
//               y={particle.y}
//               onComplete={() =>
//                 setParticles((prev) => prev.filter((p) => p.id !== particle.id))
//               }
//             />
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
//         <motion.div
//           animate={{ x: mousePos.x * 50, y: mousePos.y * 50 }}
//           className="absolute top-1/4 left-10 w-32 h-32 bg-[#FFB800] rounded-full blur-[80px] opacity-30"
//         />
//         <motion.div
//           animate={{ x: mousePos.x * -80, y: mousePos.y * -80 }}
//           className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#8B1E3F] rounded-full blur-[120px] opacity-20"
//         />

//         <div className="relative z-10 text-center">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="inline-flex items-center gap-2 bg-white shadow-xl px-6 py-3 rounded-full mb-8 border border-slate-100"
//           >
//             <Sparkles className="w-5 h-5 text-[#8B1E3F] animate-pulse" />
//             <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
//               The Color Experience
//             </span>
//           </motion.div>

//           <motion.h1
//             style={{ rotate, scale }}
//             className="text-6xl md:text-[10rem] font-[1000] tracking-tighter mb-6 leading-none"
//           >
//             VIBRANT <br />
//             <span className="italic text-[#8B1E3F] drop-shadow-2xl">
//               LIVING.
//             </span>
//           </motion.h1>

//           <motion.p className="text-slate-500 text-lg md:text-2xl max-w-2xl mx-auto font-medium mb-10">
//             Click a swatch below to{" "}
//             <span className="text-[#8B1E3F] font-bold">"Splash"</span> your
//             space with Nerzpaints premium pigments.
//           </motion.p>

//           <motion.div className="flex justify-center gap-4 animate-bounce">
//             <MousePointer2 className="w-6 h-6 text-slate-300" />
//           </motion.div>
//         </div>
//       </section>

//       {/* Main Bento Grid */}
//       <section className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Visualizer */}
//           <div className="lg:col-span-8 space-y-8">
//             <motion.div
//               layoutId="main-image"
//               className="relative aspect-[16/10] md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] group"
//               ref={visualizerRef}
//             >
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activePalette.id}
//                   initial={{ opacity: 0, filter: "blur(20px)" }}
//                   animate={{ opacity: 1, filter: "blur(0px)" }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.8 }}
//                   className="absolute inset-0"
//                   style={{ filter: imageFilter }}
//                 >
//                   <Image
//                     src={activePalette.image}
//                     alt="Visualizer"
//                     fill
//                     className="object-cover transition-transform duration-[2s] group-hover:scale-105"
//                   />
//                 </motion.div>
//               </AnimatePresence>

//               {/* Glass Overlay */}
//               <div className="absolute bottom-8 left-8 right-8 backdrop-blur-xl bg-white/70 p-8 rounded-[2rem] border border-white/50 shadow-2xl">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//                   <div>
//                     <h2 className="text-3xl font-black text-slate-900">
//                       {activePalette.name}
//                     </h2>
//                     <p className="text-slate-600 font-medium max-w-sm">
//                       {activePalette.description}
//                     </p>
//                   </div>
//                   <button className="bg-[#8B1E3F] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-[#8B1E3F]/30">
//                     <Brush className="w-5 h-5" /> Buy this Palette
//                   </button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Palette Switcher */}
//             <div className="flex gap-4 overflow-x-auto py-4 no-scrollbar">
//               {palettes.map((p) => (
//                 <button
//                   key={p.id}
//                   onClick={() => {
//                     setActivePalette(p);
//                     setSplashColor(p.themeColor);
//                   }}
//                   className={`flex-shrink-0 px-8 py-5 rounded-3xl font-black text-sm transition-all flex items-center gap-3 ${
//                     activePalette.id === p.id
//                       ? "bg-white text-[#8B1E3F] shadow-2xl scale-105 border-2 border-[#8B1E3F]"
//                       : "bg-slate-50 text-slate-400 hover:bg-slate-100"
//                   }`}
//                 >
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: p.themeColor }}
//                   />
//                   {p.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Swatch Intelligence Sidebar */}
//           <div className="lg:col-span-4 space-y-6">
//             <h3 className="text-xl font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-2">
//               <Droplets className="w-5 h-5 text-[#8B1E3F]" /> Swatch
//               Intelligence
//             </h3>

//             <div className="grid grid-cols-1 gap-4">
//               <AnimatePresence mode="wait">
//                 {activePalette.colors.map((color, i) => {
//                   const mouseX = useMotionValue(0);
//                   const mouseY = useMotionValue(0);
//                   const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
//                   const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);
//                   const handleMouseMove = (e: React.MouseEvent) => {
//                     const rect = (
//                       e.currentTarget as HTMLElement
//                     ).getBoundingClientRect();
//                     const x = e.clientX - rect.left - rect.width / 2;
//                     const y = e.clientY - rect.top - rect.height / 2;
//                     mouseX.set(x);
//                     mouseY.set(y);
//                   };
//                   const handleMouseLeave = () => {
//                     mouseX.set(0);
//                     mouseY.set(0);
//                   };
//                   return (
//                     <motion.div
//                       key={`${activePalette.id}-${color.hex}`}
//                       initial={{ x: 50, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       exit={{ x: -50, opacity: 0 }}
//                       transition={{
//                         delay: i * 0.05,
//                         type: "spring",
//                         stiffness: 300,
//                       }}
//                       style={{
//                         rotateX,
//                         rotateY,
//                         transformStyle: "preserve-3d",
//                       }}
//                       onMouseMove={handleMouseMove}
//                       onMouseLeave={handleMouseLeave}
//                       whileHover={{ scale: 1.02, z: 20 }}
//                       onClick={(e) => handleColorClick(color.hex, e)}
//                       className="group cursor-pointer bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex items-center gap-6"
//                     >
//                       <div
//                         className="w-20 h-20 rounded-2xl shadow-inner flex items-center justify-center transition-all duration-300 group-hover:scale-110"
//                         style={{ backgroundColor: color.hex }}
//                       >
//                         <Maximize2
//                           className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${parseInt(color.hex.replace("#", ""), 16) > 0xffffff / 1.5 ? "text-black" : "text-white"}`}
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-xs font-black text-[#8B1E3F] uppercase tracking-tighter mb-1">
//                           {color.feel}
//                         </p>
//                         <h4 className="text-xl font-bold text-slate-900">
//                           {color.name}
//                         </h4>
//                         <p className="text-sm font-mono text-slate-400">
//                           {color.hex}
//                         </p>
//                       </div>
//                       <button className="p-3 rounded-xl bg-slate-50 text-slate-300 group-hover:bg-[#8B1E3F] group-hover:text-white transition-colors">
//                         <Heart className="w-5 h-5" fill="currentColor" />
//                       </button>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </div>

//             {/* Lighting Simulator */}
//             <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
//               <div className="relative z-10">
//                 <Lightbulb className="w-10 h-10 text-[#FFB800] mb-4" />
//                 <h4 className="text-xl font-bold mb-2">Lighting Simulator</h4>
//                 <p className="text-slate-400 text-sm mb-6">
//                   See how these colors react to Nigerian sunlight vs. indoor LED
//                   lighting.
//                 </p>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setLightingMode("daylight")}
//                     className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
//                       lightingMode === "daylight"
//                         ? "bg-[#FFB800] text-slate-900"
//                         : "bg-white/10 hover:bg-white/20"
//                     }`}
//                   >
//                     <Sun className="w-4 h-4" /> Daylight
//                   </button>
//                   <button
//                     onClick={() => setLightingMode("evening")}
//                     className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
//                       lightingMode === "evening"
//                         ? "bg-[#FFB800] text-slate-900"
//                         : "bg-white/10 hover:bg-white/20"
//                     }`}
//                   >
//                     <Moon className="w-4 h-4" /> Evening
//                   </button>
//                 </div>
//               </div>
//               <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800] blur-[60px] opacity-20" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Utility Actions */}
//       <section className="py-20 bg-slate-50 border-y border-slate-100">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { icon: Download, label: "Brochure" },
//             { icon: Share2, label: "Share Look" },
//             { icon: Sparkles, label: "AR View" },
//             { icon: ChevronRight, label: "Consult" },
//           ].map((item, i) => (
//             <button
//               key={i}
//               className="flex flex-col items-center gap-3 p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group"
//             >
//               <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-[#8B1E3F] transition-colors">
//                 <item.icon className="w-6 h-6 text-[#8B1E3F] group-hover:text-white" />
//               </div>
//               <span className="font-bold text-slate-900 uppercase text-xs tracking-widest">
//                 {item.label}
//               </span>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-32 px-4 relative">
//         <div className="max-w-6xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="bg-white border-2 border-[#8B1E3F] p-12 md:p-24 rounded-[4rem] shadow-[0_50px_100px_rgba(139,30,63,0.1)] relative overflow-hidden"
//           >
//             <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#8B1E3F]/5 rounded-full blur-3xl" />
//             <div className="relative z-10">
//               <h2 className="text-5xl md:text-8xl font-[1000] text-slate-900 mb-8 tracking-tighter leading-none">
//                 ENOUGH SCROLLING. <br />
//                 <span className="text-[#8B1E3F]">START PAINTING.</span>
//               </h2>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button className="bg-[#8B1E3F] text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-[#8B1E3F]/40">
//                   Find Your Studio
//                 </button>
//                 <button className="bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
//                   Order Sample Pot
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Global Styles */}
//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ColorStudio;
