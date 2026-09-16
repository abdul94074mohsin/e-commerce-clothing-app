import React, { useState } from 'react';
import { Search, Eye, X, Package } from 'lucide-react';

const customersData = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    phone: '+91 98765 43210',
    orders: 3,
    spending: 8097,
    status: 'Active',
    joined: '15 Aug 2026',
    address: 'Indore, Madhya Pradesh',
    orderHistory: [
      {
        id: '#PG-1048',
        product: 'Premium Cotton Shirt',
        amount: 2499,
        status: 'Delivered',
        date: '10 Sep 2026'
      },
      {
        id: '#PG-1021',
        product: 'Classic Jacket',
        amount: 4599,
        status: 'Delivered',
        date: '28 Aug 2026'
      },
      {
        id: '#PG-1005',
        product: 'Casual T-Shirt',
        amount: 999,
        status: 'Cancelled',
        date: '20 Aug 2026'
      }
    ]
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya@gmail.com',
    phone: '+91 98765 12345',
    orders: 2,
    spending: 6298,
    status: 'Active',
    joined: '20 Aug 2026',
    address: 'Bhopal, Madhya Pradesh',
    orderHistory: [
      {
        id: '#PG-1047',
        product: 'Designer Handbag',
        amount: 3299,
        status: 'Shipped',
        date: '09 Sep 2026'
      },
      {
        id: '#PG-1018',
        product: 'Women Dress',
        amount: 2999,
        status: 'Delivered',
        date: '25 Aug 2026'
      }
    ]
  },
  {
    id: 3,
    name: 'Aman Verma',
    email: 'aman@gmail.com',
    phone: '+91 98765 67890',
    orders: 2,
    spending: 2999,
    status: 'Active',
    joined: '28 Aug 2026',
    address: 'Indore, Madhya Pradesh',
    orderHistory: [
      {
        id: '#PG-1046',
        product: 'Casual T-Shirt',
        amount: 999,
        status: 'Processing',
        date: '08 Sep 2026'
      },
      {
        id: '#PG-1030',
        product: 'Premium Shirt',
        amount: 2000,
        status: 'Delivered',
        date: '30 Aug 2026'
      }
    ]
  },
  {
    id: 4,
    name: 'Neha Patel',
    email: 'neha@gmail.com',
    phone: '+91 98765 24680',
    orders: 0,
    spending: 0,
    status: 'Inactive',
    joined: '02 Sep 2026',
    address: 'Ujjain, Madhya Pradesh',
    orderHistory: []
  }
];

function getStatusStyle(status) {
  if (status === 'Delivered') {
    return 'bg-green-100 text-green-700';
  }

  if (status === 'Shipped') {
    return 'bg-blue-100 text-blue-700';
  }

  if (status === 'Processing') {
    return 'bg-yellow-100 text-yellow-700';
  }

  if (status === 'Cancelled') {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-gray-100 text-gray-600';
}

export default function Customers() {
  const [customers] = useState(customersData);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.phone.includes(search)
    );
  });

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === 'Active'
  ).length;

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.orders,
    0
  );

  const totalSpending = customers.reduce(
    (total, customer) => total + customer.spending,
    0
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customers and view their order history.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalCustomers}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Active Customers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {activeCustomers}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Customer Spending
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{totalSpending.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border rounded-2xl p-5 mb-6">
        <div className="relative max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Customer List
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm text-gray-500">
                  Customer
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Phone
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Orders
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Spending
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Status
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Joined
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t"
                >
                  <td className="p-4">
                    <p className="font-semibold">
                      {customer.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {customer.email}
                    </p>
                  </td>

                  <td className="p-4 text-gray-600">
                    {customer.phone}
                  </td>

                  <td className="p-4">
                    {customer.orders}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{customer.spending.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    {customer.joined}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-2 rounded-lg text-purple-600 hover:bg-purple-50"
                      title="View Customer"
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
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-5 border-b"
            >
              <div className="flex justify-between gap-3">
                <div>
                  <h3 className="font-semibold">
                    {customer.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {customer.email}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {customer.phone}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="p-2 h-fit rounded-lg text-purple-600 hover:bg-purple-50"
                >
                  <Eye size={18} />
                </button>
              </div>

              <div className="flex justify-between mt-4 text-sm">
                <div>
                  <p className="text-gray-500">
                    Orders
                  </p>

                  <p className="font-semibold">
                    {customer.orders}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Spending
                  </p>

                  <p className="font-semibold">
                    ₹{customer.spending.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Status
                  </p>

                  <p
                    className={
                      customer.status === 'Active'
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }
                  >
                    {customer.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No customers found.
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
              <div>
                <h2 className="text-xl font-bold">
                  Customer Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Customer #{selectedCustomer.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-bold mb-4">
                  Customer Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Name
                    </p>

                    <p className="font-semibold mt-1">
                      {selectedCustomer.name}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="font-semibold mt-1 break-all">
                      {selectedCustomer.email}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Phone
                    </p>

                    <p className="font-semibold mt-1">
                      {selectedCustomer.phone}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Joined
                    </p>

                    <p className="font-semibold mt-1">
                      {selectedCustomer.joined}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
                    <p className="text-sm text-gray-500">
                      Address
                    </p>

                    <p className="font-semibold mt-1">
                      {selectedCustomer.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Total Orders
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    {selectedCustomer.orders}
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Total Spending
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    ₹{selectedCustomer.spending.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Order History */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Package size={20} className="text-purple-600" />

                  <h3 className="text-lg font-bold">
                    Order History
                  </h3>
                </div>

                {selectedCustomer.orderHistory.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCustomer.orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-xl p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <p className="font-bold">
                              {order.id}
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {order.product}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {order.date}
                            </p>
                          </div>

                          <div className="sm:text-right">
                            <p className="font-bold">
                              ₹{order.amount.toLocaleString()}
                            </p>

                            <span
                              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${getStatusStyle(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-xl p-6 text-center text-gray-500">
                    This customer has not placed any orders yet.
                  </div>
                )}
              </div>
            </div>

            {/* Close */}
            <div className="p-5 border-t">
              <button
                onClick={() => setSelectedCustomer(null)}
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