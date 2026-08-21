import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedProductCard from "./AnimatedProductCard";
import OutfitStudioWidget from "./OutfitStudioWidget";
import LightingRig from "./LightingRig";

const SAMPLE_PRODUCTS = [
  {
    id: 101,
    name: "Minimalist Wool Overcoat",
    category: "Outerwear",
    price: 299,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: [
      {
        name: "Camel",
        hex: "#B89B7A",
        filter: "none",
      },
      {
        name: "Charcoal",
        hex: "#292524",
        filter: "grayscale(1) brightness(0.55)",
      },
      {
        name: "Cream",
        hex: "#E7DED0",
        filter: "brightness(1.15) saturate(0.65)",
      },
    ],
    images: [
      "https://images.pexels.com/photos/7143497/pexels-photo-7143497.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },

  {
    id: 102,
    name: "Structured Cotton Blazer",
    category: "Tailoring",
    price: 185,
    rating: 4.6,
    reviews: 89,
    isNew: true,
    colors: [
      {
        name: "Warm Beige",
        hex: "#C7B8A5",
        filter: "none",
      },
      {
        name: "Onyx Black",
        hex: "#171717",
        filter: "grayscale(1) brightness(0.6)",
      },
      {
        name: "Forest Green",
        hex: "#355343",
        filter: "hue-rotate(35deg) saturate(0.75)",
      },
    ],
    images: [
      "https://images.pexels.com/photos/23531832/pexels-photo-23531832.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },

  {
    id: 103,
    name: "Silk Blend Knit Sweater",
    category: "Knitwear",
    price: 140,
    rating: 4.9,
    reviews: 56,
    isNew: true,
    colors: [
      {
        name: "Ivory",
        hex: "#EDE8DE",
        filter: "none",
      },
      {
        name: "Mocha",
        hex: "#806B5A",
        filter: "sepia(0.35) brightness(0.85)",
      },
      {
        name: "Olive",
        hex: "#65715B",
        filter: "hue-rotate(45deg) saturate(0.65)",
      },
    ],
    images: [
      "https://images.pexels.com/photos/27028696/pexels-photo-27028696.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },

  {
    id: 104,
    name: "Tailored Wide-Leg Trousers",
    category: "Bottoms",
    price: 120,
    rating: 4.7,
    reviews: 42,
    isNew: false,
    colors: [
      {
        name: "Stone",
        hex: "#A8A29E",
        filter: "none",
      },
      {
        name: "Black",
        hex: "#171717",
        filter: "grayscale(1) brightness(0.55)",
      },
      {
        name: "Sand",
        hex: "#D6C7B2",
        filter: "sepia(0.55) brightness(1.1)",
      },
    ],
    images: [
      "https://sofarstudio.cz/cdn/shop/files/new49282.jpg?v=1726764864&width=1200",
    ],
  },

  {
    id: 105,
    name: "Oversized Cashmere Cardigan",
    category: "Knitwear",
    price: 210,
    rating: 4.9,
    reviews: 78,
    isNew: true,
    colors: [
      {
        name: "Oatmeal",
        hex: "#E7E0D4",
        filter: "none",
      },
      {
        name: "Warm Beige",
        hex: "#A58F7A",
        filter: "sepia(0.35) brightness(0.9)",
      },
      {
        name: "Sage",
        hex: "#849B88",
        filter: "hue-rotate(75deg) saturate(0.55)",
      },
    ],
    images: [
      "https://images.pexels.com/photos/7760243/pexels-photo-7760243.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
  },

  {
    id: 106,
    name: "Classic Leather Biker Jacket",
    category: "Outerwear",
    price: 350,
    rating: 4.8,
    reviews: 110,
    isNew: false,
    colors: [
      {
        name: "Black",
        hex: "#111111",
        filter: "none",
      },
      {
        name: "Espresso",
        hex: "#49352C",
        filter: "sepia(0.45) brightness(0.75)",
      },
      {
        name: "Oxblood",
        hex: "#4A2025",
        filter: "hue-rotate(-20deg) saturate(0.9)",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=90",
    ],
  },
];

export default function Products({ onAddToCart }) {
  const [favorites, setFavorites] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [activeCardRect, setActiveCardRect] = useState(null);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleAddToCart = (product) => {
    if (!addedItems.includes(product.id)) {
      setAddedItems((prev) => [...prev, product.id]);
    }

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleQuickView = (product) => {
    console.log("Quick view:", product.name);
  };

  return (
    <section
      id="products"
      className="relative min-h-screen bg-[#F5F4F0] pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <LightingRig activeRect={activeCardRect} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-center mb-14"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-semibold">
            Interactive Experience
          </span>

          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mt-3">
            Curated Essentials
          </h2>

          <p className="text-xs text-stone-500 mt-3 font-mono">
            Hover over a product to activate the studio light
          </p>

          <div className="w-12 h-px bg-stone-400 mx-auto mt-5" />
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {SAMPLE_PRODUCTS.map((product, index) => (
              <AnimatedProductCard
                key={product.id}
                index={index}
                product={product}
                isFavorite={favorites.includes(product.id)}
                isAdded={addedItems.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                onActivate={setActiveCardRect}
                onDeactivate={() => setActiveCardRect(null)}
              />
            ))}

          </div>

          {/* Outfit Studio */}
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <OutfitStudioWidget />
          </div>

        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 pt-8 border-t border-stone-300 flex flex-col md:flex-row justify-between gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
            Quiet luxury / modern silhouettes
          </span>

          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
            Aura Studio — 2026
          </span>
        </motion.div>

      </div>
    </section>
  );
}