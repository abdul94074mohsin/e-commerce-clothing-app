import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2, X } from 'lucide-react';

const initialCategories = [
  {
    id: 1,
    name: 'Jewellery',
    products: 12,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Ladies Bags',
    products: 8,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Home Decor',
    products: 5,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Gifts & Antiques',
    products: 4,
    status: 'Active'
  }
];

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryName, setCategoryName] = useState('');

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddForm = () => {
    setEditingCategory(null);
    setCategoryName('');
    setShowForm(true);
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert('Please enter category name');
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: categoryName.trim()
              }
            : category
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName.trim(),
        products: 0,
        status: 'Active'
      };

      setCategories((prev) => [...prev, newCategory]);
    }

    closeForm();
  };

  const deleteCategory = (category) => {
    if (category.products > 0) {
      alert(
        'This category has products. Remove or move those products before deleting the category.'
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Delete "${category.name}" category?`
    );

    if (!confirmDelete) return;

    setCategories((prev) =>
      prev.filter((item) => item.id !== category.id)
    );
  };

  const toggleStatus = (categoryId) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              status:
                category.status === 'Active'
                  ? 'Inactive'
                  : 'Active'
            }
          : category
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="mt-2 text-gray-500">
            Manage product categories for your store.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Total Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {categories.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Active Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              categories.filter(
                (category) => category.status === 'Active'
              ).length
            }
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Products in Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {categories.reduce(
              (total, category) => total + category.products,
              0
            )}
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
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>

      {/* Category List */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Category List
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm text-gray-500">
                  Category
                </th>

                <th className="text-left p-4 text-sm text-gray-500">
                  Products
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
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t"
                >
                  <td className="p-4">
                    <p className="font-semibold">
                      {category.name}
                    </p>
                  </td>

                  <td className="p-4 text-gray-600">
                    {category.products}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(category.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        category.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {category.status}
                    </button>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditForm(category)}
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteCategory(category)}
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
        <div className="md:hidden">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-5 border-b"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">
                    {category.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {category.products} products
                  </p>

                  <button
                    onClick={() => toggleStatus(category.id)}
                    className={`mt-2 px-3 py-1 rounded-full text-sm ${
                      category.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {category.status}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(category)}
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteCategory(category)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No categories found.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h2 className="text-xl font-bold">
                  {editingCategory
                    ? 'Edit Category'
                    : 'Add Category'}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {editingCategory
                    ? 'Update category name'
                    : 'Create a new product category'}
                </p>
              </div>

              <button
                onClick={closeForm}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-5"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>

              <input
                type="text"
                placeholder="e.g. Men's Clothing"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
              />

              <div className="flex gap-3 mt-6">
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
                  {editingCategory
                    ? 'Update Category'
                    : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}