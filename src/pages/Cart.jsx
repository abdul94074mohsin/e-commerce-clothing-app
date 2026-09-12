import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, Tag } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQty,
    totalAmount
  } = useCart();

  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();

    if (coupon.trim().toUpperCase() === 'PURPLE10') {
      setDiscountPercent(0.10);
      setCouponApplied(true);
    } else {
      setDiscountPercent(0);
      setCouponApplied(false);
      alert("Invalid Coupon Code! Try using 'PURPLE10'");
    }
  };

  const finalDiscount = totalAmount * discountPercent;
  const finalPrice = totalAmount - finalDiscount;

  // WhatsApp Checkout
  const handleWhatsAppCheckout = () => {
    const phoneNumber = '919876543210';

    let message = `*NEW ORDER - PURPLE GALLERY*\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;

      if (item.size) {
        message += `   Size: ${item.size} | `;
      }

      if (item.color) {
        message += `Color: ${item.color} | `;
      }

      message += `Qty: ${item.qty} | Price: ₹${item.price * item.qty}\n\n`;
    });

    message += `*Subtotal:* ₹${totalAmount}\n`;

    if (couponApplied) {
      message += `*Coupon Discount (PURPLE10):* -₹${finalDiscount}\n`;
    }

    message += `*Final Payable Amount:* ₹${finalPrice}\n\n`;
    message += `Please confirm my order!`;

    const encodedUrl =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(encodedUrl, '_blank');
  };

  // ================= EMPTY CART =================
  if (cart.length === 0) {
    return (
      <div
        className="
          max-w-7xl mx-auto
          px-4
          pt-32 sm:pt-36
          pb-20
          text-center
        "
      >
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">
          Your Shopping Bag is Empty
        </h2>

        <p className="text-sm text-gray-500 mt-3">
          Looks like you haven't added anything to your bag yet.
        </p>

        <Link
          to="/shop"
          className="
            inline-block
            mt-6
            bg-purple-700
            text-white
            px-8 py-3
            rounded-xl
            font-bold
            uppercase
            text-xs
            tracking-widest
            hover:bg-purple-800
            transition-colors
          "
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // ================= CART PAGE =================
  return (
    <div
      className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        pt-32 sm:pt-36
        pb-16
      "
    >

      {/* PAGE HEADING */}
      <div className="mb-8">

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600 mb-2">
          Purple Gallery
        </p>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-slate-900">
          Shopping Bag
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Review your selected items before placing your order.
        </p>

      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="
                flex gap-4
                p-4
                bg-white
                rounded-2xl
                border border-gray-100
                shadow-sm
                hover:shadow-md
                transition-shadow
              "
            >

              {/* IMAGE */}
              <img
                src={item.images ? item.images[0] : item.image}
                alt={item.name}
                className="
                  w-24 h-32
                  sm:w-28 sm:h-36
                  object-cover
                  rounded-xl
                  bg-gray-100
                  shrink-0
                "
              />

              {/* INFO */}
              <div className="flex-1 flex flex-col justify-between min-w-0">

                <div>

                  <div className="flex justify-between items-start gap-3">

                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                      {item.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.size,
                          item.color
                        )
                      }
                      className="
                        text-gray-400
                        hover:text-red-600
                        transition-colors
                        shrink-0
                      "
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                  </div>

                  <p className="text-xs text-gray-500 mt-1">

                    {item.size && (
                      <>
                        Size:{' '}
                        <span className="font-semibold text-black">
                          {item.size}
                        </span>
                      </>
                    )}

                    {item.size && item.color && ' | '}

                    {item.color && (
                      <>
                        Color:{' '}
                        <span className="font-semibold text-black">
                          {item.color}
                        </span>
                      </>
                    )}

                  </p>

                </div>

                {/* QUANTITY + PRICE */}
                <div className="flex justify-between items-center mt-4 gap-3">

                  <div
                    className="
                      flex items-center
                      gap-3
                      border border-gray-200
                      rounded-lg
                      px-3 py-1.5
                    "
                  >

                    <button
                      type="button"
                      onClick={() =>
                        updateQty(
                          item.id,
                          item.size,
                          item.color,
                          -1
                        )
                      }
                      className="hover:text-purple-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="font-bold text-sm min-w-4 text-center">
                      {item.qty}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQty(
                          item.id,
                          item.size,
                          item.color,
                          1
                        )
                      }
                      className="hover:text-purple-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>

                  </div>

                  <span className="font-black text-lg text-slate-900">
                    ₹{item.price * item.qty}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* ORDER SUMMARY */}
        <div
          className="
            bg-white
            p-6
            rounded-2xl
            border border-gray-100
            shadow-sm
            h-fit
            space-y-4
          "
        >

          <h2 className="
            text-lg
            font-black
            uppercase
            tracking-wider
            border-b
            pb-3
            text-slate-900
          ">
            Order Summary
          </h2>

          {/* COUPON */}
          <form
            onSubmit={handleApplyCoupon}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Promo Code (PURPLE10)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="
                flex-1
                min-w-0
                bg-gray-50
                border border-gray-200
                text-xs
                font-bold
                rounded-xl
                px-3 py-2.5
                uppercase
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            />

            <button
              type="submit"
              className="
                bg-slate-900
                text-white
                text-xs
                font-bold
                px-4
                rounded-xl
                hover:bg-purple-700
                transition-colors
              "
            >
              Apply
            </button>
          </form>

          {couponApplied && (
            <p className="text-xs font-bold text-green-600 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Coupon Applied (10% OFF)
            </p>
          )}

          {/* SUBTOTAL */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="font-bold">
              ₹{totalAmount}
            </span>
          </div>

          {/* DISCOUNT */}
          {couponApplied && (
            <div className="flex justify-between text-sm text-green-600 font-bold">
              <span>Discount</span>
              <span>-₹{finalDiscount}</span>
            </div>
          )}

          {/* TOTAL */}
          <div className="
            flex justify-between
            text-lg
            font-black
            border-t
            pt-3
            text-slate-900
          ">
            <span>Total Payable</span>
            <span>₹{finalPrice}</span>
          </div>

          {/* WHATSAPP */}
          <button
            type="button"
            onClick={handleWhatsAppCheckout}
            className="
              w-full
              bg-green-600
              text-white
              py-4
              rounded-xl
              font-bold
              uppercase
              text-xs
              tracking-widest
              hover:bg-green-700
              transition-all
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
            "
          >
            <FaWhatsapp className="w-5 h-5" />
            Order via WhatsApp
          </button>

        </div>

      </div>

    </div>
  );
}