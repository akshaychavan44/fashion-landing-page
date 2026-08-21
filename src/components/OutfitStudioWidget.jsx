import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Plus,
  Check,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

/* =========================
   TOP PRODUCTS
========================= */

const TOPS = [
  {
    id: 101,
    name: "Structured Cotton Blazer",
    price: 185,
    image:
      "https://images.pexels.com/photos/23531832/pexels-photo-23531832.jpeg?auto=compress&cs=tinysrgb&w=900",
  },

  {
    id: 102,
    name: "Silk Blend Knit Sweater",
    price: 140,
    image:
      "https://images.pexels.com/photos/27028696/pexels-photo-27028696.jpeg?auto=compress&cs=tinysrgb&w=900",
  },

  {
    id: 103,
    name: "Oversized Cashmere Cardigan",
    price: 210,
    image:
      "https://images.pexels.com/photos/7760243/pexels-photo-7760243.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

/* =========================
   BOTTOM PRODUCTS
========================= */

const BOTTOMS = [
  {
    id: 104,
    name: "Tailored Wide-Leg Trousers",
    price: 120,
    image:
      "https://sofarstudio.cz/cdn/shop/files/new49282.jpg?v=1726764864&width=1200",
  },

  {
    id: 105,
    name: "Minimalist Wool Overcoat",
    price: 299,
    image:
      "https://images.pexels.com/photos/7143497/pexels-photo-7143497.jpeg?auto=compress&cs=tinysrgb&w=900",
  },

  {
    id: 106,
    name: "Classic Leather Biker Jacket",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=90",
  },
];

/* =========================
   COMPONENT
========================= */

export default function OutfitStudioWidget() {
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [bundleAdded, setBundleAdded] = useState(false);

  const selectedTop = TOPS[topIndex];
  const selectedBottom = BOTTOMS[bottomIndex];

  const totalPrice =
    selectedTop.price + selectedBottom.price;

  /* Change Top */
  const changeTop = () => {
    setTopIndex(
      (prev) => (prev + 1) % TOPS.length
    );

    setBundleAdded(false);
  };

  /* Change Bottom */
  const changeBottom = () => {
    setBottomIndex(
      (prev) => (prev + 1) % BOTTOMS.length
    );

    setBundleAdded(false);
  };

  return (
    <div
      className="
        w-full
        min-h-[580px]
        bg-stone-900
        text-stone-100
        p-5
        rounded-sm
        shadow-2xl
        flex
        flex-col
        justify-between
        space-y-4
        border
        border-stone-800
        mt-50
      "
    >

      {/* =========================
          HEADER
      ========================= */}

      <div>
        <div
          className="
            flex
            items-center
            space-x-2
            text-amber-400
            text-[10px]
            font-mono
            uppercase
            tracking-widest
            mb-1
          "
        >
          <Layers className="w-3.5 h-3.5" />

          <span>
            Interactive Canvas
          </span>
        </div>

        <h3 className="text-lg font-serif text-white">
          Outfit Combinator
        </h3>

        <p className="text-stone-400 text-xs mt-1">
          Mix different pieces to create your
          perfect look.
        </p>
      </div>


      {/* =========================
          OUTFIT CANVAS
      ========================= */}

      <div
        className="
          relative
          bg-stone-950
          p-3
          rounded
          border
          border-stone-800
          flex
          flex-col
          items-center
          space-y-2
          flex-1
          justify-center
        "
      >

        {/* =========================
            TOP PRODUCT
        ========================= */}

        <div
          className="
            relative
            w-full
            aspect-[4/3]
            rounded
            overflow-hidden
            bg-stone-900
          "
        >

          <AnimatePresence mode="wait">

            <motion.img
              key={selectedTop.id}
              src={selectedTop.image}
              alt={selectedTop.name}
              initial={{
                opacity: 0,
                scale: 0.88,
                y: -15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 1.05,
                y: 10,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
            />

          </AnimatePresence>


          {/* Swap Button */}

          <button
            onClick={changeTop}
            className="
              absolute
              right-2
              top-2
              p-1.5
              bg-stone-900/80
              backdrop-blur
              rounded-full
              text-white
              hover:bg-stone-800
              transition
              active:scale-95
            "
            title="Change top"
          >
            <RefreshCw className="w-3 h-3" />
          </button>


          {/* Product Name */}

          <span
            className="
              absolute
              bottom-2
              left-2
              bg-stone-950/80
              text-[10px]
              px-2
              py-1
              rounded
              text-stone-300
              font-mono
            "
          >
            Top: {selectedTop.name}
          </span>

        </div>


        {/* Plus */}

        <div className="flex items-center justify-center py-1">

          <Plus
            className="
              w-4
              h-4
              text-stone-600
            "
          />

        </div>


        {/* =========================
            BOTTOM PRODUCT
        ========================= */}

        <div
          className="
            relative
            w-full
            aspect-[4/3]
            rounded
            overflow-hidden
            bg-stone-900
          "
        >

          <AnimatePresence mode="wait">

            <motion.img
              key={selectedBottom.id}
              src={selectedBottom.image}
              alt={selectedBottom.name}
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 1.05,
                y: -10,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
            />

          </AnimatePresence>


          {/* Swap Button */}

          <button
            onClick={changeBottom}
            className="
              absolute
              right-2
              top-2
              p-1.5
              bg-stone-900/80
              backdrop-blur
              rounded-full
              text-white
              hover:bg-stone-800
              transition
              active:scale-95
            "
            title="Change bottom"
          >
            <RefreshCw className="w-3 h-3" />
          </button>


          {/* Product Name */}

          <span
            className="
              absolute
              bottom-2
              left-2
              bg-stone-950/80
              text-[10px]
              px-2
              py-1
              rounded
              text-stone-300
              font-mono
            "
          >
            Bottom: {selectedBottom.name}
          </span>

        </div>

      </div>


      {/* =========================
          PRICE + ADD TO BAG
      ========================= */}

      <div className="pt-2 border-t border-stone-800">

        <div
          className="
            flex
            items-center
            justify-between
            mb-3
            text-xs
          "
        >

          <span className="text-stone-400">
            Ensemble Total
          </span>

          <span
            className="
              text-white
              font-serif
              font-bold
              text-sm
            "
          >
            ${totalPrice}
          </span>

        </div>


        <button
          onClick={() => setBundleAdded(true)}
          className="
            w-full
            py-3
            bg-amber-400
            text-stone-950
            text-xs
            font-bold
            uppercase
            tracking-wider
            hover:bg-amber-300
            transition-colors
            flex
            items-center
            justify-center
            space-x-2
          "
        >

          {bundleAdded ? (
            <>
              <Check className="w-4 h-4" />

              <span>
                Look Added to Bag
              </span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />

              <span>
                Add Complete Look
              </span>
            </>
          )}

        </button>

      </div>

    </div>
  );
}