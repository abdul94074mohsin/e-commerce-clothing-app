import React from 'react';
import { ShoppingBag, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Main Main Card Wrapper */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Section with Gradient Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 opacity-10">
            <ShoppingBag size={200} />
          </div>
          <span className="inline-block bg-purple-500/20 text-purple-200 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-purple-400/30">
            Premium Lifestyle Brand
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider mb-4">
            About <span className="text-purple-400">PURPLE GALLERY</span>
          </h1>
          <p className="text-purple-100 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Your ultimate destination for trendy fashion, artificial jewellery, aesthetic home decor, and modern lifestyle products.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Mission Text */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">Who We Are</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              At **PURPLE GALLERY**, we believe in bringing luxury and everyday elegance to your doorstep. From handpicked designer bags and exquisite artificial jewellery to home utility essentials, we curate high-grade products designed for trendsetters.
            </p>
          </div>

          {/* Highlights Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-center space-y-2">
              <div className="w-10 h-10 bg-purple-700 text-white rounded-xl flex items-center justify-center mx-auto shadow-md">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm uppercase">Curated Quality</h3>
              <p className="text-xs text-gray-500">Every product is handpicked with premium aesthetic standards.</p>
            </div>

            <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-center space-y-2">
              <div className="w-10 h-10 bg-purple-700 text-white rounded-xl flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm uppercase">Easy Ordering</h3>
              <p className="text-xs text-gray-500">Direct order processing via WhatsApp for fast support.</p>
            </div>

            <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-center space-y-2">
              <div className="w-10 h-10 bg-purple-700 text-white rounded-xl flex items-center justify-center mx-auto shadow-md">
                <Heart size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm uppercase">Customer First</h3>
              <p className="text-xs text-gray-500">Dedicated to delivering total satisfaction and value.</p>
            </div>
          </div>

          {/* Footer Quote Card */}
          <div className="border-t border-gray-100 pt-6 text-center">
            <p className="text-xs uppercase font-bold text-purple-700 tracking-widest">
              Crafted with passion for every style lover
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}