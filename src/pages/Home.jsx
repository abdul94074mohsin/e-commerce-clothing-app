import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const trendingProducts = products.filter((p) => p.isTrending);

  return (
    <div className="space-y-12 pb-12 bg-gray-50">
      {/* Hero Banner with Stronger Dark Overlay */}
      <section className="relative h-[85vh] bg-black text-white flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-red-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
          >
            New Season Arrival
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none"
          >
            ELEVATE YOUR <span className="text-red-500">STYLE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base font-medium max-w-lg mx-auto"
          >
            Discover the finest collection of premium streetwear and casual apparel designed for comfort & attitude.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <Link
              to="/shop"
              className="inline-block bg-white text-black font-black uppercase text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95"
            >
              SHOP COLLECTION
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Banner (Working HD Image Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-black uppercase tracking-wider text-black mb-6 text-center">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/shop?category=Men" className="relative h-60 rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
              alt="Men Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-2xl font-black uppercase tracking-widest border-b-2 border-white pb-1">
                MEN COLLECTION
              </span>
            </div>
          </Link>

          <Link to="/shop?category=Women" className="relative h-60 rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Women Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-2xl font-black uppercase tracking-widest border-b-2 border-white pb-1">
                WOMEN COLLECTION
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Trending Drops Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-black">TRENDING DROPS</h2>
            <p className="text-gray-500 text-xs">Best-selling pieces of the week</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-red-600 hover:underline tracking-wider uppercase">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}