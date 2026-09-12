import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=90'
  },
  {
    image:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2000&q=90'
  },
  {
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90'
  }
];

export default function Home() {
  const trendingProducts = products.filter((p) => p.isTrending);

  const [currentSlide, setCurrentSlide] = useState(0);

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-pink-50">

      {/* ================= HERO SLIDER ================= */}
      <section className="relative h-[88vh] min-h-[650px] overflow-hidden">

        {/* Background Slides */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt="Purple Gallery Collection"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Dark / Purple Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r
          from-black/75 via-purple-950/45 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-t
          from-black/70 via-transparent to-purple-950/20" />

        {/* Decorative Glow */}
        <div className="absolute top-32 right-20
          w-72 h-72 rounded-full
          bg-fuchsia-500/20 blur-[100px]" />

        <div className="absolute bottom-10 left-20
          w-72 h-72 rounded-full
          bg-purple-600/20 blur-[100px]" />

        {/* ================= HERO CONTENT ================= */}
        <div className="relative z-10 max-w-7xl mx-auto
          h-full px-6 sm:px-10 lg:px-16
          flex items-center">

          <div className="max-w-2xl pt-12">

            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-gradient-to-r from-purple-600 to-pink-500
                text-white text-xs font-bold uppercase tracking-widest
                shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              New Collection
            </motion.div>

            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl
                font-black text-white leading-[0.95]
                drop-shadow-2xl"
            >
              Curiosities
              <br />
              For The
              <br />

              <span className="bg-gradient-to-r
                from-purple-300 via-fuchsia-300 to-pink-300
                bg-clip-text text-transparent">
                Discerning
              </span>
            </motion.h1>

            <motion.p
              key={`para-${currentSlide}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 max-w-xl text-sm sm:text-base
                text-white/85 leading-relaxed"
            >
              Explore a curated world of antique decor,
              artisanal gifts, unique stationery, and elegant
              artificial jewellery, handpicked for memory and meaning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <Link
                to="/shop"
                className="flex items-center gap-2
                  px-7 py-3.5 rounded-full
                  bg-gradient-to-r from-purple-600 to-fuchsia-500
                  text-white text-sm font-bold
                  shadow-xl shadow-purple-900/40
                  hover:scale-105 transition-transform"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/about"
                className="px-7 py-3.5 rounded-full
                  bg-white/10 backdrop-blur-md
                  border border-white/40
                  text-white text-sm font-bold
                  hover:bg-white hover:text-purple-900
                  transition-all"
              >
                Explore More
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ================= SLIDER ARROWS ================= */}
        <button
          onClick={previousSlide}
          className="absolute left-4 sm:left-7 top-1/2
            -translate-y-1/2 w-11 h-11 rounded-full
            bg-black/30 backdrop-blur-md
            border border-white/25
            text-white flex items-center justify-center
            hover:bg-purple-600 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-7 top-1/2
            -translate-y-1/2 w-11 h-11 rounded-full
            bg-black/30 backdrop-blur-md
            border border-white/25
            text-white flex items-center justify-center
            hover:bg-purple-600 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* ================= DOTS ================= */}
        <div className="absolute bottom-7 left-1/2
          -translate-x-1/2 flex items-center gap-2">

          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all rounded-full ${
                currentSlide === index
                  ? 'w-8 h-2 bg-purple-500'
                  : 'w-2 h-2 bg-white/70'
              }`}
            />
          ))}

        </div>

      </section>


      {/* ================= CATEGORY ================= */}
      <section className="relative max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8 py-20">

        <div className="text-center mb-10">

          <div className="flex items-center justify-center gap-2
            text-purple-600 text-xs font-black uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4" />
            Shop By Category
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl
            font-black text-slate-900">
            Discover{' '}
            <span className="bg-gradient-to-r
              from-purple-600 via-fuchsia-500 to-pink-500
              bg-clip-text text-transparent">
              Something Special
            </span>
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Explore our handpicked categories and find pieces
            that tell a story.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2
          lg:grid-cols-4 gap-5">

          <CategoryCard
            title="Ladies Bags"
            subtitle="Style for every occasion"
            image="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85"
            link="/shop?category=Ladies%20Bags"
          />

          <CategoryCard
            title="Home Decor"
            subtitle="Beautiful pieces for your space"
            image="https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=900&q=85"
            link="/shop?category=Home%20Decor"
          />

          <CategoryCard
            title="Gifts & Antiques"
            subtitle="Thoughtful pieces with meaning"
            image="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=85"
            link="/shop?category=Gifts%20%26%20Antiques"
          />

          <CategoryCard
            title="Jewellery"
            subtitle="Elegance in every detail"
            image="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85"
            link="/shop?category=Jewellery"
          />

        </div>
      </section>


      {/* ================= TRENDING ================= */}
      <section className="max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8 pb-20">

        <div className="flex items-end justify-between mb-7">

          <div>
            <div className="text-xs font-bold text-purple-600
              uppercase tracking-widest">
              ✦ Popular Right Now
            </div>

            <h2 className="mt-1 text-3xl font-black text-slate-900">
              Trending Drops
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Best-selling pieces of the week
            </p>
          </div>

          <Link
            to="/shop"
            className="flex items-center gap-1
              text-sm font-bold text-purple-700
              hover:text-pink-500 transition"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4
          gap-4 sm:gap-6">

          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>

    </div>
  );
}


/* ================= CATEGORY CARD ================= */

function CategoryCard({ title, subtitle, image, link }) {
  return (
    <Link
      to={link}
      className="group relative h-72 rounded-3xl
        overflow-hidden bg-white
        border border-purple-100
        shadow-[0_8px_30px_rgba(90,40,130,0.10)]
        hover:-translate-y-2
        transition-all duration-500"
    >

      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full
          object-cover
          group-hover:scale-110
          transition-transform duration-700"
      />

      <div className="absolute inset-0
        bg-gradient-to-t
        from-purple-950/90
        via-purple-900/20
        to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">

        <h3 className="text-xl font-black">
          {title}
        </h3>

        <p className="text-xs text-white/75 mt-1">
          {subtitle}
        </p>

        <div className="mt-4 w-9 h-9 rounded-full
          bg-white/15 backdrop-blur-md
          border border-white/40
          flex items-center justify-center
          group-hover:bg-purple-500
          transition-colors">

          <ArrowRight className="w-4 h-4" />

        </div>

      </div>
    </Link>
  );
}