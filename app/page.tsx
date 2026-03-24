import dynamic from "next/dynamic";
import Hero from "./home/Hero";
import Newsletter from "./home/Newsletter";
import ClientPromoBanner from "./home/ClientPromoBanner";
import ClientColourGallery from "./home/ClientColourGallery";
import ClientFeaturedProducts from "./home/ClientFeaturedProducts";
import ClientStoreLocator from "./home/ClientStoreLocator";
import ClientTestimonials from "./home/ClientTestimonials";
import SwatchHero from "./home/SwatchHero";
// import ColorStudio from "./home/NerzStudio";

export default function Home() {
  return (
    <>
      <Hero />
      <SwatchHero />
      <ClientPromoBanner />
      <ClientColourGallery />
      {/* <ColorStudio /> */}
      <ClientFeaturedProducts />
      <ClientStoreLocator />
      <ClientTestimonials />
      <Newsletter />
    </>
  );
}
