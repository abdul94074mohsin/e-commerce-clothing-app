import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Check,
  MessageCircle
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { productsList } = useProducts();

  // Owner WhatsApp number
  const whatsappNumber = '917000275661';

  // Get current product
  const product = productsList.find(
    (p) => p.id === parseInt(id)
  );

  // Related products
  const relatedProducts = product
    ? productsList
        .filter(
          (p) =>
            p.category === product.category &&
            p.id !== product.id
        )
        .slice(0, 4)
    : [];

  // Open product page from top
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

  // Update size/color when product changes
  useEffect(() => {
    setSelectedSize(
      product?.sizes ? product.sizes[0] : ''
    );

    setSelectedColor(
      product?.colors ? product.colors[0] : ''
    );

    setAdded(false);
  }, [id, product]);

  if (!product) {
    return (
      <div className="text-center pt-32 pb-20 font-bold text-gray-600">
        Product not found.
      </div>
    );
  }

  // Add to cart
  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  // Buy now
  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor);
    navigate('/cart');
  };

  // Order directly on WhatsApp
  const handleWhatsAppOrder = () => {
    const message = `
Hello Purple Gallery,

I want to order this product:

Product: ${product.name}
Price: ₹${product.price}
${selectedSize ? `Size: ${selectedSize}` : ''}
${selectedColor ? `Color: ${selectedColor}` : ''}

Please confirm the availability and order details.

Thank you.
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full">

      {/* ================= PRODUCT DETAILS ================= */}
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

            {/* WhatsApp Order */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full bg-green-600 text-white py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </button>

          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">

          {/* Section Heading */}
          <div className="flex items-end justify-between mb-7">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-600 mb-2">
                Explore More
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-wide">
                You May Also Like
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                More products from our {product.category} collection.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/shop?category=${encodeURIComponent(
                    product.category
                  )}`
                )
              }
              className="hidden sm:block text-sm font-bold text-purple-700 hover:text-purple-900 transition-colors"
            >
              View All →
            </button>

          </div>

          {/* Related Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}

          </div>

          {/* Mobile View All */}
          <button
            type="button"
            onClick={() =>
              navigate(
                `/shop?category=${encodeURIComponent(
                  product.category
                )}`
              )
            }
            className="sm:hidden w-full mt-7 border border-purple-200 text-purple-700 py-3 rounded-xl font-bold text-sm hover:bg-purple-50 transition-colors"
          >
            View All {product.category}
          </button>

        </section>
      )}

    </div>
  );
}