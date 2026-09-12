import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  PlusCircle,
  LogIn,
  LogOut,
  User,
  Menu,
  X,
  ShoppingBag
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-5">
      <div className="max-w-7xl mx-auto">

        {/* ================= MAIN NAVBAR ================= */}
        <div
          className="
            h-14 sm:h-16
            flex items-center justify-between
            px-3 sm:px-5
            rounded-2xl
            bg-white/55
            backdrop-blur-xl
            border border-white/70
            shadow-lg shadow-purple-900/10
          "
        >

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-1.5 sm:gap-2 shrink-0"
          >
            {/* PG HEART LOGO */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">

              <div
                className="
                  absolute
                  w-7 h-7 sm:w-8 sm:h-8
                  rotate-45
                  rounded-[7px]
                  bg-purple-800
                  border border-yellow-400
                  shadow-sm
                "
              />

              <div
                className="
                  relative z-10
                  w-7 h-7 sm:w-8 sm:h-8
                  rounded-full
                  bg-purple-950
                  border-2 border-yellow-400
                  flex items-center justify-center
                "
              >
                <span className="text-[9px] sm:text-[10px] font-black text-yellow-300">
                  PG
                </span>
              </div>
            </div>

            {/* BRAND NAME */}
            <div className="leading-none">
              <div className="text-base sm:text-xl font-black tracking-tight text-purple-950">
                Purple <span className="text-purple-700">Gallery</span>
              </div>

              <div className="text-[6px] sm:text-[7px] text-yellow-700 font-semibold text-center mt-1">
                The Antique Shop
              </div>
            </div>
          </Link>


          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">

            <Link
              to="/"
              className="text-sm font-semibold text-purple-700 hover:text-fuchsia-600 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="text-sm font-semibold text-gray-700 hover:text-purple-700 transition-colors"
            >
              Shop
            </Link>

            <Link
              to="/about"
              className="text-sm font-semibold text-gray-700 hover:text-purple-700 transition-colors"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-sm font-semibold text-gray-700 hover:text-purple-700 transition-colors"
            >
              Contact
            </Link>

          </nav>


          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="hidden lg:flex items-center gap-2">

            {/* CART */}
            <Link
              to="/cart"
              className="
                relative
                w-9 h-9
                rounded-full
                bg-white/40
                backdrop-blur-md
                border border-white/70
                flex items-center justify-center
                text-purple-950
                hover:bg-white/70
                transition
              "
            >
              <ShoppingBag className="w-4.5 h-4.5" />

              <span
                className="
                  absolute -top-1 -right-1
                  w-4 h-4
                  rounded-full
                  bg-pink-500
                  text-white
                  text-[8px]
                  flex items-center justify-center
                  font-bold
                "
              >
                0
              </span>
            </Link>


            {/* ADMIN ADD PRODUCT */}
            {isAdmin && (
              <Link
                to="/admin/add-product"
                className="
                  flex items-center gap-1.5
                  bg-gradient-to-r from-purple-600 to-fuchsia-600
                  text-white
                  px-3.5 py-2
                  rounded-full
                  text-xs
                  font-bold
                  shadow-md shadow-purple-500/20
                  hover:scale-[1.03]
                  transition-transform
                "
              >
                <PlusCircle className="w-4 h-4" />
                Add Product
              </Link>
            )}


            {/* LOGGED IN USER */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 ml-1">

                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-950">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="
                    p-2
                    rounded-full
                    text-gray-500
                    hover:text-red-600
                    hover:bg-white/60
                    transition
                  "
                  title="Logout"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>

              </div>
            ) : (
              <Link
                to="/login"
                className="
                  flex items-center gap-1.5
                  bg-white/40
                  backdrop-blur-md
                  border border-purple-300/70
                  text-purple-800
                  px-3.5 py-2
                  rounded-full
                  text-xs
                  font-bold
                  hover:bg-purple-700
                  hover:text-white
                  transition
                "
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}

          </div>


          {/* ================= MOBILE ACTIONS ================= */}
          <div className="flex lg:hidden items-center gap-1.5">

            {/* MOBILE CART */}
            <Link
              to="/cart"
              onClick={closeMenu}
              className="
                relative
                w-9 h-9
                rounded-xl
                bg-white/40
                backdrop-blur-md
                border border-white/70
                flex items-center justify-center
                text-purple-950
                shadow-sm
              "
            >
              <ShoppingBag className="w-4.5 h-4.5" />

              <span
                className="
                  absolute -top-1 -right-1
                  w-4 h-4
                  rounded-full
                  bg-pink-500
                  text-white
                  text-[8px]
                  flex items-center justify-center
                  font-bold
                "
              >
                0
              </span>
            </Link>


            {/* MOBILE HAMBURGER - LIGHT GLASS */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="
                w-9 h-9
                rounded-xl
                bg-white/45
                backdrop-blur-md
                border border-white/80
                text-purple-950
                flex items-center justify-center
                shadow-sm
                hover:bg-white/70
                active:scale-95
                transition-all
                cursor-pointer
              "
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div
            className="
              lg:hidden
              mt-2
              rounded-2xl
              bg-white/80
              backdrop-blur-2xl
              border border-white/80
              shadow-xl shadow-purple-900/10
              overflow-hidden
            "
          >

            <nav className="p-2.5">

              {/* HOME */}
              <Link
                to="/"
                onClick={closeMenu}
                className="
                  block
                  px-4 py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-purple-950
                  hover:bg-purple-100/60
                  transition
                "
              >
                Home
              </Link>


              {/* SHOP */}
              <Link
                to="/shop"
                onClick={closeMenu}
                className="
                  block
                  px-4 py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-gray-700
                  hover:bg-purple-100/60
                  transition
                "
              >
                Shop
              </Link>


              {/* ABOUT */}
              <Link
                to="/about"
                onClick={closeMenu}
                className="
                  block
                  px-4 py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-gray-700
                  hover:bg-purple-100/60
                  transition
                "
              >
                About
              </Link>


              {/* CONTACT */}
              <Link
                to="/contact"
                onClick={closeMenu}
                className="
                  block
                  px-4 py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-gray-700
                  hover:bg-purple-100/60
                  transition
                "
              >
                Contact
              </Link>


              {/* ADMIN */}
              {isAdmin && (
                <Link
                  to="/admin/add-product"
                  onClick={closeMenu}
                  className="
                    mt-2
                    flex items-center gap-2
                    px-4 py-3
                    rounded-xl
                    bg-gradient-to-r from-purple-600 to-fuchsia-600
                    text-white
                    text-sm
                    font-bold
                  "
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Product
                </Link>
              )}


              {/* LOGIN */}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="
                    mt-2
                    flex items-center gap-2
                    px-4 py-3
                    rounded-xl
                    bg-white/60
                    border border-purple-300
                    text-purple-800
                    text-sm
                    font-bold
                  "
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
              )}


              {/* LOGOUT */}
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="
                    mt-2
                    w-full
                    flex items-center gap-2
                    px-4 py-3
                    rounded-xl
                    text-red-600
                    hover:bg-red-50
                    text-sm
                    font-bold
                    text-left
                  "
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              )}

            </nav>
          </div>
        )}

      </div>
    </header>
  );
}