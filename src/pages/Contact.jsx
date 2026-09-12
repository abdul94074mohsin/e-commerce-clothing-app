import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send
} from 'lucide-react';

export default function Contact() {
  // 🔹 Yahan baad me apni real shop details add kar sakte ho
  const shopEmail = 'your-email@example.com';
  const shopPhone = '+91 XXXXX XXXXX';
  const shopLocation = 'Burhanpur, Madhya Pradesh, India';

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Thank you! Your message has been received.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">

      {/* ================= HERO ================= */}
      <section className="pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" />
              We'd Love To Hear From You
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900">
              Get In{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
                Touch
              </span>
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
              Have a question about our products, orders or anything else?
              Contact Purple Gallery and our team will be happy to help you.
            </p>

          </div>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

            {/* ================= LEFT INFO ================= */}
            <div className="lg:col-span-2">

              <div className="h-full rounded-3xl bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-800 p-6 sm:p-8 text-white shadow-xl shadow-purple-900/20 relative overflow-hidden">

                {/* Decorative circles */}
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10" />

                <div className="absolute -bottom-20 -left-16 w-48 h-48 rounded-full bg-fuchsia-400/10" />

                <div className="relative z-10">

                  <span className="text-purple-200 text-xs font-bold uppercase tracking-[0.2em]">
                    Purple Gallery
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black mt-3">
                    Let's Connect
                  </h2>

                  <p className="mt-3 text-purple-100 text-sm leading-relaxed">
                    We are here to help you with product information,
                    orders and customer support.
                  </p>

                  {/* Contact Details */}
                  <div className="mt-8 space-y-5">

                    {/* Email */}
                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>

                      <div>
                        <p className="text-xs text-purple-200 uppercase tracking-wider font-semibold">
                          Email
                        </p>

                        <p className="mt-1 text-sm font-semibold break-all">
                          {shopEmail}
                        </p>
                      </div>

                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>

                      <div>
                        <p className="text-xs text-purple-200 uppercase tracking-wider font-semibold">
                          Phone
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {shopPhone}
                        </p>
                      </div>

                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>

                      <div>
                        <p className="text-xs text-purple-200 uppercase tracking-wider font-semibold">
                          Location
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {shopLocation}
                        </p>
                      </div>

                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>

                      <div>
                        <p className="text-xs text-purple-200 uppercase tracking-wider font-semibold">
                          Business Hours
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Mon - Sat: 10:00 AM - 8:00 PM
                        </p>

                        <p className="text-xs text-purple-200 mt-1">
                          Sunday: Closed
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* WhatsApp */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Please add your WhatsApp number first.');
                    }}
                    className="mt-8 w-full flex items-center justify-center gap-2 bg-white text-purple-800 py-3.5 rounded-xl font-bold text-sm hover:bg-purple-50 transition-all shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>

                </div>
              </div>

            </div>

            {/* ================= RIGHT FORM ================= */}
            <div className="lg:col-span-3">

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-purple-100 shadow-xl shadow-purple-900/5 p-6 sm:p-8 lg:p-10">

                {/* Form Header */}
                <div className="mb-7">

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Send Us a Message
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    Fill out the form and we'll get back to you soon.
                  </p>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name */}
                  <div>

                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-slate-900 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                    />

                  </div>

                  {/* Email */}
                  <div>

                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-slate-900 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                    />

                  </div>

                  {/* Phone */}
                  <div>

                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-slate-900 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                    />

                  </div>

                  {/* Subject */}
                  <div>

                    <label
                      htmlFor="subject"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What can we help you with?"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-slate-900 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                    />

                  </div>

                  {/* Message */}
                  <div>

                    <label
                      htmlFor="message"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-slate-900 placeholder-gray-400 outline-none resize-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                    />

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:scale-[1.02] hover:shadow-purple-500/30 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}