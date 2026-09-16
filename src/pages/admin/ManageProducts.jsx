import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Package,
  Eye,
  X,
  Check,
  AlertTriangle,
  Boxes,
  IndianRupee,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';

export default function ManageProducts() {
  const navigate = useNavigate();

  const {
    productsList,
    updateProduct,
    deleteProduct
  } = useProducts();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Categories automatically products se niklegi
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        productsList
          .map((product) => product.category)
          .filter(Boolean)
      )
    ];

    return ['All', ...uniqueCategories];
  }, [productsList]);

  // Stock field nahi hai to default stock 10
  const getStock = (product) => {
    return Number(product.stock ?? 10);
  };

  const getStatus = (product) => {
    const stock = getStock(product);

    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';

    return 'In Stock';
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === 'All' ||
        product.category === category;

      const matchesStatus =
        status === 'All' ||
        getStatus(product) === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [productsList, search, category, status]);

  const totalProducts = productsList.length;

  const inStock = productsList.filter(
    (product) => getStock(product) > 5
  ).length;

  const lowStock = productsList.filter(
    (product) => {
      const stock = getStock(product);
      return stock > 0 && stock <= 5;
    }
  ).length;

  const outOfStock = productsList.filter(
    (product) => getStock(product) === 0
  ).length;

  // Delete confirmation
  const handleDelete = () => {
    if (!deleteId) return;

    deleteProduct(deleteId);
    setDeleteId(null);
  };

  // Edit save
  const handleEditSave = (e) => {
    e.preventDefault();

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      category: editingProduct.category,
      price: editingProduct.price,
      originalPrice: editingProduct.originalPrice,
      discount: editingProduct.discount,
      description: editingProduct.description,
      stock: Number(editingProduct.stock)
    });

    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-7">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <p className="text-sm font-semibold text-purple-600 mb-1">
              Product Management
            </p>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Manage Products
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              View, edit and manage all products in your store.
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/products/add')}
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-3
              rounded-xl
              bg-gradient-to-r from-purple-600 to-fuchsia-600
              text-white
              text-sm font-bold
              shadow-lg shadow-purple-500/20
              hover:-translate-y-0.5
              transition-all
            "
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>

        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

        <StatCard
          icon={<Package className="w-5 h-5" />}
          title="Total Products"
          value={totalProducts}
        />

        <StatCard
          icon={<Check className="w-5 h-5" />}
          title="In Stock"
          value={inStock}
          iconBox="bg-green-100 text-green-600"
        />

        <StatCard
          icon={<AlertTriangle className="w-5 h-5" />}
          title="Low Stock"
          value={lowStock}
          iconBox="bg-amber-100 text-amber-600"
        />

        <StatCard
          icon={<Boxes className="w-5 h-5" />}
          title="Out of Stock"
          value={outOfStock}
          iconBox="bg-red-100 text-red-600"
        />

      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* FILTER BAR */}
        <div className="p-4 sm:p-5 border-b border-slate-100">

          <div className="flex flex-col lg:flex-row gap-3">

            {/* SEARCH */}
            <div className="relative flex-1">

              <Search
                className="
                  absolute left-3.5 top-1/2
                  -translate-y-1/2
                  w-5 h-5
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="
                  w-full
                  pl-11 pr-4 py-3
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  text-sm
                  outline-none
                  focus:bg-white
                  focus:border-purple-500
                  focus:ring-4
                  focus:ring-purple-500/10
                  transition-all
                "
              />

            </div>

            {/* CATEGORY */}
            <div className="relative">

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="
                  appearance-none
                  w-full lg:w-48
                  pl-4 pr-10 py-3
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  text-sm font-medium
                  outline-none
                  focus:bg-white
                  focus:border-purple-500
                "
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === 'All'
                      ? 'All Categories'
                      : item}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-slate-400
                  pointer-events-none
                "
              />

            </div>

            {/* STATUS */}
            <div className="relative">

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="
                  appearance-none
                  w-full lg:w-44
                  pl-4 pr-10 py-3
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  text-sm font-medium
                  outline-none
                  focus:bg-white
                  focus:border-purple-500
                "
              >
                <option value="All">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <ChevronDown
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-slate-400
                  pointer-events-none
                "
              />

            </div>

          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
            <SlidersHorizontal className="w-4 h-4" />
            Showing <strong className="text-slate-700">
              {filteredProducts.length}
            </strong> of {totalProducts} products
          </div>

        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">

                <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                  Product
                </th>

                <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                  Stock
                </th>

                <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="text-right px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredProducts.map((product) => {

                const stock = getStock(product);
                const productStatus = getStatus(product);

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-purple-50/30 transition-colors"
                  >

                    {/* PRODUCT */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-4">

                        <ProductImage product={product} />

                        <div className="min-w-0">

                          <p className="font-bold text-slate-900 truncate max-w-[230px]">
                            {product.name}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            ID: #{product.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* CATEGORY */}
                    <td className="px-5 py-4">

                      <span className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold">
                        {product.category || 'Uncategorized'}
                      </span>

                    </td>

                    {/* PRICE */}
                    <td className="px-5 py-4">

                      <div>
                        <p className="font-black text-slate-900">
                          ₹{Number(product.price || 0).toLocaleString('en-IN')}
                        </p>

                        {product.originalPrice && (
                          <p className="text-xs text-slate-400 line-through">
                            ₹{Number(product.originalPrice).toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>

                    </td>

                    {/* STOCK */}
                    <td className="px-5 py-4">

                      <span className="font-bold text-slate-700">
                        {stock}
                      </span>

                      <span className="text-xs text-slate-400 ml-1">
                        units
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <StatusBadge status={productStatus} />
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            navigate(`/product/${product.id}`)
                          }
                          title="View"
                          className="
                            w-9 h-9
                            rounded-lg
                            bg-slate-100
                            text-slate-600
                            flex items-center justify-center
                            hover:bg-slate-200
                            transition
                          "
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            setEditingProduct({
                              ...product,
                              stock
                            })
                          }
                          title="Edit"
                          className="
                            w-9 h-9
                            rounded-lg
                            bg-purple-50
                            text-purple-600
                            flex items-center justify-center
                            hover:bg-purple-100
                            transition
                          "
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteId(product.id)}
                          title="Delete"
                          className="
                            w-9 h-9
                            rounded-lg
                            bg-red-50
                            text-red-600
                            flex items-center justify-center
                            hover:bg-red-100
                            transition
                          "
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden divide-y divide-slate-100">

          {filteredProducts.map((product) => {

            const stock = getStock(product);
            const productStatus = getStatus(product);

            return (
              <div
                key={product.id}
                className="p-4"
              >

                <div className="flex gap-3">

                  <ProductImage product={product} />

                  <div className="flex-1 min-w-0">

                    <div className="flex items-start justify-between gap-2">

                      <div className="min-w-0">

                        <h3 className="font-bold text-slate-900 truncate">
                          {product.name}
                        </h3>

                        <p className="text-xs text-purple-600 font-semibold mt-1">
                          {product.category}
                        </p>

                      </div>

                      <StatusBadge status={productStatus} />

                    </div>

                    <div className="flex items-center justify-between mt-3">

                      <div>
                        <p className="font-black text-slate-900">
                          ₹{Number(product.price || 0).toLocaleString('en-IN')}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          Stock: <strong>{stock}</strong>
                        </p>
                      </div>

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            setEditingProduct({
                              ...product,
                              stock
                            })
                          }
                          className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* EMPTY */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <Package className="w-7 h-7" />
            </div>

            <h3 className="mt-4 font-bold text-slate-800">
              No products found
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Try changing your search or filters.
            </p>

          </div>
        )}

      </div>

      {/* EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">

            <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">

              <div>
                <h2 className="font-black text-xl text-slate-900">
                  Edit Product
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Update product information.
                </p>
              </div>

              <button
                onClick={() => setEditingProduct(null)}
                className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            <form
              onSubmit={handleEditSave}
              className="p-5 space-y-5"
            >

              {/* IMAGE */}
              <div className="flex items-center gap-4">

                <ProductImage
                  product={editingProduct}
                  large
                />

                <div>
                  <p className="font-bold text-slate-800">
                    Product Image
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Image replacement can be added later with cloud storage.
                  </p>
                </div>

              </div>

              {/* NAME */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  value={editingProduct.name || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                />
              </div>

              {/* CATEGORY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                    Category
                  </label>

                  <select
                    value={editingProduct.category || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-purple-500"
                  >
                    {categories
                      .filter((item) => item !== 'All')
                      .map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}

                    <option value="Jewellery">
                      Jewellery
                    </option>

                    <option value="Gifts">
                      Gifts
                    </option>

                    <option value="Fancy Items">
                      Fancy Items
                    </option>

                    <option value="Accessories">
                      Accessories
                    </option>
                  </select>
                </div>

                {/* PRICE */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                    Selling Price
                  </label>

                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="number"
                      min="0"
                      value={editingProduct.price || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value
                        })
                      }
                      required
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

              </div>

              {/* ORIGINAL + STOCK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                    Original Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: e.target.value
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={editingProduct.stock ?? 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: e.target.value
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-purple-500"
                  />
                </div>

              </div>

              {/* DISCOUNT */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                  Discount
                </label>

                <input
                  type="text"
                  value={editingProduct.discount || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      discount: e.target.value
                    })
                  }
                  placeholder="50% OFF"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-purple-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={editingProduct.description || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-sm shadow-lg shadow-purple-500/20"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">

            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-black text-slate-900">
              Delete Product?
            </h2>

            <p className="text-sm text-slate-500 mt-2 leading-6">
              This product will be removed from your current product list.
              This action cannot be undone.
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">

              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700"
              >
                Delete Product
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  icon,
  title,
  value,
  iconBox = 'bg-purple-100 text-purple-600'
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBox}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {title}
          </p>

          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}

/* =========================
   PRODUCT IMAGE
========================= */

function ProductImage({ product, large = false }) {
  const image =
    product?.images?.[0] ||
    product?.image ||
    product?.imageUrl;

  return (
    <div
      className={`
        shrink-0
        rounded-xl
        overflow-hidden
        bg-slate-100
        border border-slate-200
        flex items-center justify-center
        ${large ? 'w-20 h-20' : 'w-14 h-14'}
      `}
    >
      {image ? (
        <img
          src={image}
          alt={product?.name || 'Product'}
          className="w-full h-full object-cover"
        />
      ) : (
        <Package className="w-6 h-6 text-slate-300" />
      )}
    </div>
  );
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }) {
  const styles = {
    'In Stock':
      'bg-green-50 text-green-700 border-green-100',
    'Low Stock':
      'bg-amber-50 text-amber-700 border-amber-100',
    'Out of Stock':
      'bg-red-50 text-red-700 border-red-100'
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-1.5
        rounded-full
        border
        text-xs font-bold
        whitespace-nowrap
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}