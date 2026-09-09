import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-gray-100 aspect-[3/4]">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            {product.discount}
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
          {product.brand}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 text-sm line-clamp-1 mt-1 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2 text-xs text-amber-500 font-medium">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-gray-400">({product.reviewsCount})</span>
        </div>

        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-black">₹{product.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>
      </div>
    </motion.div>
  );
}