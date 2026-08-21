import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, {
    stiffness: 700,
    damping: 40,
    mass: 0.3,
  });

  const springY = useSpring(mouseY, {
    stiffness: 700,
    damping: 40,
    mass: 0.3,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer soft ring */}
      <motion.div
        className="
          fixed
          top-0
          left-0
          w-6
          h-6
          rounded-full
          border
          border-stone-800/60
          pointer-events-none
          z-[9999]
        "
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Small center dot */}
      <motion.div
        className="
          fixed
          top-0
          left-0
          w-1.5
          h-1.5
          rounded-full
          bg-stone-900
          pointer-events-none
          z-[10000]
        "
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}