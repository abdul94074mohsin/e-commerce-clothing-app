import React from 'react';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Heart,
  ArrowRight,
  Star
} from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

export default function About() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">

      {/* ================= HERO / INTRO ================= */}
      {/* Extra top padding added so fixed navbar never overlaps content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            <span
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-purple-100
                text-purple-700
                text-xs sm:text-sm
                font-bold
                uppercase
                tracking-widest
              "
            >
              <Sparkles className="w-4 h-4" />
              Welcome to Purple Gallery
            </span>

            <h1
              className="
                text-4xl sm:text-5xl lg:text-6xl
                font-black
                leading-[1.05]
                tracking-tight
                text-slate-900
              "
            >
              Beautiful Things
              <br />
              <span className="text-purple-600">
                For Every Moment
              </span>
            </h1>

            <p
              className="
                text-gray-600
                text-sm sm:text-base lg:text-lg
                leading-relaxed
                max-w-xl
              "
            >
              Purple Gallery is your destination for stylish lifestyle
              products, beautiful gifts, artificial jewellery, home decor
              and useful everyday essentials — carefully selected to add
              something special to your life.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">

              <Link
                to="/shop"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3.5
                  rounded-full
                  bg-purple-700
                  text-white
                  text-sm font-bold
                  shadow-lg shadow-purple-500/20
                  hover:bg-purple-800
                  hover:scale-[1.02]
                  transition-all
                "
              >
                Explore Our Shop
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3.5
                  rounded-full
                  bg-white
                  border border-purple-200
                  text-purple-700
                  text-sm font-bold
                  hover:bg-purple-50
                  transition-all
                "
              >
                Contact Us
              </Link>

            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-6 pt-5">

              <div>
                <p className="text-2xl font-black text-slate-900">
                  {products.length}+
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  Products
                </p>
              </div>

              <div className="h-10 w-px bg-gray-200" />

              <div>
                <p className="text-2xl font-black text-slate-900">
                  100%
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  Customer Focus
                </p>
              </div>

              <div className="h-10 w-px bg-gray-200" />

              <div>
                <p className="text-2xl font-black text-slate-900">
                  Easy
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  WhatsApp Ordering
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT PRODUCT VISUAL */}
          <div className="relative">

            <div
              className="
                absolute
                -top-8
                -right-8
                w-40 h-40
                bg-purple-200/50
                rounded-full
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-8
                -left-8
                w-40 h-40
                bg-pink-200/50
                rounded-full
                blur-3xl
              "
            />

            <div
              className="
                relative
                rounded-[2rem]
                bg-white/70
                backdrop-blur-xl
                border border-white
                shadow-2xl
                shadow-purple-900/10
                p-4 sm:p-6
              "
            >

              <div className="grid grid-cols-2 gap-3 sm:gap-4">

                {featuredProducts.slice(0, 4).map((product, index) => (

                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      bg-gray-50
                      ${index === 0 ? 'row-span-2' : ''}
                    `}
                  >

                    <img
                      src={product.images?.[0] || product.image}
                      alt={product.name}
                      className="
                        w-full
                        h-full
                        min-h-[150px]
                        sm:min-h-[190px]
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />

                    <div
                      className="
                        absolute inset-x-0 bottom-0
                        p-3
                        bg-gradient-to-t
                        from-black/70
                        to-transparent
                        pt-10
                      "
                    >
                      <p
                        className="
                          text-white
                          text-xs
                          sm:text-sm
                          font-bold
                          line-clamp-2
                        "
                      >
                        {product.name}
                      </p>
                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHO WE ARE ================= */}
      <section className="bg-white py-14 sm:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-10">

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-purple-600
              "
            >
              Our Story
            </span>

            <h2
              className="
                mt-2
                text-3xl sm:text-4xl
                font-black
                text-slate-900
              "
            >
              More Than Just A Shop
            </h2>

            <p
              className="
                mt-4
                text-gray-600
                text-sm sm:text-base
                leading-relaxed
              "
            >
              At Purple Gallery, we bring together products that combine
              style, usefulness and affordability. From gifts and jewellery
              to home decor and everyday essentials, our collection is
              selected with our customers in mind.
            </p>

          </div>


          {/* BENEFIT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            <div
              className="
                group
                rounded-3xl
                bg-purple-50
                border border-purple-100
                p-6
                text-center
                hover:-translate-y-1
                transition-transform
                duration-300
              "
            >
              <div
                className="
                  w-12 h-12
                  mx-auto
                  rounded-2xl
                  bg-purple-700
                  text-white
                  flex items-center justify-center
                  shadow-lg shadow-purple-500/20
                "
              >
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="mt-4 font-black text-slate-900">
                Carefully Selected
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Products selected with quality, style and usefulness in mind.
              </p>
            </div>


            <div
              className="
                group
                rounded-3xl
                bg-pink-50
                border border-pink-100
                p-6
                text-center
                hover:-translate-y-1
                transition-transform
                duration-300
              "
            >
              <div
                className="
                  w-12 h-12
                  mx-auto
                  rounded-2xl
                  bg-pink-600
                  text-white
                  flex items-center justify-center
                  shadow-lg shadow-pink-500/20
                "
              >
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="mt-4 font-black text-slate-900">
                Simple Ordering
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Easy shopping experience with convenient WhatsApp ordering.
              </p>
            </div>


            <div
              className="
                group
                rounded-3xl
                bg-indigo-50
                border border-indigo-100
                p-6
                text-center
                hover:-translate-y-1
                transition-transform
                duration-300
              "
            >
              <div
                className="
                  w-12 h-12
                  mx-auto
                  rounded-2xl
                  bg-indigo-700
                  text-white
                  flex items-center justify-center
                  shadow-lg shadow-indigo-500/20
                "
              >
                <Heart className="w-6 h-6" />
              </div>

              <h3 className="mt-4 font-black text-slate-900">
                Customer First
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                We focus on creating a smooth and enjoyable shopping journey.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}
      <section className="py-14 sm:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-end
              sm:justify-between
              gap-4
              mb-8
            "
          >

            <div>

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-purple-600
                "
              >
                From Our Collection
              </span>

              <h2
                className="
                  mt-2
                  text-3xl sm:text-4xl
                  font-black
                  text-slate-900
                "
              >
                What We Sell
              </h2>

            </div>

            <Link
              to="/shop"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-purple-700
                hover:text-purple-900
                transition
              "
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>


          {/* PRODUCT CARDS */}
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-6
              gap-3
              sm:gap-5
            "
          >

            {featuredProducts.map((product) => (

              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="
                  group
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border border-gray-100
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >

                <div className="aspect-square bg-gray-50 overflow-hidden">

                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="
                      w-full
                      h-full
                      object-contain
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />

                </div>

                <div className="p-3">

                  <h3
                    className="
                      text-xs
                      sm:text-sm
                      font-bold
                      text-slate-900
                      line-clamp-2
                      min-h-[32px]
                    "
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-2">

                    <Star
                      className="
                        w-3.5 h-3.5
                        fill-amber-400
                        text-amber-400
                      "
                    />

                    <span className="text-[11px] font-bold text-gray-500">
                      {product.rating || '5.0'}
                    </span>

                  </div>

                  <div className="mt-2">

                    <span
                      className="
                        text-sm
                        sm:text-base
                        font-black
                        text-purple-700
                      "
                    >
                      ₹{product.price}
                    </span>

                    {product.originalPrice && (
                      <span
                        className="
                          ml-1
                          text-[10px]
                          text-gray-400
                          line-through
                        "
                      >
                        ₹{product.originalPrice}
                      </span>
                    )}

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">

        <div
          className="
            max-w-7xl
            mx-auto
            rounded-[2rem]
            bg-gradient-to-r
            from-purple-700
            via-purple-600
            to-fuchsia-600
            text-white
            p-8
            sm:p-12
            text-center
            shadow-2xl
            shadow-purple-500/20
          "
        >

          <ShoppingBag className="w-9 h-9 mx-auto mb-4 opacity-90" />

          <h2 className="text-2xl sm:text-4xl font-black">
            Find Something You Love
          </h2>

          <p
            className="
              mt-3
              text-purple-100
              text-sm sm:text-base
              max-w-xl
              mx-auto
            "
          >
            Explore our collection of gifts, jewellery, decor and lifestyle
            products.
          </p>

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-7
              py-3.5
              rounded-full
              bg-white
              text-purple-700
              text-sm
              font-black
              hover:scale-105
              transition-transform
            "
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </section>

    </div>
  );
}