import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, Tag } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalAmount } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Apply Coupon Logic
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'MOHSIN50') {
      setDiscountPercent(0.5); // 50% Off
      setCouponApplied(true);
    } else {
      alert("Invalid Coupon Code! Try using 'MOHSIN50'");
    }
  };

  const finalDiscount = totalAmount * discountPercent;
  const finalPrice = totalAmount - finalDiscount;

  // WhatsApp Checkout Handler with Applied Discount
  const handleWhatsAppCheckout = () => {
    const phoneNumber = "919876543210";

    let message = `*NEW ORDER - MOHSIN.FIT*\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   Size: ${item.size} | Color: ${item.color} | Qty: ${item.qty} | Price: ₹${item.price * item.qty}\n\n`;
    });
    message += `*Subtotal:* ₹${totalAmount}\n`;
    if (couponApplied) {
      message += `*Coupon Discount (MOHSIN50):* -₹${finalDiscount}\n`;
    }
    message += `*Final Payable Amount:* ₹${finalPrice}\n\nPlease confirm my order!`;

    const encodedUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(encodedUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black uppercase text-gray-900">Your Shopping Bag is Empty</h2>
        <Link to="/shop" className="inline-block bg-black text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-sky-600 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black uppercase tracking-wider mb-8">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <img src={item.images[0]} alt={item.name} className="w-24 h-32 object-cover rounded-xl bg-gray-100" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-gray-400 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Size: <span className="font-semibold text-black">{item.size}</span> | Color: <span className="font-semibold text-black">{item.color}</span></p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-1">
                    <button onClick={() => updateQty(item.id, item.size, item.color, -1)}><Minus className="w-3.5 h-3.5" /></button>
                    <span className="font-bold text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.size, item.color, 1)}><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <span className="font-black text-lg text-black">₹{item.price * item.qty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary + Coupon Field */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit space-y-4">
          <h2 className="text-lg font-black uppercase tracking-wider border-b pb-3">Order Summary</h2>

          {/* Promo Code Input */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Promo Code (MOHSIN50)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 text-xs font-bold rounded-xl px-3 py-2 uppercase focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button type="submit" className="bg-black text-white text-xs font-bold px-4 rounded-xl hover:bg-sky-600">
              Apply
            </button>
          </form>

          {couponApplied && (
            <p className="text-xs font-bold text-green-600 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Coupon Applied (50% OFF)
            </p>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold">₹{totalAmount}</span>
          </div>

          {couponApplied && (
            <div className="flex justify-between text-sm text-green-600 font-bold">
              <span>Discount</span>
              <span>-₹{finalDiscount}</span>
            </div>
          )}

          <div className="flex justify-between text-lg font-black border-t pt-3">
            <span>Total Payable</span>
            <span>₹{finalPrice}</span>
          </div>

          <button onClick={handleWhatsAppCheckout} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
            <FaWhatsapp className="w-5 h-5" /> Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}