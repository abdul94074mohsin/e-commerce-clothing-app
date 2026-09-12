import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, Check } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  // Always open product page from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : ''
  );

  const [selectedColor, setSelectedColor] = useState(
    product?.colors ? product.colors[0] : ''
  );

  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20 font-bold text-gray-600">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor);
    navigate('/cart');
  };

  return (
    <div className="w-full">

      {/* Product Details Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-10 w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">

          {/* Product Image */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-center h-[350px] sm:h-[420px] w-full">
            <img
              src={product.images ? product.images[0] : product.image}
              alt={product.name}
              className="h-full w-full object-contain rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-5">

            {/* Brand + Title */}
            <div>
              <span className="text-xs font-bold uppercase text-purple-700 tracking-wider">
                {product.brand || 'Purple Gallery'}
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1 leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-sm text-amber-500 font-bold flex-wrap">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />

                <span>
                  {product.rating || '5.0'}
                </span>

                <span className="text-gray-400 font-normal">
                  ({product.reviewsCount || 0} customer reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-black text-slate-900">
                ₹{product.price}
              </span>

              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}

              {product.discount && (
                <span className="text-sm font-bold text-green-600">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Extra Details */}
            {product.details && (
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <p className="text-xs font-semibold text-purple-900 leading-relaxed">
                  {product.details}
                </p>
              </div>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-800">
                  Select Size
                </label>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg text-sm font-bold border transition-all ${
                        selectedSize === size
                          ? 'bg-purple-900 text-white border-purple-900'
                          : 'border-gray-200 text-gray-800 hover:border-purple-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-800">
                  Select Color
                </label>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedColor === color
                          ? 'bg-purple-900 text-white border-purple-900'
                          : 'border-gray-200 text-gray-800 hover:border-purple-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add To Cart & Buy Buttons */}
            <div className="flex sm:flex-row flex-col gap-3 pt-4">

              {/* Add To Bag */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-slate-900 text-white py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-purple-800 transition-colors shadow-md text-sm"
              >
                {added ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <ShoppingBag className="w-5 h-5" />
                )}

                {added ? 'Added to Bag!' : 'Add to Bag'}
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 bg-purple-700 text-white py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider hover:bg-purple-900 transition-colors shadow-md text-sm"
              >
                Buy Now
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}