import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Toast Trigger Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add to Cart
  const addToCart = (product, size, color) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].qty += 1;
        return updated;
      }
      return [...prevCart, { ...product, size, color, qty: 1 }];
    });
    showToast(`Added ${product.name} to bag!`);
  };

  // Remove Item
  const removeFromCart = (id, size, color) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.color === color)));
    showToast("Item removed from bag");
  };

  // Update Qty
  const updateQty = (id, size, color, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size && item.color === color) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, totalAmount, totalCount }}>
      {children}
      {/* Toast Alert UI */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-sky-400 animate-bounce">
          <span>⚡</span> {toastMessage}
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);