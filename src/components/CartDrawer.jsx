import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#FAF9F6] text-stone-900 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-stone-900" />
                <h2 className="text-lg font-serif font-medium">Your Shopping Bag</h2>
                <span className="text-xs bg-stone-200 px-2 py-0.5 rounded-full font-mono">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-stone-500">
                  <ShoppingBag className="w-12 h-12 stroke-1 text-stone-400" />
                  <p className="text-sm font-medium">Your bag is currently empty.</p>
                  <p className="text-xs text-stone-400 max-w-xs">
                    Explore our minimalist silhouettes and add your favorite pieces to begin.
                  </p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-white rounded border border-stone-200 shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      {item.images?.[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-14 h-16 object-cover rounded-sm bg-stone-100"
                        />
                      )}
                      <div>
                        <h4 className="text-xs font-medium text-stone-900">{item.name}</h4>
                        <p className="text-xs text-stone-500 mt-0.5">${item.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-white space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-serif font-bold text-base">${subtotal}</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Shipping and taxes calculated during checkout.
                </p>
                <button
                  onClick={() => alert("Proceeding to secure checkout...")}
                  className="w-full py-3.5 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}