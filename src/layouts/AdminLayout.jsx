import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Boxes,
  ShoppingBag,
  Users,
  Tags,
  TicketPercent,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Store
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
    }`;

  const closeMobileSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-purple-100">
            <img
              src="/purple.jpg"
              alt="Purple Gallery"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="font-semibold text-gray-900">
            Purple Gallery
          </span>
        </div>

        <div className="w-10" />
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeMobileSidebar}
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-white
          border-r border-gray-200
          shadow-xl lg:shadow-none
          flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-100">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-purple-100 shadow-sm">
              <img
                src="/purple.jpg"
                alt="Purple Gallery"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="font-bold text-gray-900">
                Purple Gallery
              </h1>

              <p className="text-xs text-gray-400">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={closeMobileSidebar}
            className="lg:hidden w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">

          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Overview
          </p>

          <NavLink
            to="/admin"
            end
            className={navItemClass}
            onClick={closeMobileSidebar}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          {/* Products */}
          <div className="mt-2">

            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-all"
            >
              <span className="flex items-center gap-3">
                <Package size={19} />
                Products
              </span>

              <ChevronDown
                size={17}
                className={`transition-transform ${
                  productsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {productsOpen && (
              <div className="ml-5 mt-1 pl-5 border-l border-gray-200 space-y-1">

                <NavLink
                  to="/admin/products"
                  end
                  className={navItemClass}
                  onClick={closeMobileSidebar}
                >
                  <Package size={17} />
                  Manage Products
                </NavLink>

                <NavLink
                  to="/admin/products/add"
                  className={navItemClass}
                  onClick={closeMobileSidebar}
                >
                  <PlusCircle size={17} />
                  Add Product
                </NavLink>

              </div>
            )}
          </div>

          <p className="px-3 mt-7 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Store Management
          </p>

          <div className="space-y-1">

            <NavLink
              to="/admin/inventory"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <Boxes size={19} />
              Inventory / Stock
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <ShoppingBag size={19} />
              Orders
            </NavLink>

            <NavLink
              to="/admin/customers"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <Users size={19} />
              Customers
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <Tags size={19} />
              Categories
            </NavLink>

            <NavLink
              to="/admin/coupons"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <TicketPercent size={19} />
              Coupons
            </NavLink>

          </div>

          <p className="px-3 mt-7 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            System
          </p>

          <NavLink
            to="/admin/settings"
            className={navItemClass}
            onClick={closeMobileSidebar}
          >
            <Settings size={19} />
            Settings
          </NavLink>

        </div>

        {/* Bottom Admin Profile */}
        <div className="border-t border-gray-100 p-4">

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">

            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || 'Shop Admin'}
              </p>

              <p className="text-xs text-gray-400 truncate">
                {user?.email || 'Admin'}
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">

        {/* Mobile spacing */}
        <div className="lg:hidden h-16" />

        {/* Desktop Top Bar */}
        <div className="hidden lg:flex h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-8 items-center justify-between sticky top-0 z-30">

          <div>
            <p className="text-sm text-gray-400">
              Welcome back,
            </p>

            <h2 className="text-xl font-bold text-gray-900">
              {user?.name || 'Shop Admin'}
            </h2>
          </div>

          <NavLink
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-purple-300 hover:text-purple-700 transition-all"
          >
            <Store size={18} />
            View Store
          </NavLink>

        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
}