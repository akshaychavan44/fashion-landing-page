import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Elegance Redefined",
    subtitle: "AUTUMN / WINTER 2026 COLLECTION",
    description: "Discover minimalist silhouettes crafted from sustainable, premium organic fabrics designed for timeless sophistication.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600",
    primaryCta: "Shop New Arrivals",
    secondaryCta: "Explore Lookbook"
  },
  {
    id: 2,
    title: "Modern Minimalist",
    subtitle: "ESSENTIAL CAPSULE WARDROBE",
    description: "Curated everyday essentials tailored to perfection. Elevate your daily routine with effortlessly refined style.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600",
    primaryCta: "Discover Essentials",
    secondaryCta: "View Collection"
  },
  {
    id: 3,
    title: "Crafted Simplicity",
    subtitle: "LIMITED EDITION RELEASE",
    description: "Handcrafted accessories and luxury outerwear engineered with precise craftsmanship and sustainable materials.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600",
    primaryCta: "Explore Outerwear",
    secondaryCta: "Learn More"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="hero" className="relative bg-[#FAF9F6] overflow-hidden flex flex-col min-h-[calc(100vh-80px)]">
      <div className="relative min-h-[calc(100vh-140px)] flex items-center py-12 lg:py-16 my-auto">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`w-full transition-opacity duration-700 ${
                isActive ? "opacity-100 relative z-10 pointer-events-auto" : "opacity-0 absolute inset-0 z-0 pointer-events-none"
              }`}
            >
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column - Individual Staggered Elements */}
                <div className="lg:col-span-6 space-y-6 lg:pr-8 text-center lg:text-left z-20">
                  
                  {/* 1. Subtitle (Enters First) */}
                  <div
                    className={`transition-all duration-700 ease-out delay-100 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                    }`}
                  >
                    <span className="inline-block text-xs font-semibold tracking-[0.25em] text-stone-500 uppercase">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* 2. Main Title (Enters Second) */}
                  <div
                    className={`transition-all duration-700 ease-out delay-300 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                    }`}
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.15] tracking-tight">
                      {slide.title}
                    </h1>
                  </div>

                  {/* 3. Description Paragraph (Enters Third) */}
                  <div
                    className={`transition-all duration-700 ease-out delay-500 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                    }`}
                  >
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {slide.description}
                    </p>
                  </div>

                  {/* 4. Action Buttons (Enters Fourth) */}
                  <div
                    className={`pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 transition-all duration-700 ease-out delay-700 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                    }`}
                  >
                    <a
                      href="#products"
                      className="w-full sm:w-auto px-8 py-4 bg-stone-900 text-stone-100 text-xs font-medium uppercase tracking-widest hover:bg-stone-800 transition-all duration-300 flex items-center justify-center space-x-3 group shadow-md"
                    >
                      <span>{slide.primaryCta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    <a
                      href="#collections"
                      className="w-full sm:w-auto px-8 py-4 border border-stone-300 text-stone-900 text-xs font-medium uppercase tracking-widest hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 text-center"
                    >
                      {slide.secondaryCta}
                    </a>
                  </div>

                </div>

                {/* Right Column - Hero Image (Enters Last) */}
                <div
                  className={`lg:col-span-6 flex justify-center lg:justify-end transition-all duration-700 ease-out delay-900 ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                  }`}
                >
                  <div className="w-full max-w-sm sm:max-w-md aspect-[3/4] max-h-[500px] lg:max-h-[550px] relative overflow-hidden rounded-md shadow-xl">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-900/5 pointer-events-none" />
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {/* Carousel Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-6">
          <button
            onClick={prevSlide}
            className="p-2 text-stone-700 hover:text-stone-900 hover:bg-white/80 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentSlide ? "w-8 bg-stone-900" : "w-2 bg-stone-300 hover:bg-stone-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 text-stone-700 hover:text-stone-900 hover:bg-white/80 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="relative z-20 border-t border-b border-stone-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center space-x-3 text-stone-700">
            <Truck className="w-5 h-5 stroke-[1.5] text-stone-900 shrink-0" />
            <span className="text-xs tracking-wider uppercase font-medium">Free Global Shipping</span>
          </div>

          <div className="flex items-center justify-center space-x-3 text-stone-700">
            <ShieldCheck className="w-5 h-5 stroke-[1.5] text-stone-900 shrink-0" />
            <span className="text-xs tracking-wider uppercase font-medium">Sustainably Sourced</span>
          </div>

          <div className="flex items-center justify-center space-x-3 text-stone-700">
            <RefreshCw className="w-5 h-5 stroke-[1.5] text-stone-900 shrink-0" />
            <span className="text-xs tracking-wider uppercase font-medium">30-Day Effortless Returns</span>
          </div>
        </div>
      </div>
    </section>
  );
}