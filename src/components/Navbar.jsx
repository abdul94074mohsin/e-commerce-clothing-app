import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top Banner with Sky Blue Accent */}
      <div className="bg-sky-500 text-white text-[11px] sm:text-xs text-center py-1.5 font-bold tracking-wider">
        ⚡ FLAT 50% OFF ON NEW ARRIVALS | USE CODE: <span className="text-yellow-300 font-extrabold">MOHSIN50</span>
      </div>

      {/* Glassmorphism Navbar (Exact Image 2 Style) */}
      <nav className="py-3.5 backdrop-blur-md bg-sky-200/20 border-b border-sky-300/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <Link to="/" className="text-2xl font-black tracking-widest uppercase text-slate-900 drop-shadow-sm">
              MOHSIN<span className="text-red-600">.</span>FIT
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 font-black text-xs uppercase tracking-widest text-slate-900">
              <Link to="/" className="hover:text-blue-700 transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-blue-700 transition-colors">Shop All</Link>
              <Link to="/shop?category=Men" className="hover:text-blue-700 transition-colors">Men</Link>
              <Link to="/shop?category=Women" className="hover:text-blue-700 transition-colors">Women</Link>
              <Link to="/about" className="hover:text-blue-700 transition-colors">About</Link>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xs relative">
              <input
                type="text"
                placeholder="Search streetwear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-md border border-sky-200/80 text-xs font-semibold rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white/90 transition-all text-slate-900 placeholder-slate-600"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-slate-700 hover:text-black">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="text-slate-900 hover:text-blue-700 p-1.5 rounded-full hover:bg-sky-200/40 transition-colors">
                <User className="w-5 h-5" />
              </button>

              <Link to="/cart" className="relative text-slate-900 hover:text-blue-700 p-1.5 rounded-full hover:bg-sky-200/40 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-md">
                    {totalCount}
                  </span>
                )}
              </Link>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="md:hidden text-slate-900 p-1.5"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-sky-100/95 backdrop-blur-2xl border-b border-sky-200 px-6 pt-4 pb-6 space-y-4 font-black text-xs uppercase tracking-wider text-slate-900 mt-2 shadow-2xl">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Shop All</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">About Us</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">Contact</Link>
          </div>
        )}
      </nav>
    </header>
  );
}