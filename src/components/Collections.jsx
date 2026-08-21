import React, { useState } from "react";
import { motion } from "framer-motion";

const collections = [
  {
    id: 1,
    title: "Autumn / Winter 2026",
    subtitle: "THE SEASONAL EDIT",
    description:
      "Structured silhouettes, warm textures, and refined layers designed for the colder season.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Minimalist Essentials",
    subtitle: "EVERYDAY ELEGANCE",
    description:
      "Clean lines and timeless pieces designed to become the foundation of your wardrobe.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Evening Edit",
    subtitle: "AFTER DARK",
    description:
      "Elegant silhouettes and understated details created for unforgettable evenings.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "Organic Collection",
    subtitle: "CONSCIOUSLY CRAFTED",
    description:
      "Premium organic fabrics meet modern design in a collection made with intention.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Collections() {
  const [activeCollection, setActiveCollection] = useState(collections[0]);

  // Split text for word-by-word roll-in animations
  const headerSubtitleWords = "Explore the world of Aura".split(" ");
  const headerTitleWords = "Collections".split(" ");
  const headerDescWords = "Discover carefully curated collections designed around timeless silhouettes, refined materials, and modern simplicity.".split(" ");

  return (
    <section
      id="collections"
      className="relative bg-[#EFECE6] text-stone-900 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[11px] tracking-[0.3em] uppercase text-stone-500 mb-4"
            >
              {headerSubtitleWords.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="inline-block mr-1.5"
                >
                  {w}
                </motion.span>
              ))}
            </motion.p>

            <h2 className="text-4xl md:text-6xl font-serif tracking-tight flex flex-wrap gap-x-3 overflow-hidden">
              {headerTitleWords.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </h2>
          </div>

          <p className="max-w-sm text-sm text-stone-500 leading-relaxed mt-6 md:mt-0 flex flex-wrap gap-x-1.5 overflow-hidden">
            {headerDescWords.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.6 + i * 0.025 }}
                className="inline-block"
              >
                {w}
              </motion.span>
            ))}
          </p>
        </div>

        {/* Interactive Collection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Collection List */}
          <div className="flex flex-col justify-center">

            {collections.map((collection, index) => {
              const isActive = activeCollection.id === collection.id;
              const titleWords = collection.title.split(" ");
              const descWords = collection.description.split(" ");

              return (
                <motion.button
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                  onMouseEnter={() => setActiveCollection(collection)}
                  onClick={() => setActiveCollection(collection)}
                  className="group text-left border-b border-stone-300 py-7 md:py-9 focus:outline-none"
                >
                  <div className="flex items-center justify-between gap-6">

                    <div className="flex items-center gap-5">

                      <span className="text-[10px] text-stone-400 font-mono">
                        0{index + 1}
                      </span>

                      <div>
                        <p
                          className={`text-[10px] tracking-[0.25em] uppercase mb-2 transition-colors duration-300 ${
                            isActive
                              ? "text-stone-500"
                              : "text-stone-400"
                          }`}
                        >
                          {collection.subtitle}
                        </p>

                        <h3
                          className={`text-2xl md:text-3xl font-serif flex flex-wrap gap-x-2 transition-all duration-500 ${
                            isActive
                              ? "translate-x-3 text-stone-950"
                              : "text-stone-600 group-hover:translate-x-2"
                          }`}
                        >
                          {titleWords.map((w, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: -10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1.0 + index * 0.1 + i * 0.05 }}
                              className="inline-block"
                            >
                              {w}
                            </motion.span>
                          ))}
                        </h3>
                      </div>
                    </div>

                    {/* Arrow */}
                    <span
                      className={`text-xl transition-all duration-500 ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-3"
                      }`}
                    >
                      →
                    </span>
                  </div>

                  {/* Active Description */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive
                        ? "max-h-24 opacity-100 mt-5"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm text-stone-500 leading-relaxed max-w-md pl-10 md:pl-10 flex flex-wrap gap-x-1">
                      {descWords.map((w, i) => (
                        <span key={i} className="inline-block mr-1">
                          {w}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Image Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="relative h-[500px] md:h-[650px] overflow-hidden bg-stone-200"
          >
            <img
              key={activeCollection.id}
              src={activeCollection.image}
              alt={activeCollection.title}
              className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_0.6s_ease-out]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Image Label */}
            <div className="absolute bottom-7 left-7 right-7 text-white flex items-end justify-between">

              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-2 text-white/70">
                  {activeCollection.subtitle}
                </p>

                <h3 className="text-2xl md:text-3xl font-serif">
                  {activeCollection.title}
                </h3>
              </div>

              <span className="text-xs tracking-widest uppercase border border-white/50 px-4 py-2 backdrop-blur-sm">
                Explore
              </span>

            </div>
          </motion.div>
        </div>

        {/* Bottom Statement (Spacing reduced to sit tightly right below the border) */}
        <div className="mt-16 pt-4 border-t border-stone-300 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400">
            Designed for the modern wardrobe
          </p>

          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400">
            Aura Studio — 2026
          </p>
        </div>

      </div>
    </section>
  );
}