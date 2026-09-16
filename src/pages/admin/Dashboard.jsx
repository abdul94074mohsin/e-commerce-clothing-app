import React from 'react';
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  MoreHorizontal,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

import { useProducts } from '../../context/ProductContext';

export default function Dashboard() {
  const { productsList } = useProducts();

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹1,24,580',
      change: '+12.5%',
      positive: true,
      icon: IndianRupee,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Total Orders',
      value: '356',
      change: '+8.2%',
      positive: true,
      icon: ShoppingBag,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Products',
      value: productsList.length,
      change: '+4.6%',
      positive: true,
      icon: Package,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Customers',
      value: '1,248',
      change: '+6.8%',
      positive: true,
      icon: Users,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  const recentOrders = [
    {
      id: '#PG-1048',
      customer: 'Aarav Sharma',
      product: 'Elegant Pearl Necklace',
      amount: '₹2,499',
      status: 'Delivered'
    },
    {
      id: '#PG-1047',
      customer: 'Ananya Patel',
      product: 'Designer Handbag',
      amount: '₹3,299',
      status: 'Processing'
    },
    {
      id: '#PG-1046',
      customer: 'Riya Verma',
      product: 'Traditional Jewellery Set',
      amount: '₹1,899',
      status: 'Shipped'
    },
    {
      id: '#PG-1045',
      customer: 'Kabir Khan',
      product: 'Home Decor Gift Box',
      amount: '₹1,299',
      status: 'Pending'
    }
  ];

  const lowStockProducts = [
    {
      name: 'Royal Pearl Necklace',
      stock: 3
    },
    {
      name: 'Classic Designer Bag',
      stock: 5
    },
    {
      name: 'Antique Gift Set',
      stock: 7
    }
  ];

  const salesData = [
    { month: 'Jan', value: 42 },
    { month: 'Feb', value: 58 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 72 },
    { month: 'May', value: 64 },
    { month: 'Jun', value: 86 },
    { month: 'Jul', value: 78 },
    { month: 'Aug', value: 94 },
    { month: 'Sep', value: 82 },
    { month: 'Oct', value: 100 },
    { month: 'Nov', value: 88 },
    { month: 'Dec', value: 96 }
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <p className="text-sm text-gray-400">
            Store overview
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => window.location.href = '/admin/products/add'}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
          >
            <Plus size={18} />
            Add Product
          </button>

        </div>
      </div>


      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >

              <div className="flex items-start justify-between">

                <div
                  className={`w-11 h-11 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center`}
                >
                  <Icon size={21} />
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <ArrowUpRight size={14} />
                  {stat.change}
                </div>

              </div>

              <p className="text-sm text-gray-500 mt-5">
                {stat.title}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </h2>

            </div>
          );
        })}

      </div>


      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Sales Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>
              <div className="flex items-center gap-2">
                <TrendingUp size={19} className="text-purple-600" />

                <h2 className="font-bold text-gray-900">
                  Sales Overview
                </h2>
              </div>

              <p className="text-sm text-gray-400 mt-1">
                Revenue performance throughout the year
              </p>
            </div>

            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white">
              <option>2026</option>
              <option>2025</option>
            </select>

          </div>


          {/* Chart */}
          <div className="mt-8">

            <div className="h-64 flex items-end gap-2 sm:gap-4 border-b border-gray-100">

              {salesData.map((item) => (
                <div
                  key={item.month}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                >

                  <div
                    className="w-full max-w-[34px] bg-purple-500 rounded-t-lg hover:bg-purple-600 transition-all"
                    style={{
                      height: `${item.value}%`
                    }}
                    title={`${item.month}: ${item.value}%`}
                  />

                  <span className="text-[10px] sm:text-xs text-gray-400">
                    {item.month}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>


        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">

          <h2 className="font-bold text-gray-900">
            Quick Actions
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Manage your store quickly
          </p>


          <div className="mt-5 space-y-3">

            <a
              href="/admin/products/add"
              className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <Plus size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Add New Product
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Create a new product
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>


            <a
              href="/admin/products"
              className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Package size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Manage Products
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  View and edit products
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>


            <a
              href="/admin/orders"
              className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                <ShoppingBag size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  View Orders
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Check recent orders
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>

          </div>

        </div>

      </div>


      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="p-5 sm:p-6 flex items-center justify-between">

            <div>
              <h2 className="font-bold text-gray-900">
                Recent Orders
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Latest customer orders
              </p>
            </div>

            <a
              href="/admin/orders"
              className="text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              View All
            </a>

          </div>


          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-y border-gray-100">

                <tr className="text-left text-xs uppercase tracking-wide text-gray-400">

                  <th className="px-6 py-3 font-semibold">
                    Order
                  </th>

                  <th className="px-6 py-3 font-semibold">
                    Customer
                  </th>

                  <th className="px-6 py-3 font-semibold">
                    Product
                  </th>

                  <th className="px-6 py-3 font-semibold">
                    Amount
                  </th>

                  <th className="px-6 py-3 font-semibold">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors"
                  >

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {order.id}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.customer}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[180px] truncate">
                      {order.product}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {order.amount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-600'
                            : order.status === 'Processing'
                            ? 'bg-blue-50 text-blue-600'
                            : order.status === 'Shipped'
                            ? 'bg-purple-50 text-purple-600'
                            : 'bg-orange-50 text-orange-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* Mobile Orders */}
          <div className="md:hidden px-4 pb-4 space-y-3">

            {recentOrders.map((order) => (

              <div
                key={order.id}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50/50"
              >

                <div className="flex items-center justify-between">

                  <p className="text-sm font-bold text-gray-900">
                    {order.id}
                  </p>

                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-600'
                        : order.status === 'Processing'
                        ? 'bg-blue-50 text-blue-600'
                        : order.status === 'Shipped'
                        ? 'bg-purple-50 text-purple-600'
                        : 'bg-orange-50 text-orange-600'
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <p className="text-sm text-gray-700 mt-2">
                  {order.customer}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {order.product}
                </p>

                <p className="text-sm font-bold text-gray-900 mt-2">
                  {order.amount}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* Low Stock */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">

          <div className="flex items-start justify-between">

            <div>
              <h2 className="font-bold text-gray-900">
                Low Stock
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Products that need attention
              </p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <AlertTriangle size={19} />
            </div>

          </div>


          <div className="mt-5 space-y-3">

            {lowStockProducts.map((product) => (

              <div
                key={product.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
              >

                <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                  <Package size={17} className="text-gray-500" />
                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {product.name}
                  </p>

                  <p className="text-xs text-red-500 mt-1">
                    Only {product.stock} left
                  </p>

                </div>

                <MoreHorizontal
                  size={18}
                  className="text-gray-400"
                />

              </div>

            ))}

          </div>


          <a
            href="/admin/inventory"
            className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-purple-300 hover:text-purple-600 transition-colors"
          >
            <Eye size={17} />
            View Inventory
          </a>

        </div>

      </div>

    </div>
  );
}