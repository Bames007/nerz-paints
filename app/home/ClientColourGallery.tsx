"use client";

import dynamic from "next/dynamic";

// Dynamically import ColourGallery with SSR disabled (client-only)
const ColourGallery = dynamic(() => import("./ColourGallery"), { ssr: false });

export default function ClientColourGallery() {
  return <ColourGallery />;
}
