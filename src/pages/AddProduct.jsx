import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

export default function AddProduct() {
  const { addProduct } = useProducts();
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Jewellery',
    price: '',
    originalPrice: '',
    discount: '50% OFF',
    description: '',
    imageUrl: ''
  });

  // Agar admin login nahi hai to Login page par bhejo
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageUrl) {
      alert('Please fill Name, Price and Image URL!');
      return;
    }

    addProduct({
      name: formData.name,
      category: formData.category,
      price: formData.price,
      originalPrice: formData.originalPrice,
      discount: formData.discount,
      description: formData.description,
      images: [formData.imageUrl]
    });

    alert('Product Added Successfully!');

    navigate('/shop');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">

        {/* Heading */}
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          Add New Product
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Add a new product to your shop.
        </p>

        <form onSubmit={handleProductSubmit} className="space-y-4">

          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Product Title
            </label>

            <input
              type="text"
              required
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-900"
              placeholder="e.g. Kashmiri Charm Watch"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
            />
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Category
              </label>

              <select
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-900"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value
                  })
                }
              >
                <option value="Jewellery">Jewellery</option>
                <option value="Gifts">Gifts</option>
                <option value="Fancy Items">Fancy Items</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Price (₹)
              </label>

              <input
                type="number"
                required
                min="0"
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-900"
                placeholder="399"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value
                  })
                }
              />
            </div>

          </div>

          {/* Original Price */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Original Price (₹)
            </label>

            <input
              type="number"
              min="0"
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-900"
              placeholder="799"
              value={formData.originalPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  originalPrice: e.target.value
                })
              }
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Discount
            </label>

            <input
              type="text"
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-900"
              placeholder="50% OFF"
              value={formData.discount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discount: e.target.value
                })
              }
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              ImgBB Image Direct URL
            </label>

            <input
              type="url"
              required
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-900"
              placeholder="https://i.ibb.co/XXXX/image.jpg"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imageUrl: e.target.value
                })
              }
            />

            <p className="text-xs text-gray-400 mt-1">
              Paste the direct URL of the product image.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Description
            </label>

            <textarea
              rows="4"
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 resize-none"
              placeholder="Product ki detail..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value
                })
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-900 text-white font-bold py-3 rounded-xl hover:bg-purple-800 transition-colors uppercase text-sm tracking-wider"
          >
            Publish Product
          </button>

        </form>
      </div>
    </div>
  );
}