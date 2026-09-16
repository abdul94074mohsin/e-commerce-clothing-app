import React, { useState } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X
} from 'lucide-react';

import { useProducts } from '../../context/ProductContext';

const initialCoupons = [
  {
    id: 1,
    code: 'PURPLE10',
    discountType: 'Percentage',
    discountValue: 10,
    minOrder: 999,
    maxDiscount: 500,
    expiryDate: '2026-09-30',
    usageLimit: 100,
    used: 24,
    status: 'Active',
    applyTo: 'all',
    selectedCategories: [],
    selectedProducts: []
  },
  {
    id: 2,
    code: 'SAVE500',
    discountType: 'Fixed',
    discountValue: 500,
    minOrder: 2999,
    maxDiscount: 0,
    expiryDate: '2026-10-15',
    usageLimit: 50,
    used: 12,
    status: 'Active',
    applyTo: 'category',
    selectedCategories: ['Ladies Bags'],
    selectedProducts: []
  },
  {
    id: 3,
    code: 'WELCOME20',
    discountType: 'Percentage',
    discountValue: 20,
    minOrder: 1499,
    maxDiscount: 700,
    expiryDate: '2026-09-20',
    usageLimit: 100,
    used: 68,
    status: 'Active',
    applyTo: 'product',
    selectedCategories: [],
    selectedProducts: []
  },
  {
    id: 4,
    code: 'OLD15',
    discountType: 'Percentage',
    discountValue: 15,
    minOrder: 999,
    maxDiscount: 400,
    expiryDate: '2026-08-01',
    usageLimit: 100,
    used: 100,
    status: 'Inactive',
    applyTo: 'category',
    selectedCategories: ['Jewellery'],
    selectedProducts: []
  }
];

const emptyForm = {
  code: '',
  discountType: 'Percentage',
  discountValue: '',
  minOrder: '',
  maxDiscount: '',
  expiryDate: '',
  usageLimit: '',
  applyTo: 'all',
  selectedCategories: [],
  selectedProducts: []
};

export default function Coupons() {
  const { productsList } = useProducts();

  const [coupons, setCoupons] = useState(initialCoupons);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const categories = [
    ...new Set(
      productsList
        .map((product) => product.category)
        .filter(Boolean)
    )
  ];

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === 'Active'
  ).length;

  const totalUsage = coupons.reduce(
    (total, coupon) => total + coupon.used,
    0
  );

  const openAddForm = () => {
    setEditingCoupon(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (coupon) => {
    setEditingCoupon(coupon);

    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrder: coupon.minOrder,
      maxDiscount: coupon.maxDiscount,
      expiryDate: coupon.expiryDate,
      usageLimit: coupon.usageLimit,
      applyTo: coupon.applyTo || 'all',
      selectedCategories: coupon.selectedCategories || [],
      selectedProducts: coupon.selectedProducts || []
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCoupon(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleCategory = (category) => {
    setFormData((prev) => {
      const isSelected =
        prev.selectedCategories.includes(category);

      return {
        ...prev,
        selectedCategories: isSelected
          ? prev.selectedCategories.filter(
              (item) => item !== category
            )
          : [...prev.selectedCategories, category]
      };
    });
  };

  const toggleProduct = (productId) => {
    setFormData((prev) => {
      const isSelected =
        prev.selectedProducts.includes(productId);

      return {
        ...prev,
        selectedProducts: isSelected
          ? prev.selectedProducts.filter(
              (id) => id !== productId
            )
          : [...prev.selectedProducts, productId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.code.trim() ||
      !formData.discountValue ||
      !formData.minOrder ||
      !formData.expiryDate ||
      !formData.usageLimit
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (
      formData.discountType === 'Percentage' &&
      Number(formData.discountValue) > 100
    ) {
      alert('Percentage discount cannot be more than 100%.');
      return;
    }

    if (
      formData.applyTo === 'category' &&
      formData.selectedCategories.length === 0
    ) {
      alert('Please select at least one category.');
      return;
    }

    if (
      formData.applyTo === 'product' &&
      formData.selectedProducts.length === 0
    ) {
      alert('Please select at least one product.');
      return;
    }

    const couponCode =
      formData.code.trim().toUpperCase();

    const duplicateCoupon = coupons.find(
      (coupon) =>
        coupon.code === couponCode &&
        coupon.id !== editingCoupon?.id
    );

    if (duplicateCoupon) {
      alert('This coupon code already exists.');
      return;
    }

    const couponData = {
      code: couponCode,
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      minOrder: Number(formData.minOrder),
      maxDiscount:
        formData.discountType === 'Percentage'
          ? Number(formData.maxDiscount) || 0
          : 0,
      expiryDate: formData.expiryDate,
      usageLimit: Number(formData.usageLimit),
      applyTo: formData.applyTo,
      selectedCategories:
        formData.applyTo === 'category'
          ? formData.selectedCategories
          : [],
      selectedProducts:
        formData.applyTo === 'product'
          ? formData.selectedProducts
          : []
    };

    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === editingCoupon.id
            ? {
                ...coupon,
                ...couponData
              }
            : coupon
        )
      );
    } else {
      const newCoupon = {
        id: Date.now(),
        ...couponData,
        used: 0,
        status: 'Active'
      };

      setCoupons((prev) => [
        newCoupon,
        ...prev
      ]);
    }

    closeForm();
  };

  const deleteCoupon = (coupon) => {
    const confirmDelete = window.confirm(
      `Delete coupon "${coupon.code}"?`
    );

    if (!confirmDelete) return;

    setCoupons((prev) =>
      prev.filter((item) => item.id !== coupon.id)
    );
  };

  const toggleStatus = (couponId) => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === couponId
          ? {
              ...coupon,
              status:
                coupon.status === 'Active'
                  ? 'Inactive'
                  : 'Active'
            }
          : coupon
      )
    );
  };

  const getApplyText = (coupon) => {
    if (coupon.applyTo === 'category') {
      return `${coupon.selectedCategories.length} ${
        coupon.selectedCategories.length === 1
          ? 'Category'
          : 'Categories'
      }`;
    }

    if (coupon.applyTo === 'product') {
      return `${coupon.selectedProducts.length} ${
        coupon.selectedProducts.length === 1
          ? 'Product'
          : 'Products'
      }`;
    }

    return 'All Products';
  };

  const getProductName = (productId) => {
    const product = productsList.find(
      (item) => item.id === productId
    );

    return product?.name || 'Product not found';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Coupons
          </h1>

          <p className="mt-2 text-gray-500">
            Create and manage discount coupons for your store.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          <Plus size={20} />
          Add Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Total Coupons
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {coupons.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Active Coupons
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {activeCoupons}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Total Uses
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalUsage}
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
            placeholder="Search coupon code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>

      {/* Coupon List */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Coupon List
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm text-gray-500">
                  Code
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Discount
                </th>

                {/* NEW */}
                <th className="text-left p-4 text-sm text-gray-500">
                  Applies To
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Min Order
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Expiry
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Usage
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Status
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCoupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="border-t"
                >
                  <td className="p-4">
                    <p className="font-bold text-purple-600">
                      {coupon.code}
                    </p>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold">
                      {coupon.discountType === 'Percentage'
                        ? `${coupon.discountValue}%`
                        : `₹${coupon.discountValue}`}
                    </span>
                  </td>

                  {/* NEW */}
                  <td className="p-4">
                    <span className="text-sm font-medium text-gray-700">
                      {getApplyText(coupon)}
                    </span>

                    {coupon.applyTo === 'category' && (
                      <p className="text-xs text-gray-400 mt-1">
                        {coupon.selectedCategories.join(', ')}
                      </p>
                    )}
                  </td>

                  <td className="p-4 text-gray-600">
                    ₹{coupon.minOrder.toLocaleString()}
                  </td>

                  <td className="p-4 text-gray-600">
                    {coupon.expiryDate}
                  </td>

                  <td className="p-4">
                    <span className="font-semibold">
                      {coupon.used}
                    </span>

                    <span className="text-gray-400">
                      {' '}
                      / {coupon.usageLimit}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        toggleStatus(coupon.id)
                      }
                      className={`px-3 py-1 rounded-full text-sm ${
                        coupon.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {coupon.status}
                    </button>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          openEditForm(coupon)
                        }
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          deleteCoupon(coupon)
                        }
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          {filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="p-5 border-b"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-purple-600">
                    {coupon.code}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {coupon.discountType === 'Percentage'
                      ? `${coupon.discountValue}% discount`
                      : `₹${coupon.discountValue} discount`}
                  </p>
                </div>

                <button
                  onClick={() =>
                    toggleStatus(coupon.id)
                  }
                  className={`px-3 py-1 rounded-full text-sm ${
                    coupon.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {coupon.status}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">
                    Applies To
                  </p>

                  <p className="font-semibold mt-1">
                    {getApplyText(coupon)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Min Order
                  </p>

                  <p className="font-semibold mt-1">
                    ₹{coupon.minOrder.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Expiry
                  </p>

                  <p className="font-semibold mt-1">
                    {coupon.expiryDate}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Usage
                  </p>

                  <p className="font-semibold mt-1">
                    {coupon.used} / {coupon.usageLimit}
                  </p>
                </div>

                {coupon.discountType === 'Percentage' && (
                  <div>
                    <p className="text-gray-500">
                      Max Discount
                    </p>

                    <p className="font-semibold mt-1">
                      ₹{coupon.maxDiscount.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    openEditForm(coupon)
                  }
                  className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCoupon(coupon)
                  }
                  className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCoupons.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No coupons found.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold">
                  {editingCoupon
                    ? 'Edit Coupon'
                    : 'Add Coupon'}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {editingCoupon
                    ? 'Update coupon details'
                    : 'Create a new discount coupon'}
                </p>
              </div>

              <button
                onClick={closeForm}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-5"
            >
              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>

                <input
                  type="text"
                  name="code"
                  placeholder="e.g. PURPLE10"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300 uppercase"
                />
              </div>

              {/* Discount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type
                  </label>

                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <option value="Percentage">
                      Percentage
                    </option>

                    <option value="Fixed">
                      Fixed Amount
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value
                  </label>

                  <input
                    type="number"
                    name="discountValue"
                    min="0"
                    placeholder={
                      formData.discountType === 'Percentage'
                        ? '10'
                        : '500'
                    }
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              </div>

              {/* Apply To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apply Coupon To
                </label>

                <select
                  name="applyTo"
                  value={formData.applyTo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="all">
                    All Products
                  </option>

                  <option value="category">
                    Specific Categories
                  </option>

                  <option value="product">
                    Specific Products
                  </option>
                </select>
              </div>

              {/* Categories */}
              {formData.applyTo === 'category' && (
                <div className="border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Select Categories
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Coupon will work only on these categories.
                      </p>
                    </div>

                    <span className="text-sm text-purple-600 font-medium">
                      {formData.selectedCategories.length} selected
                    </span>
                  </div>

                  {categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-purple-50"
                        >
                          <input
                            type="checkbox"
                            checked={formData.selectedCategories.includes(
                              category
                            )}
                            onChange={() =>
                              toggleCategory(category)
                            }
                            className="w-4 h-4 accent-purple-600"
                          />

                          <span className="text-sm">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No categories found.
                    </p>
                  )}
                </div>
              )}

              {/* Products */}
              {formData.applyTo === 'product' && (
                <div className="border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Select Products
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Coupon will work only on selected products.
                      </p>
                    </div>

                    <span className="text-sm text-purple-600 font-medium">
                      {formData.selectedProducts.length} selected
                    </span>
                  </div>

                  {productsList.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {productsList.map((product) => (
                        <label
                          key={product.id}
                          className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-purple-50"
                        >
                          <input
                            type="checkbox"
                            checked={formData.selectedProducts.includes(
                              product.id
                            )}
                            onChange={() =>
                              toggleProduct(product.id)
                            }
                            className="w-4 h-4 accent-purple-600"
                          />

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {product.category || 'No Category'} • ₹
                              {Number(
                                product.price || 0
                              ).toLocaleString()}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No products available.
                    </p>
                  )}
                </div>
              )}

              {/* Selected Products */}
              {formData.applyTo === 'product' &&
                formData.selectedProducts.length > 0 && (
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-purple-800 mb-2">
                      Selected Products
                    </p>

                    <div className="space-y-1">
                      {formData.selectedProducts.map(
                        (productId) => (
                          <p
                            key={productId}
                            className="text-sm text-purple-700"
                          >
                            • {getProductName(productId)}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Minimum + Maximum */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Order Amount
                  </label>

                  <input
                    type="number"
                    name="minOrder"
                    min="0"
                    placeholder="999"
                    value={formData.minOrder}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                {formData.discountType === 'Percentage' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Discount
                    </label>

                    <input
                      type="number"
                      name="maxDiscount"
                      min="0"
                      placeholder="500"
                      value={formData.maxDiscount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
                    />
                  </div>
                )}
              </div>

              {/* Expiry + Usage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Limit
                  </label>

                  <input
                    type="number"
                    name="usageLimit"
                    min="1"
                    placeholder="100"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700"
                >
                  {editingCoupon
                    ? 'Update Coupon'
                    : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}