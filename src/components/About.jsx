import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw, ShieldCheck, HeartHandshake } from "lucide-react";

const PHILOSOPHY_CARDS = [
  {
    id: 1,
    titleWords: "Ethical Sourcing".split(" "),
    frontWords: "Transparent supply chains built on fair wages and safe working conditions.".split(" "),
    backWords: "We partner directly with family-run mills and certified artisans who share our unwavering commitment to human dignity and fair labor.".split(" "),
    icon: <HeartHandshake className="w-5 h-5 text-stone-700" />,
  },
  {
    id: 2,
    titleWords: "Slow Fashion".split(" "),
    frontWords: "Crafted for longevity rather than fleeting seasonal trends.".split(" "),
    backWords: "Every garment goes through rigorous durability testing. We design timeless silhouettes intended to stay in your wardrobe for decades.".split(" "),
    icon: <ShieldCheck className="w-5 h-5 text-stone-700" />,
  },
  {
    id: 3,
    titleWords: "Zero-Waste Goal".split(" "),
    frontWords: "Mindful production minimizing fabric scraps and carbon footprint.".split(" "),
    backWords: "Deadstock utilization and compostable packaging ensure our creative process gives back more to the environment than it takes.".split(" "),
    icon: <Sparkles className="w-5 h-5 text-stone-700" />,
  }
];

export default function About() {
  const [flippedCardId, setFlippedCardId] = useState(null);

  // Text content split into words for animated flows
  const headingWords = "Designed for the conscious individual.".split(" ");
  const mainParagraphWords = "At Aura Studio, we believe that true elegance lies in simplicity. Our journey began with a commitment to redefining modern staples through the lens of sustainability and timeless design. Each piece is meticulously crafted using premium, organic materials to ensure longevity and comfort.".split(" ");
  const commitmentWords = "Ethically sourced fabrics, transparent manufacturing, and zero-waste packaging.".split(" ");

  return (
    <section id="about" className="py-28 bg-[#FAF9F6] px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image with fallback container */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800"
            alt="About Aura Studio"
            className="w-full h-[500px] object-cover grayscale-[15%] rounded-sm shadow-md"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-stone-200 -z-10 hidden sm:block" />
        </div>

        {/* Right Side: Content */}
        <div className="space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs font-mono tracking-widest uppercase text-stone-500 block"
          >
            Our Philosophy
          </motion.span>
          
          {/* Animated Heading */}
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight flex flex-wrap gap-x-3 overflow-hidden py-1">
            {headingWords.map((word, index) => {
              const isItalic = word.includes("conscious") || word.includes("individual.");
              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1, // Later start delay
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className={`inline-block ${isItalic ? "italic font-light" : ""}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h2>
          
          {/* Animated Main Paragraph */}
          <p className="text-stone-600 leading-relaxed text-sm md:text-base flex flex-wrap gap-x-1.5 overflow-hidden">
            {mainParagraphWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.8 + index * 0.025, // Staggered later start
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>

          <div className="pt-4 border-t border-stone-200">
            <motion.h4 
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-2"
            >
              Our Commitment
            </motion.h4>
            
            {/* Animated Commitment Subtext Paragraph */}
            <p className="text-stone-500 text-xs italic flex flex-wrap gap-x-1.5 overflow-hidden">
              {commitmentWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 1.6 + index * 0.03,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Interactive Flip Cards Grid with Word Animations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {PHILOSOPHY_CARDS.map((card, cardIndex) => {
              const isFlipped = flippedCardId === card.id;

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.9 + cardIndex * 0.2 }} // Appears later after text
                  className="h-36 cursor-pointer perspective-1000"
                  onMouseEnter={() => setFlippedCardId(card.id)}
                  onMouseLeave={() => setFlippedCardId(null)}
                  onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                >
                  <motion.div
                    className="w-full h-full relative rounded-sm shadow-sm"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front Face */}
                    <div
                      className="absolute inset-0 w-full h-full bg-white border border-stone-200 p-4 flex flex-col justify-between rounded-sm backface-hidden"
                    >
                      <div className="flex items-center justify-between">
                        {card.icon}
                        <RefreshCw className="w-3 h-3 text-stone-400" />
                      </div>
                      <div>
                        {/* Word by word title inside card */}
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1 flex flex-wrap gap-x-1">
                          {card.titleWords.map((w, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: -10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 2.1 + cardIndex * 0.15 + i * 0.05 }}
                              className="inline-block"
                            >
                              {w}
                            </motion.span>
                          ))}
                        </h4>

                        {/* Word by word front text */}
                        <p className="text-[11px] text-stone-500 flex flex-wrap gap-x-1 overflow-hidden">
                          {card.frontWords.map((w, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 2.3 + i * 0.02 }}
                              className="inline-block"
                            >
                              {w}
                            </motion.span>
                          ))}
                        </p>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      className="absolute inset-0 w-full h-full bg-stone-900 text-stone-100 p-4 flex flex-col justify-center rounded-sm backface-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                        Deep Dive
                      </h4>
                      <p className="text-[11px] text-stone-300 leading-relaxed">
                        {card.backText || card.backWords.join(" ")}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}