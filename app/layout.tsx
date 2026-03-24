import type { Metadata } from "next";
import { montserrat, openSans, playfairDisplay } from "./utils/constants";
import Header from "./home/Header";
import Footer from "./home/Footer";
import CartProvider from "./context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nerzpaints | Premium Paints & Colours",
  description:
    "Transform your space with durable, vibrant paints from Nerzpaints. Explore our colour gallery, find a store, and get inspired.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
