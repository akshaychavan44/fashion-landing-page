import React from "react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800 select-none">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">

        {/* Brand & Info */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-serif text-white tracking-wider uppercase">
            Aura Studio
          </h2>

          <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
            Discover minimalist silhouettes crafted from sustainable,
            premium organic fabrics designed for timeless sophistication
            and effortless modern living.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 pt-2">
            <a
              href="#instagram"
              className="p-2 w-9 h-9 flex items-center justify-center rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-all"
            >
              ◎
            </a>

            <a
              href="#twitter"
              className="p-2 w-9 h-9 flex items-center justify-center rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-all"
            >
              𝕏
            </a>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-mono tracking-widest text-white">
            Collections
          </h3>

          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <a href="#autumn" className="hover:text-white transition-colors">
                Autumn / Winter 2026
              </a>
            </li>

            <li>
              <a href="#minimalist" className="hover:text-white transition-colors">
                Minimalist Silhouettes
              </a>
            </li>

            <li>
              <a href="#sustainable" className="hover:text-white transition-colors">
                Sustainable Organic
              </a>
            </li>

            <li>
              <a href="#lookbook" className="hover:text-white transition-colors">
                Lookbook
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-mono tracking-widest text-white">
            Customer Care
          </h3>

          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <a href="#shipping" className="hover:text-white transition-colors">
                Complimentary Shipping
              </a>
            </li>

            <li>
              <a href="#returns" className="hover:text-white transition-colors">
                30-Day Effortless Returns
              </a>
            </li>

            <li>
              <a href="#orders" className="hover:text-white transition-colors">
                Track Your Order
              </a>
            </li>

            <li>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ & Support
              </a>
            </li>
          </ul>
        </div>

        {/* Region / Currency */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-mono tracking-widest text-white">
            Region & Language
          </h3>

          <p className="text-xs text-stone-400">
            Select your preferred shipping location and currency for seamless
            checkout.
          </p>

          <button className="flex items-center space-x-2 px-3 py-2 bg-stone-900 border border-stone-800 rounded text-xs text-stone-200 hover:border-stone-700 transition-colors">
            <span className="text-sm">◎</span>
            <span>India (₹ INR)</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 space-y-4 md:space-y-0">

        <p>
          &copy; {new Date().getFullYear()} Aura Studio. All rights reserved.
        </p>

        <div className="flex space-x-6">
          <a href="#privacy" className="hover:text-stone-400 transition-colors">
            Privacy Policy
          </a>

          <a href="#terms" className="hover:text-stone-400 transition-colors">
            Terms of Service
          </a>

          <a href="#cookies" className="hover:text-stone-400 transition-colors">
            Cookie Preferences
          </a>
        </div>
      </div>
    </footer>
  );
}