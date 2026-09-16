import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalCount } = useCart();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg rounded-2xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="/purple.jpg"
              alt="Purple Gallery"
              className="w-10 h-10 rounded-full object-cover"
            />

            <span className="font-bold text-gray-900 hidden sm:block">
              Purple Gallery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Shop
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-purple-600"
            >
              <ShoppingCart size={21} />

              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] min-w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Admin Dashboard */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
              >
                <LayoutDashboard size={17} />
                Admin
              </Link>
            )}

            {/* Logged In User */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User size={17} />
                  <span>{user?.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut size={19} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl bg-gray-900 text-white hover:bg-purple-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">

            <div className="flex flex-col gap-2">

              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Shop
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Contact
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Cart {totalCount > 0 && `(${totalCount})`}
              </Link>

              {/* Only Admin sees Admin */}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white"
                >
                  <LayoutDashboard size={17} />
                  Admin Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-left text-red-600"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-gray-900 text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}