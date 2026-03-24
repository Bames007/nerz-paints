"use client";

import dynamic from "next/dynamic";

const FeaturedProducts = dynamic(() => import("./FeaturedProducts"), {
  ssr: false,
});

export default function ClientFeaturedProducts() {
  return <FeaturedProducts />;
}
