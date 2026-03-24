export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amina Bello",
    role: "Homeowner",
    quote:
      "The quality of Nerzpaints is outstanding. My living room has never looked better! The colours are vibrant and the finish is perfect.",
    rating: 5,
    image: "/images/testimonials/amina.jpg",
  },
  {
    id: 2,
    name: "Chidi Okonkwo",
    role: "Interior Designer",
    quote:
      "I recommend Nerzpaints to all my clients. Their colour range is extensive and the durability is unmatched.",
    rating: 5,
    image: "/images/testimonials/chidi.jpg",
  },
  {
    id: 3,
    name: "Fatima Yusuf",
    role: "Contractor",
    quote:
      "We've used Nerzpaints on multiple commercial projects. Always consistent, always reliable.",
    rating: 4,
    image: "/images/testimonials/fatima.jpg",
  },
];
