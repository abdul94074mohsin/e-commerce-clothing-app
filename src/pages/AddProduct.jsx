import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  // Yahan apna secret password set kar do
  const SECRET_PASSWORD = "OwnerAdmin123"; 

  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Jewellery',
    price: '',
    originalPrice: '',
    discount: '50% OFF',
    description: '',
    imageUrl: ''
  });

  // Password Verify Logic
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === SECRET_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Wrong Admin Password!');
      setPasswordInput('');
    }
  };

  // Product Submit Logic
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

  // Step A: Agar password verify nahi hua, toh Password Form dikhao
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Owner Access</h2>
          <p className="text-xs text-gray-500 mb-6">Enter Admin Password to continue</p>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input 
              type="password"
              required
              placeholder="Enter Admin Password"
              className="w-full border p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-900"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button 
              type="submit"
              className="w-full bg-purple-900 text-white font-bold py-3 rounded-xl hover:bg-purple-800 transition-colors text-sm"
            >
              Unlock Form
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Step B: Password sahi hone par ye Form open hoga
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Add New Product (Admin)</h2>

        <form onSubmit={handleProductSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Product Title</label>
            <input 
              type="text" 
              required
              className="w-full border p-2.5 rounded-lg text-sm"
              placeholder="e.g. Kashmiri Charm Watch"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Category</label>
              <select 
                className="w-full border p-2.5 rounded-lg text-sm"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Jewellery">Jewellery</option>
                <option value="Gifts">Gifts</option>
                <option value="Fancy Items">Fancy Items</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Price (₹)</label>
              <input 
                type="number" 
                required
                className="w-full border p-2.5 rounded-lg text-sm"
                placeholder="399"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">ImgBB Image Direct URL</label>
            <input 
              type="url" 
              required
              className="w-full border p-2.5 rounded-lg text-sm"
              placeholder="https://i.ibb.co/XXXX/image.jpg"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Description</label>
            <textarea 
              rows="3"
              className="w-full border p-2.5 rounded-lg text-sm"
              placeholder="Product ki detail..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

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