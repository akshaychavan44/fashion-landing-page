import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({
  cartCount = 0,
  onOpenCart,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const canvasRef = useRef(null);

  /* =========================================================
     SPIDER WEB / PARTICLE ANIMATION
  ========================================================= */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationFrameId;

    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;

      if (!parent) return;

      width = canvas.width = parent.offsetWidth;
      height = canvas.height = parent.offsetHeight;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    /* ---------------------------------------------------------
       CREATE PARTICLES
    --------------------------------------------------------- */

    const nodeCount = 70;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,

        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,

        size: Math.random() * 1.5 + 0.5,
      });
    }

    /* ---------------------------------------------------------
       MOUSE MOVE
    --------------------------------------------------------- */

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;

    parent.addEventListener(
      "mousemove",
      handleMouseMove
    );

    parent.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    /* ---------------------------------------------------------
       ANIMATION
    --------------------------------------------------------- */

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /* -----------------------------------------------
         MOVE PARTICLES
      ------------------------------------------------ */

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        /* Bounce from edges */

        if (
          node.x <= 0 ||
          node.x >= width
        ) {
          node.vx *= -1;
        }

        if (
          node.y <= 0 ||
          node.y >= height
        ) {
          node.vy *= -1;
        }

        /* ---------------------------------------------
           MOUSE REPULSION
        --------------------------------------------- */

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

        if (
          distance < mouse.radius &&
          distance > 0
        ) {
          const force =
            (mouse.radius - distance) /
            mouse.radius;

          node.x -=
            (dx / distance) *
            force *
            1.5;

          node.y -=
            (dy / distance) *
            force *
            1.5;
        }
      });

      /* -----------------------------------------------
         DRAW CONNECTIONS
      ------------------------------------------------ */

      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {
        for (
          let j = i + 1;
          j < nodes.length;
          j++
        ) {
          const dx =
            nodes[i].x -
            nodes[j].x;

          const dy =
            nodes[i].y -
            nodes[j].y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (distance < 115) {
            const opacity =
              0.22 *
              (1 - distance / 115);

            ctx.beginPath();

            ctx.moveTo(
              nodes[i].x,
              nodes[i].y
            );

            ctx.lineTo(
              nodes[j].x,
              nodes[j].y
            );

            ctx.strokeStyle =
              `rgba(28,25,23,${opacity})`;

            ctx.lineWidth = 0.6;

            ctx.stroke();
          }
        }

        /* ---------------------------------------------
           CONNECTION TO MOUSE
        --------------------------------------------- */

        const dx =
          mouse.x -
          nodes[i].x;

        const dy =
          mouse.y -
          nodes[i].y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

        if (
          distance < mouse.radius
        ) {
          const opacity =
            0.5 *
            (1 - distance / mouse.radius);

          ctx.beginPath();

          ctx.moveTo(
            nodes[i].x,
            nodes[i].y
          );

          ctx.lineTo(
            mouse.x,
            mouse.y
          );

          ctx.strokeStyle =
            `rgba(28,25,23,${opacity})`;

          ctx.lineWidth = 0.8;

          ctx.stroke();
        }
      }

      /* -----------------------------------------------
         DRAW PARTICLES
      ------------------------------------------------ */

      nodes.forEach((node) => {
        ctx.beginPath();

        ctx.arc(
          node.x,
          node.y,
          node.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(28,25,23,0.35)";

        ctx.fill();
      });

      /* -----------------------------------------------
         MOUSE RADAR RINGS
      ------------------------------------------------ */

      if (
        mouse.x > 0 &&
        mouse.y > 0
      ) {
        for (
          let ring = 1;
          ring <= 4;
          ring++
        ) {
          const radius =
            ring * 35;

          ctx.beginPath();

          ctx.arc(
            mouse.x,
            mouse.y,
            radius,
            0,
            Math.PI * 2
          );

          ctx.strokeStyle =
            `rgba(28,25,23,${
              0.12 -
              ring * 0.02
            })`;

          ctx.lineWidth = 0.5;

          ctx.stroke();
        }
      }

      animationFrameId =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    /* ---------------------------------------------------------
       CLEANUP
    --------------------------------------------------------- */

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      parent.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      parent.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  /* =========================================================
     NAVIGATION DATA
  ========================================================= */

  const navItems = [
    {
      number: "01",
      name: "Home",
      href: "#hero",
    },
    {
      number: "02",
      name: "Collections",
      href: "#collections",
      hasMenu: true,
    },
    {
      number: "03",
      name: "Products",
      href: "#products",
    },
    {
      number: "04",
      name: "About",
      href: "#about",
    },
  ];

  const collections = [
    {
      name: "New Arrivals",
      description: "Fresh silhouettes",
    },
    {
      name: "Essentials",
      description: "Everyday refinement",
    },
    {
      name: "Tailoring",
      description: "Sharp & structured",
    },
    {
      name: "Knitwear",
      description: "Soft textures",
    },
  ];

  return (
    <div className="relative z-50 w-full">

      {/* =====================================================
          ANNOUNCEMENT BAR
      ===================================================== */}

      <div className="relative overflow-hidden bg-stone-950 text-stone-200">

        <motion.div
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            whitespace-nowrap
            py-2
            text-[9px]
            sm:text-[10px]
            tracking-[0.3em]
            uppercase
          "
        >
          Complimentary Express Shipping
          <span className="mx-10">✦</span>

          Complimentary Express Shipping
          <span className="mx-10">✦</span>

          Complimentary Express Shipping
          <span className="mx-10">✦</span>

          Complimentary Express Shipping
          <span className="mx-10">✦</span>
        </motion.div>

      </div>

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <header
        className="
          relative
          w-full
          bg-[#FAF9F6]
          border-b
          border-stone-200
          overflow-visible
        "
      >

        {/* ===================================================
            SPIDER WEB CANVAS
        =================================================== */}

        <canvas
          ref={canvasRef}
          className="
            absolute
            inset-0
            w-full
            h-full
            pointer-events-none
            z-0
          "
        />

        {/* ===================================================
            NAV CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            max-w-[1500px]
            mx-auto
            px-5
            sm:px-8
            lg:px-12
            h-[92px]
            flex
            items-center
            justify-between
          "
        >

          {/* MOBILE MENU */}

          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="
              lg:hidden
              cursor-pointer
              p-2
              -ml-2
              text-stone-800
            "
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* LOGO */}

          <a
            href="#hero"
            className="
              absolute
              left-1/2
              -translate-x-1/2
              group
              cursor-pointer
            "
          >

            <div className="flex flex-col items-center">

              <motion.span
                whileHover={{
                  letterSpacing:
                    "0.32em",
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  text-[19px]
                  sm:text-[22px]
                  font-serif
                  font-semibold
                  tracking-[0.22em]
                  text-stone-900
                  whitespace-nowrap
                "
              >
                AURA
              </motion.span>

              <span
                className="
                  text-[7px]
                  tracking-[0.5em]
                  text-stone-500
                  ml-1
                "
              >
                STUDIO
              </span>

            </div>

          </a>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav
            className="
              hidden
              lg:flex
              items-center
              gap-8
            "
          >

            {navItems.map(
              (item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasMenu) {
                      setCollectionsOpen(
                        true
                      );
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.hasMenu) {
                      setCollectionsOpen(
                        false
                      );
                    }
                  }}
                >

                  <a
                    href={item.href}
                    className="
                      group
                      relative
                      flex
                      items-center
                      gap-2
                      py-4
                      text-[10px]
                      font-medium
                      tracking-[0.18em]
                      uppercase
                      text-stone-600
                      cursor-pointer
                    "
                  >

                    <span
                      className="
                        text-[8px]
                        text-stone-400
                        font-mono
                        group-hover:text-stone-900
                        transition-colors
                      "
                    >
                      {item.number}
                    </span>

                    <span
                      className="
                        relative
                        transition-all
                        duration-300
                        group-hover:text-stone-950
                      "
                    >
                      {item.name}

                      {/* NAV HOVER LINE */}

                      <span
                        className="
                          absolute
                          left-0
                          -bottom-1
                          h-px
                          w-0
                          bg-stone-900
                          transition-all
                          duration-500
                          group-hover:w-full
                        "
                      />
                    </span>

                    {item.hasMenu && (
                      <span
                        className="
                          text-[9px]
                          transition-transform
                          duration-300
                          group-hover:rotate-45
                        "
                      >
                        +
                      </span>
                    )}

                  </a>

                  {/* =================================================
                      COLLECTIONS DROPDOWN
                  ================================================= */}

                  <AnimatePresence>
                    {item.hasMenu &&
                      collectionsOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.98,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 10,
                            scale: 0.98,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="
                            absolute
                            top-full
                            left-0
                            w-[440px]
                            bg-stone-950
                            text-white
                            p-6
                            shadow-2xl
                          "
                        >

                          <div className="flex items-center justify-between mb-6">

                            <div>

                              <p
                                className="
                                  text-[9px]
                                  tracking-[0.25em]
                                  uppercase
                                  text-stone-500
                                "
                              >
                                Explore
                              </p>

                              <h3
                                className="
                                  font-serif
                                  text-xl
                                  mt-1
                                "
                              >
                                Collections
                              </h3>

                            </div>

                            <Sparkles
                              className="
                                w-4
                                h-4
                                text-stone-400
                              "
                            />

                          </div>

                          <div className="grid grid-cols-2 gap-2">

                            {collections.map(
                              (
                                collection,
                                index
                              ) => (
                                <a
                                  key={
                                    collection.name
                                  }
                                  href="#products"
                                  className="
                                    group
                                    p-4
                                    border
                                    border-stone-800
                                    hover:bg-stone-900
                                    transition-all
                                    duration-300
                                  "
                                >

                                  <div className="flex justify-between">

                                    <span
                                      className="
                                        text-[9px]
                                        font-mono
                                        text-stone-600
                                      "
                                    >
                                      0
                                      {index +
                                        1}
                                    </span>

                                    <ArrowUpRight
                                      className="
                                        w-3
                                        h-3
                                        opacity-0
                                        group-hover:opacity-100
                                        group-hover:translate-x-1
                                        group-hover:-translate-y-1
                                        transition-all
                                      "
                                    />

                                  </div>

                                  <h4
                                    className="
                                      mt-6
                                      text-xs
                                      uppercase
                                      tracking-wider
                                    "
                                  >
                                    {
                                      collection.name
                                    }
                                  </h4>

                                  <p
                                    className="
                                      text-[9px]
                                      text-stone-500
                                      mt-1
                                    "
                                  >
                                    {
                                      collection.description
                                    }
                                  </p>

                                </a>
                              )
                            )}

                          </div>

                          <a
                            href="#products"
                            className="
                              mt-5
                              flex
                              items-center
                              justify-between
                              text-[9px]
                              uppercase
                              tracking-[0.2em]
                              text-stone-400
                              hover:text-white
                              transition-colors
                            "
                          >
                            View entire collection

                            <ArrowUpRight className="w-3 h-3" />
                          </a>

                        </motion.div>
                      )}
                  </AnimatePresence>

                </div>
              )
            )}

          </nav>

          {/* =================================================
              RIGHT ICONS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3
              sm:gap-5
            "
          >

            {/* SEARCH */}

            <AnimatePresence mode="wait">

              {searchOpen ? (

                <motion.div
                  initial={{
                    width: 0,
                    opacity: 0,
                  }}
                  animate={{
                    width: 190,
                    opacity: 1,
                  }}
                  exit={{
                    width: 0,
                    opacity: 0,
                  }}
                  className="
                    hidden
                    sm:flex
                    items-center
                    overflow-hidden
                    border-b
                    border-stone-900
                  "
                >

                  <Search
                    className="
                      w-4
                      h-4
                      text-stone-500
                      shrink-0
                    "
                  />

                  <input
                    autoFocus
                    type="text"
                    placeholder="Search pieces..."
                    className="
                      w-full
                      bg-transparent
                      outline-none
                      px-3
                      py-2
                      text-xs
                      text-stone-900
                      placeholder:text-stone-400
                    "
                  />

                  <button
                    onClick={() =>
                      setSearchOpen(false)
                    }
                    className="
                      cursor-pointer
                      text-stone-400
                      hover:text-stone-900
                    "
                  >
                    <X className="w-3 h-3" />
                  </button>

                </motion.div>

              ) : (

                <motion.button
                  whileHover={{
                    y: -2,
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={() =>
                    setSearchOpen(true)
                  }
                  className="
                    cursor-pointer
                    text-stone-700
                    hover:text-stone-950
                  "
                >
                  <Search
                    className="
                      w-[18px]
                      h-[18px]
                      stroke-[1.4]
                    "
                  />
                </motion.button>

              )}

            </AnimatePresence>

            {/* USER */}

            <motion.button
              whileHover={{
                y: -2,
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="
                hidden
                sm:block
                cursor-pointer
                text-stone-700
                hover:text-stone-950
              "
            >
              <UserRound
                className="
                  w-[18px]
                  h-[18px]
                  stroke-[1.4]
                "
              />
            </motion.button>

            {/* CART */}

            <motion.button
              whileHover={{
                y: -2,
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={onOpenCart}
              className="
                relative
                cursor-pointer
                text-stone-700
                hover:text-stone-950
              "
            >

              <ShoppingBag
                className="
                  w-[19px]
                  h-[19px]
                  stroke-[1.4]
                "
              />

              {cartCount > 0 && (
                <motion.span
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="
                    absolute
                    -top-2
                    -right-2
                    min-w-[16px]
                    h-[16px]
                    px-1
                    rounded-full
                    bg-stone-900
                    text-white
                    text-[8px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartCount}
                </motion.span>
              )}

            </motion.button>

          </div>

        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <AnimatePresence>

          {mobileOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className="
                lg:hidden
                overflow-hidden
                border-t
                border-stone-200
              "
            >

              <div className="px-6 py-6">

                {navItems.map(
                  (item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.06,
                      }}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        py-4
                        border-b
                        border-stone-200
                        cursor-pointer
                      "
                    >

                      <div className="flex items-center gap-4">

                        <span
                          className="
                            text-[9px]
                            font-mono
                            text-stone-400
                          "
                        >
                          {item.number}
                        </span>

                        <span
                          className="
                            text-sm
                            uppercase
                            tracking-[0.2em]
                            text-stone-800
                            group-hover:translate-x-2
                            transition-transform
                            duration-300
                          "
                        >
                          {item.name}
                        </span>

                      </div>

                      <ArrowUpRight
                        className="
                          w-4
                          h-4
                          text-stone-400
                          group-hover:text-stone-900
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                          transition-all
                        "
                      />

                    </motion.a>
                  )
                )}

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </header>
    </div>
  );
}