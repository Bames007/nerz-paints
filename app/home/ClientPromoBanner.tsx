"use client";

import dynamic from "next/dynamic";

// Dynamically import PromoBanner with SSR disabled (client-only)
const PromoBanner = dynamic(() => import("./PromoBanner"), { ssr: false });

export default function ClientPromoBanner() {
  return <PromoBanner />;
}
