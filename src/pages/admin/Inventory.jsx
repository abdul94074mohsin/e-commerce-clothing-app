import React, { useState } from 'react';
import { Search, Package, AlertTriangle, XCircle } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export default function Inventory() {
  const { productsList, updateProduct } = useProducts();

  const [search, setSearch] = useState('');

  const getStock = (product) => {
    return Number(product.stock ?? 10);
  };

  const getStatus = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';
    return 'In Stock';
  };

  const filteredProducts = productsList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = productsList.reduce(
    (total, product) => total + getStock(product),
    0
  );

  const inStock = productsList.filter(
    (product) => getStock(product) > 5
  ).length;

  const lowStock = productsList.filter(
    (product) => getStock(product) > 0 && getStock(product) <= 5
  ).length;

  const outOfStock = productsList.filter(
    (product) => getStock(product) === 0
  ).length;

  const changeStock = (product, value) => {
    updateProduct(product.id, {
      ...product,
      stock: Number(value)
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Inventory / Stock
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your product stock and inventory.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">

        <div className="bg-white rounded-2xl p-5 border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Package className="text-purple-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Stock</p>
              <h2 className="text-2xl font-bold">{totalStock}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <Package className="text-green-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">In Stock</p>
              <h2 className="text-2xl font-bold">{inStock}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <AlertTriangle className="text-yellow-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Low Stock</p>
              <h2 className="text-2xl font-bold">{lowStock}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-xl">
              <XCircle className="text-red-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <h2 className="text-2xl font-bold">{outOfStock}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border p-5 mb-6">
        <div className="relative max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Product Stock
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm text-gray-500">
                  Product
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Category
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Price
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Stock
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const stock = getStock(product);
                const status = getStatus(stock);

                return (
                  <tr key={product.id} className="border-t">

                    <td className="p-4">
                      <div className="flex items-center gap-3">

                        <img
                          src={
                            product.images?.[0] ||
                            product.image ||
                            product.imageUrl
                          }
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />

                        <span className="font-medium">
                          {product.name}
                        </span>

                      </div>
                    </td>

                    <td className="p-4 text-gray-600">
                      {product.category}
                    </td>

                    <td className="p-4 font-medium">
                      ₹{product.price}
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) =>
                          changeStock(product, e.target.value)
                        }
                        className="w-24 px-3 py-2 border rounded-lg"
                      />
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          status === 'In Stock'
                            ? 'bg-green-100 text-green-700'
                            : status === 'Low Stock'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden">

          {filteredProducts.map((product) => {
            const stock = getStock(product);
            const status = getStatus(stock);

            return (
              <div
                key={product.id}
                className="p-5 border-b"
              >
                <div className="flex gap-3">

                  <img
                    src={
                      product.images?.[0] ||
                      product.image ||
                      product.imageUrl
                    }
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.category}
                    </p>

                    <p className="font-medium mt-1">
                      ₹{product.price}
                    </p>
                  </div>

                </div>

                <div className="flex items-center justify-between mt-4">

                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) =>
                      changeStock(product, e.target.value)
                    }
                    className="w-24 px-3 py-2 border rounded-lg"
                  />

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      status === 'In Stock'
                        ? 'bg-green-100 text-green-700'
                        : status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {status}
                  </span>

                </div>
              </div>
            );
          })}

        </div>

        {filteredProducts.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No products found.
          </div>
        )}

      </div>
    </div>
  );
}