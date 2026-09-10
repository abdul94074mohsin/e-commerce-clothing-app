import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const trendingProducts = products.filter((p) => p.isTrending);

  return (
    <div className="space-y-12 pb-12 bg-slate-50">
      {/* Hero Banner with Purple Gallery Background */}
      <section className="relative h-[85vh] bg-black text-white flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80"
            alt="Purple Gallery Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-purple-950/40" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-purple-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg"
          >
            New Gallery Collection
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-tight drop-shadow-md"
          >
            CURIOSITIES FOR THE <span className="text-purple-400">DISCERNING</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-200 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed"
          >
            Explore a curated world of antique decor, artisanal gifts, unique stationery, and elegant artificial jewellery, handpicked for memory and meaning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <Link
              to="/shop"
              className="inline-block bg-purple-600 text-white font-black uppercase text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-purple-700 transition-all shadow-xl active:scale-95 border border-purple-400/30"
            >
              SHOP COLLECTION
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 mb-6 text-center">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Link to="/shop?category=Ladies Bags" className="relative h-64 rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80"
              alt="Ladies Bags"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center pb-6">
              <span className="text-white text-lg font-black uppercase tracking-widest border-b-2 border-purple-400 pb-1">
                LADIES BAGS
              </span>
            </div>
          </Link>

          <Link to="/shop?category=Home Decor" className="relative h-64 rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"
              alt="Home Decor"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center pb-6">
              <span className="text-white text-lg font-black uppercase tracking-widest border-b-2 border-purple-400 pb-1">
                HOME DECOR
              </span>
            </div>
          </Link>

          <Link to="/shop?category=Gifts %26 Antiques" className="relative h-64 rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
              alt="Gifts & Antiques"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center pb-6">
              <span className="text-white text-lg font-black uppercase tracking-widest border-b-2 border-purple-400 pb-1">
                GIFTS & ANTIQUES
              </span>
            </div>
          </Link>

          <Link to="/shop?category=Jewellery" className="relative h-64 rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
              alt="Jewellery"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center pb-6">
              <span className="text-white text-lg font-black uppercase tracking-widest border-b-2 border-purple-400 pb-1">
                JEWELLERY
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Trending Drops Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-slate-900">TRENDING DROPS</h2>
            <p className="text-slate-500 text-xs">Best-selling pieces of the week</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-purple-700 hover:underline tracking-wider uppercase">
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