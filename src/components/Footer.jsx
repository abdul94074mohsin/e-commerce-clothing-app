import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaFacebook, FaCreditCard } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-white text-2xl font-black uppercase tracking-wider mb-4">
            PURPLE<span className="text-purple-600">.</span>GALLERY
          </h2>
          <p className="text-sm leading-relaxed">
            Exclusive collection of gifts, home decor, fancy items & artificial jewellery in Burhanpur. Quality guaranteed.
          </p>
          <div className="flex gap-4 mt-6 text-xl text-white">
            <a href="#" className="hover:text-purple-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-green-500 transition-colors"><FaWhatsapp /></a>
            <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebook /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-white">Shop All</Link></li>
            <li><Link to="/shop?category=Gifts" className="hover:text-white">Gifts Collection</Link></li>
            <li><Link to="/shop?category=Jewellery" className="hover:text-white">Jewellery Collection</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Newsletter</h3>
          <p className="text-sm mb-3">Subscribe for new arrival updates and special offers.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-gray-900 border border-gray-800 text-white text-sm rounded-l px-3 py-2 w-full focus:outline-none focus:border-purple-600"
            />
            <button className="bg-purple-600 text-white font-medium text-sm px-4 rounded-r hover:bg-purple-700 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 py-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4">
        <p>© 2026 PURPLE GALLERY. All rights reserved.</p>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-gray-400 text-base">
          <span>100% Safe Checkout</span>
          <FaCreditCard className="ml-2" />
        </div>
      </div>
    </footer>
  );
}