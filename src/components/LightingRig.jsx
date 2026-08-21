import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function LightingRig({ activeRect }) {
  // Use viewport-relative coordinates directly without adding scroll offsets
  const targetX = activeRect ? activeRect.left + activeRect.width / 2 : "50%";
  const targetY = activeRect ? activeRect.top - 20 : -100; // Park above viewport when inactive
  const hasTarget = Boolean(activeRect);

  return (
    /* Use fixed positioning so it overlays the entire screen regardless of scroll position */
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div
        className="absolute top-0 flex flex-col items-center origin-top"
        animate={{
          left: targetX,
          y: hasTarget ? Math.max(0, targetY) : -100, // Hide off-screen when no product is selected
        }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        style={{ x: "-50%" }}
      >
        {/* Dynamic wire extending from the top of the browser window */}
        <motion.div
          animate={{ height: hasTarget ? Math.max(20, targetY) : 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          className="w-[1px] bg-stone-400/60"
        />

        {/* Glowing Bulb Icon */}
        <div className="relative flex items-center justify-center">
          <div className={`absolute w-12 h-12 rounded-full transition-all duration-300 ${hasTarget ? "bg-amber-400/50 blur-lg scale-150" : "bg-transparent"}`} />
          <div className="p-1.5 bg-stone-900 border border-stone-700 rounded-full shadow-2xl text-amber-400">
            <Lightbulb className="w-4 h-4 fill-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Light Beam Cone */}
        <motion.div
          animate={{
            opacity: hasTarget ? 1 : 0,
            scaleY: hasTarget ? 1 : 0.2,
          }}
          transition={{ duration: 0.3 }}
          className="w-[320px] h-[600px] bg-gradient-to-b from-amber-300/35 via-amber-200/10 to-transparent origin-top pointer-events-none"
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}