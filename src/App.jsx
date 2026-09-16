import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';

import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import Inventory from './pages/admin/Inventory';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Categories from './pages/admin/Categories';
import Coupons from './pages/admin/Coupons';
/* =========================
   ADMIN PROTECTION
========================= */

function AdminRoute({ children }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


/* =========================
   CUSTOMER WEBSITE LAYOUT
========================= */

function StoreLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}


/* =========================
   MAIN APP
========================= */

export default function App() {

  return (
    <AuthProvider>

      <ProductProvider>

        <CartProvider>

          <Router>

            <Routes>

              {/* =================================
                  ADMIN PANEL
              ================================= */}

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >

                {/* Dashboard */}
                <Route
                  index
                  element={<Dashboard />}
                />


                {/* =================================
                    PRODUCTS
                ================================= */}

                <Route
                  path="products"
                  element={<ManageProducts />}
                />


                {/* Add Product */}
                <Route
                  path="products/add"
                  element={<AddProduct />}
                />


                {/* =================================
                    INVENTORY
                ================================= */}

                <Route path="inventory" element={<Inventory />} />


                {/* =================================
                    ORDERS
                ================================= */}

               <Route path="orders" element={<Orders />} />


                {/* =================================
                    CUSTOMERS
                ================================= */}

               <Route path="customers" element={<Customers />} />
                {/* =================================
                    CATEGORIES
                ================================= */}
              <Route path="categories" element={<Categories />} />


                {/* =================================
                    COUPONS
                ================================= */}

              <Route path="coupons" element={<Coupons />} />

                {/* =================================
                    SETTINGS
                ================================= */}

                <Route
                  path="settings"
                  element={
                    <div>

                      <h1 className="text-3xl font-bold text-gray-900">
                        Settings
                      </h1>

                      <p className="mt-2 text-gray-500">
                        Admin settings will be built here.
                      </p>

                    </div>
                  }
                />

              </Route>


              {/* =================================
                  CUSTOMER WEBSITE
              ================================= */}

              <Route
                path="/*"
                element={<StoreLayout />}
              />

            </Routes>

          </Router>

        </CartProvider>

      </ProductProvider>

    </AuthProvider>
  );
}