import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import Products from "./components/Products";
import About from "./components/About";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add product to cart
  const handleAddToCart = (product) => {
    const productToAdd = product || {
      id: Date.now(),
      name: "Structured Wool Blazer",
      price: 280,
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
      ],
    };

    setCartItems((prev) => {
      const exists = prev.some(
        (item) => item.id === productToAdd.id
      );

      if (exists) {
        return prev;
      }

      return [...prev, productToAdd];
    });

    // Open cart after adding product
    setIsCartOpen(true);
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-800 font-sans antialiased flex flex-col">

      {/* Navbar */}
      <Navbar
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Website */}
      <main className="flex-grow">

        {/* Hero Section */}
        <Hero />

        {/* Collections Section */}
        <Collections />

        {/* Products Section */}
        <Products onAddToCart={handleAddToCart} />

        {/* About Section */}
        <About />

      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />

    </div>
  );
}