export interface Product {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  image: string;
  colours: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Velvet Touch Interior",
    category: "interior",
    priceRange: "₦8,500 – ₦12,500",
    image: "/images/velvet-touch.jpg",
    colours: ["#F5E6D3", "#A3C9A8", "#7B4B3A", "#2C3E50"],
  },
  {
    id: 2,
    name: "WeatherShield Exterior",
    category: "exterior",
    priceRange: "₦15,000 – ₦22,000",
    image: "/images/weathershield.jpg",
    colours: ["#D4B48C", "#8B5A2B", "#4A6FA5", "#2F4F4F"],
  },
  {
    id: 3,
    name: "MetalGuard Automotive",
    category: "automotive",
    priceRange: "₦12,000 – ₦18,000",
    image: "/images/metalguard.jpg",
    colours: ["#2A2A2A", "#FFB800", "#8B1E3F", "#708090"],
  },
  {
    id: 4,
    name: "Industrial Coatings",
    category: "industrial",
    priceRange: "₦20,000 – ₦30,000",
    image: "/images/industrial.jpg",
    colours: ["#2C3E50", "#808000", "#708090", "#2A2A2A"],
  },
];
