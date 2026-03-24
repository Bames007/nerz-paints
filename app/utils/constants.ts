import { Montserrat, Open_Sans, Playfair_Display } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // bold for headings
  variable: "--font-montserrat",
  preload: true,
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
  preload: true,
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  preload: true,
});
