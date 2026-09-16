import React, { useState } from 'react';
import { Search, Eye, X } from 'lucide-react';

const ordersData = [
  {
    id: '#PG-1048',
    customer: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    phone: '+91 98765 43210',
    address: 'Indore, Madhya Pradesh',
    product: 'Premium Cotton Shirt',
    amount: 2499,
    payment: 'Paid',
    status: 'Delivered',
    date: '10 Sep 2026'
  },
  {
    id: '#PG-1047',
    customer: 'Priya Singh',
    email: 'priya@gmail.com',
    phone: '+91 98765 12345',
    address: 'Bhopal, Madhya Pradesh',
    product: 'Designer Handbag',
    amount: 3299,
    payment: 'Paid',
    status: 'Shipped',
    date: '09 Sep 2026'
  },
  {
    id: '#PG-1046',
    customer: 'Aman Verma',
    email: 'aman@gmail.com',
    phone: '+91 98765 67890',
    address: 'Burhanpur, Madhya Pradesh',
    product: 'Casual T-Shirt',
    amount: 999,
    payment: 'Pending',
    status: 'Processing',
    date: '08 Sep 2026'
  },
  {
    id: '#PG-1045',
    customer: 'Neha Patel',
    email: 'neha@gmail.com',
    phone: '+91 98765 24680',
    address: 'Ujjain, Madhya Pradesh',
    product: 'Classic Jacket',
    amount: 4599,
    payment: 'Paid',
    status: 'Delivered',
    date: '07 Sep 2026'
  }
];

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const changeOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus
      }));
    }
  };

  const changePaymentStatus = (orderId, newPayment) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, payment: newPayment }
          : order
      )
    );

    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => ({
        ...prev,
        payment: newPayment
      }));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;

  const processingOrders = orders.filter(
    (order) => order.status === 'Processing'
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === 'Shipped'
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === 'Delivered'
  ).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer orders, payments and order status.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Processing</p>
          <h2 className="text-3xl font-bold mt-2">
            {processingOrders}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Shipped</p>
          <h2 className="text-3xl font-bold mt-2">
            {shippedOrders}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Delivered</p>
          <h2 className="text-3xl font-bold mt-2">
            {deliveredOrders}
          </h2>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="bg-white border rounded-2xl p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border rounded-xl outline-none"
          >
            <option value="All">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border rounded-2xl overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Recent Orders
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm text-gray-500">
                  Order
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Customer
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Product
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Amount
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Payment
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Order Status
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Date
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">

                  <td className="p-4 font-semibold">
                    {order.id}
                  </td>

                  <td className="p-4">
                    <p className="font-medium">
                      {order.customer}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.email}
                    </p>
                  </td>

                  <td className="p-4 text-gray-600">
                    {order.product}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{order.amount}
                  </td>

                  {/* Payment */}
                  <td className="p-4">
                    <select
                      value={order.payment}
                      onChange={(e) =>
                        changePaymentStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className={`border rounded-lg px-2 py-2 text-sm ${
                        order.payment === 'Paid'
                          ? 'text-green-600'
                          : order.payment === 'Failed'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>Failed</option>
                    </select>
                  </td>

                  {/* Order Status */}
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        changeOrderStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-2 py-2 text-sm"
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-gray-600">
                    {order.date}
                  </td>

                  {/* View */}
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 rounded-lg text-purple-600 hover:bg-purple-50"
                      title="View Order"
                    >
                      <Eye size={18} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* Mobile */}
        <div className="md:hidden">

          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 border-b"
            >

              <div className="flex justify-between gap-3">

                <div>
                  <h3 className="font-bold">
                    {order.id}
                  </h3>

                  <p className="mt-1">
                    {order.customer}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.product}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ₹{order.amount}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.date}
                  </p>
                </div>

              </div>

              <div className="mt-4 space-y-3">

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Payment
                  </label>

                  <select
                    value={order.payment}
                    onChange={(e) =>
                      changePaymentStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Failed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Order Status
                  </label>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      changeOrderStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 text-purple-600 hover:bg-purple-50"
                >
                  <Eye size={18} />
                  View Order
                </button>

              </div>

            </div>
          ))}

        </div>

        {filteredOrders.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No orders found.
          </div>
        )}

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b">

              <div>
                <h2 className="text-xl font-bold">
                  Order Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={22} />
              </button>

            </div>

            {/* Customer */}
            <div className="p-5 border-b">

              <h3 className="font-semibold mb-3">
                Customer Details
              </h3>

              <p className="text-gray-800">
                {selectedOrder.customer}
              </p>

              <p className="text-gray-500 mt-1">
                {selectedOrder.email}
              </p>

              <p className="text-gray-500 mt-1">
                {selectedOrder.phone}
              </p>

              <p className="text-gray-500 mt-1">
                {selectedOrder.address}
              </p>

            </div>

            {/* Product */}
            <div className="p-5 border-b">

              <h3 className="font-semibold mb-3">
                Product Details
              </h3>

              <div className="flex justify-between items-center">

                <div>
                  <p className="font-medium">
                    {selectedOrder.product}
                  </p>

                  <p className="text-sm text-gray-500">
                    Order Date: {selectedOrder.date}
                  </p>
                </div>

                <p className="font-bold">
                  ₹{selectedOrder.amount}
                </p>

              </div>

            </div>

            {/* Status */}
            <div className="p-5">

              <h3 className="font-semibold mb-4">
                Order & Payment Status
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Order Status
                  </label>

                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      changeOrderStatus(
                        selectedOrder.id,
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Payment Status
                  </label>

                  <select
                    value={selectedOrder.payment}
                    onChange={(e) =>
                      changePaymentStatus(
                        selectedOrder.id,
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Failed</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Close */}
            <div className="p-5 border-t">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}