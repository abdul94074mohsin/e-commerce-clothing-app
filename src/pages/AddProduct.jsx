import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import {
  PackagePlus,
  Image as ImageIcon,
  IndianRupee,
  Tag,
  FileText,
  Sparkles,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export default function AddProduct() {
  const { addProduct } = useProducts();
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Jewellery',
    price: '',
    originalPrice: '',
    discount: '50% OFF',
    description: '',
    imageUrl: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  // Admin login nahi hai
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Image preview
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  // Submit
  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageUrl) {
      alert('Please fill Name, Price and Image URL!');
      return;
    }

    addProduct({
      name: formData.name,
      category: formData.category,
      price: formData.price,
      originalPrice: formData.originalPrice,
      discount: formData.discount,
      description: formData.description,
      images: [formData.imageUrl]
    });

    alert('Product Added Successfully!');

    navigate('/shop');
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-purple-50
        via-white
        to-fuchsia-50
        px-4
        sm:px-6
        lg:px-8
        pt-32
        sm:pt-36
        pb-16
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* ================= TOP HEADER ================= */}
        <div className="mb-7">

          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-gray-500
              hover:text-purple-700
              transition-colors
              mb-5
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

            <div>

              <div className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-purple-100
                text-purple-700
                text-xs
                font-bold
                uppercase
                tracking-wider
                mb-3
              ">
                <Sparkles className="w-3.5 h-3.5" />
                Admin Panel
              </div>

              <h1 className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-black
                text-slate-900
                tracking-tight
              ">
                Add New Product
              </h1>

              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Create and publish a new product to Purple Gallery.
              </p>

            </div>

            <div className="
              hidden sm:flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-green-700
              bg-green-50
              border
              border-green-100
              px-4
              py-2.5
              rounded-full
            ">
              <CheckCircle2 className="w-4 h-4" />
              Admin Access
            </div>

          </div>
        </div>

        {/* ================= MAIN GLASS CARD ================= */}
        <div
          className="
            bg-white/70
            backdrop-blur-2xl
            border
            border-white
            rounded-3xl
            shadow-xl
            shadow-purple-900/10
            overflow-hidden
          "
        >

          {/* CARD TOP */}
          <div
            className="
              px-5
              sm:px-8
              lg:px-10
              py-5
              border-b
              border-purple-100/80
              bg-white/40
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-gradient-to-br
                  from-purple-600
                  to-fuchsia-600
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-purple-500/20
                "
              >
                <PackagePlus className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-black text-slate-900">
                  Product Information
                </h2>

                <p className="text-xs text-gray-500 mt-0.5">
                  Add the details customers will see in your shop.
                </p>
              </div>

            </div>
          </div>

          {/* ================= FORM AREA ================= */}
          <form
            onSubmit={handleProductSubmit}
            className="p-5 sm:p-8 lg:p-10"
          >

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* ================= LEFT FORM ================= */}
              <div className="lg:col-span-2 space-y-6">

                {/* Product Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-700
                      mb-2
                    "
                  >
                    <PackagePlus className="w-4 h-4 text-purple-600" />
                    Product Title
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Kashmiri Charm Watch"
                    value={formData.name}
                    onChange={handleChange}
                    className="
                      w-full
                      px-4
                      py-3.5
                      rounded-xl
                      bg-white/80
                      border
                      border-gray-200
                      text-sm
                      text-slate-900
                      placeholder-gray-400
                      outline-none
                      focus:border-purple-500
                      focus:ring-4
                      focus:ring-purple-500/10
                      transition-all
                    "
                  />

                </div>

                {/* Category + Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Category */}
                  <div>

                    <label
                      htmlFor="category"
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-black
                        uppercase
                        tracking-wider
                        text-slate-700
                        mb-2
                      "
                    >
                      <Tag className="w-4 h-4 text-purple-600" />
                      Category
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-xl
                        bg-white/80
                        border
                        border-gray-200
                        text-sm
                        text-slate-900
                        outline-none
                        focus:border-purple-500
                        focus:ring-4
                        focus:ring-purple-500/10
                        transition-all
                      "
                    >
                      <option value="Jewellery">Jewellery</option>
                      <option value="Gifts">Gifts</option>
                      <option value="Fancy Items">Fancy Items</option>
                      <option value="Accessories">Accessories</option>
                    </select>

                  </div>

                  {/* Price */}
                  <div>

                    <label
                      htmlFor="price"
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-black
                        uppercase
                        tracking-wider
                        text-slate-700
                        mb-2
                      "
                    >
                      <IndianRupee className="w-4 h-4 text-purple-600" />
                      Selling Price
                    </label>

                    <input
                      id="price"
                      name="price"
                      type="number"
                      required
                      min="0"
                      placeholder="399"
                      value={formData.price}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-xl
                        bg-white/80
                        border
                        border-gray-200
                        text-sm
                        text-slate-900
                        placeholder-gray-400
                        outline-none
                        focus:border-purple-500
                        focus:ring-4
                        focus:ring-purple-500/10
                        transition-all
                      "
                    />

                  </div>

                </div>

                {/* Original Price + Discount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Original Price */}
                  <div>

                    <label
                      htmlFor="originalPrice"
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-black
                        uppercase
                        tracking-wider
                        text-slate-700
                        mb-2
                      "
                    >
                      <IndianRupee className="w-4 h-4 text-purple-600" />
                      Original Price
                    </label>

                    <input
                      id="originalPrice"
                      name="originalPrice"
                      type="number"
                      min="0"
                      placeholder="799"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-xl
                        bg-white/80
                        border
                        border-gray-200
                        text-sm
                        text-slate-900
                        placeholder-gray-400
                        outline-none
                        focus:border-purple-500
                        focus:ring-4
                        focus:ring-purple-500/10
                        transition-all
                      "
                    />

                  </div>

                  {/* Discount */}
                  <div>

                    <label
                      htmlFor="discount"
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-black
                        uppercase
                        tracking-wider
                        text-slate-700
                        mb-2
                      "
                    >
                      <Tag className="w-4 h-4 text-purple-600" />
                      Discount
                    </label>

                    <input
                      id="discount"
                      name="discount"
                      type="text"
                      placeholder="50% OFF"
                      value={formData.discount}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-xl
                        bg-white/80
                        border
                        border-gray-200
                        text-sm
                        text-slate-900
                        placeholder-gray-400
                        outline-none
                        focus:border-purple-500
                        focus:ring-4
                        focus:ring-purple-500/10
                        transition-all
                      "
                    />

                  </div>

                </div>

                {/* Image URL */}
                <div>

                  <label
                    htmlFor="imageUrl"
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-700
                      mb-2
                    "
                  >
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                    Product Image URL
                  </label>

                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    required
                    placeholder="https://i.ibb.co/XXXX/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="
                      w-full
                      px-4
                      py-3.5
                      rounded-xl
                      bg-white/80
                      border
                      border-gray-200
                      text-sm
                      text-slate-900
                      placeholder-gray-400
                      outline-none
                      focus:border-purple-500
                      focus:ring-4
                      focus:ring-purple-500/10
                      transition-all
                    "
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    Paste the direct URL of your product image.
                  </p>

                </div>

                {/* Description */}
                <div>

                  <label
                    htmlFor="description"
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-700
                      mb-2
                    "
                  >
                    <FileText className="w-4 h-4 text-purple-600" />
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="Describe your product..."
                    value={formData.description}
                    onChange={handleChange}
                    className="
                      w-full
                      px-4
                      py-3.5
                      rounded-xl
                      bg-white/80
                      border
                      border-gray-200
                      text-sm
                      text-slate-900
                      placeholder-gray-400
                      outline-none
                      resize-none
                      focus:border-purple-500
                      focus:ring-4
                      focus:ring-purple-500/10
                      transition-all
                    "
                  />

                </div>

              </div>

              {/* ================= RIGHT PREVIEW ================= */}
              <div className="lg:col-span-1">

                <div
                  className="
                    lg:sticky
                    lg:top-28
                    rounded-3xl
                    bg-white/70
                    border
                    border-purple-100
                    p-5
                    shadow-lg
                    shadow-purple-900/5
                  "
                >

                  <div className="flex items-center justify-between mb-4">

                    <div>
                      <h3 className="font-black text-slate-900">
                        Product Preview
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Live image preview
                      </p>
                    </div>

                    <div className="
                      w-9
                      h-9
                      rounded-xl
                      bg-purple-100
                      text-purple-700
                      flex
                      items-center
                      justify-center
                    ">
                      <ImageIcon className="w-4 h-4" />
                    </div>

                  </div>

                  {/* Image */}
                  <div
                    className="
                      aspect-[4/5]
                      rounded-2xl
                      overflow-hidden
                      bg-gradient-to-br
                      from-purple-50
                      to-fuchsia-50
                      border
                      border-purple-100
                      flex
                      items-center
                      justify-center
                    "
                  >

                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Product Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-center px-5">

                        <div className="
                          w-14
                          h-14
                          mx-auto
                          rounded-2xl
                          bg-white
                          shadow-sm
                          flex
                          items-center
                          justify-center
                          text-purple-400
                          mb-3
                        ">
                          <ImageIcon className="w-7 h-7" />
                        </div>

                        <p className="text-sm font-bold text-gray-500">
                          Image Preview
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Paste an image URL to preview it here.
                        </p>

                      </div>
                    )}

                  </div>

                  {/* Preview Details */}
                  <div className="mt-5">

                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      Product
                    </p>

                    <h4 className="font-black text-slate-900 mt-1 line-clamp-2">
                      {formData.name || 'Your Product Name'}
                    </h4>

                    <div className="flex items-center justify-between mt-3">

                      <span className="text-lg font-black text-purple-700">
                        {formData.price
                          ? `₹${formData.price}`
                          : '₹0'}
                      </span>

                      {formData.discount && (
                        <span className="
                          text-[10px]
                          font-black
                          uppercase
                          bg-green-100
                          text-green-700
                          px-2.5
                          py-1
                          rounded-full
                        ">
                          {formData.discount}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= SUBMIT AREA ================= */}
            <div className="
              mt-8
              pt-6
              border-t
              border-purple-100
              flex
              flex-col-reverse
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            ">

              <p className="text-xs text-gray-400">
                Fields marked required must be completed before publishing.
              </p>

              <button
                type="submit"
                className="
                  w-full
                  sm:w-auto
                  min-w-[220px]
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-xl
                  bg-gradient-to-r
                  from-purple-600
                  to-fuchsia-600
                  text-white
                  font-black
                  text-sm
                  uppercase
                  tracking-wider
                  shadow-lg
                  shadow-purple-500/20
                  hover:shadow-purple-500/30
                  hover:-translate-y-0.5
                  active:translate-y-0
                  transition-all
                "
              >
                <PackagePlus className="w-5 h-5" />
                Publish Product
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}