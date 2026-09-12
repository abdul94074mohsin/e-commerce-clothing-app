import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { productsList } = useProducts();

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const categories = [
    'All',
    'Home Decor',
    'Gifts & Antiques',
    'Jewellery',
    'Home Utilities',
    'Ladies Bags'
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || 'All'
  );

  useEffect(() => {
    setSelectedCategory(categoryParam || 'All');
  }, [categoryParam]);

  const filteredProducts = productsList.filter((product) => {
    if (
      selectedCategory !== 'All' &&
      product.category !== selectedCategory
    ) {
      return false;
    }

    if (
      searchQuery &&
      !product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16">

      {/* Heading */}
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-600 mb-2">
          Purple Gallery
        </p>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-slate-900">
          Shop Collection
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Discover our latest collection and handpicked products.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-5 py-2.5
              rounded-full
              text-sm font-bold
              whitespace-nowrap
              transition-all
              ${
                selectedCategory === category
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-700'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-black text-slate-800">
            No Products Found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Try another category or search.
          </p>
        </div>
      )}
    </div>
  );
}