import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, Check } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [added, setAdded] = useState(false);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Product Image */}
        <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[3/4]">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase text-red-600 tracking-wider">{product.brand}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{product.name}</h1>
            
            <div className="flex items-center gap-2 mt-3 text-sm text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black">₹{product.price}</span>
            <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
            <span className="text-sm font-bold text-green-600">{product.discount}</span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {/* Size Options */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Select Size</label>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg text-sm font-bold border ${
                    selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-800 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Select Color</label>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border ${
                    selectedColor === color ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-800'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Add To Cart & Buy Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
            >
              {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
              {added ? 'Added to Cart!' : 'Add to Bag'}
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}
              className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-black transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}