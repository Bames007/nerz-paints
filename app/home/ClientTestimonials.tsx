"use client";

import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("./Testimonials"), { ssr: false });

export default function ClientTestimonials() {
  return <Testimonials />;
}
