import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { Heart, Eye, ShoppingBag, Check, Star } from "lucide-react";

export default function AnimatedProductCard({
  product,
  index = 0,
  isFavorite,
  isAdded,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
}) {
  const cardRef = useRef(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Drag Rotation
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const rawRotateX = useTransform(
    [mouseY, dragY],
    ([mY, dY]) => mY * -15 + dY * 0.3
  );
  const rawRotateY = useTransform(
    [mouseX, dragX],
    ([mX, dX]) => mX * 15 + dX * 0.3
  );

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });

  // Scroll Zoom
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const scrollZoom = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.08, 1.15]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    if (product.colors && product.colors.length > 0) {
      setSelectedColorIndex((prev) => (prev + 1) % product.colors.length);
    }
  };

  const currentColor = product.colors?.[selectedColorIndex] || {
    hex: "#1c1917",
    filter: "none",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: -100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 12,
        mass: 1.2,
        delay: (index % 3) * 0.3, // Delay increased here so items animate in a bit later/slower
      }}
      onMouseEnter={handleMouseEnter}
      onClick={handleCardClick}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col bg-[#FAF9F6] border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 select-none cursor-pointer"
      style={{ perspective: 1000 }}
    >
      {/* --- SUBTLE WHITE COVER OVERLAY (Full Image Coverage) --- */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none z-30"
          />
        )}
      </AnimatePresence>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        className="w-full h-full flex flex-col"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
          {product.isNew && (
            <span className="absolute top-3 left-3 z-20 bg-stone-900 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 pointer-events-none">
              New
            </span>
          )}

          <div className="absolute top-3 right-3 z-20 flex flex-col space-y-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-stone-700 hover:text-red-500 transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-stone-700 hover:text-stone-900 transition-all duration-300 hover:scale-110 shadow-sm opacity-0 group-hover:opacity-100"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDrag={(e, info) => {
              dragX.set(dragX.get() + info.delta.x);
              dragY.set(dragY.get() + info.delta.y);
            }}
            onDragEnd={() => {
              dragX.set(0);
              dragY.set(0);
            }}
            style={{ scale: scrollZoom }}
            className="w-full h-full relative"
          >
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500 group-hover:contrast-125 group-hover:brightness-105 group-hover:saturate-110"
              style={{
                filter: currentColor.filter || "none",
              }}
            />
          </motion.div>

          <div className="absolute inset-x-4 bottom-4 z-20 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-full py-3 bg-stone-900 text-white text-xs font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center space-x-2 shadow-xl"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1 justify-between bg-white pointer-events-none">
          <div>
            <div className="flex items-center justify-between text-[11px] text-stone-400 tracking-wider uppercase mb-1">
              <span>{product.category}</span>
              <div className="flex items-center space-x-1 text-stone-700">
                <Star className="w-3 h-3 fill-stone-900 text-stone-900" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-stone-400">({product.reviews})</span>
              </div>
            </div>

            <h3 className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-sm font-serif font-bold text-stone-900">
              ${product.price}
            </span>

            <div className="flex items-center space-x-1.5 pointer-events-auto">
              {product.colors?.map((col, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full border transition-all ${
                    selectedColorIndex === idx
                      ? "ring-2 ring-stone-900 scale-125 border-white"
                      : "border-stone-300"
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}