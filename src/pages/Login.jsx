import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setIsLoading(true);

    const success = login(email, password);

    if (!success) {
      setError('Invalid email or password.');
      setIsLoading(false);
      return;
    }

    // Admin login
    if (email === 'admin@shop.com') {
      navigate('/admin');
      return;
    }

    // Customer login
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-6 sm:p-8">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
              <LogIn
                size={30}
                className="text-purple-600"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-500">
              Login to your Purple Gallery account
            </p>

          </div>


          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}


          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />

              </div>

            </div>


            {/* Password */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

          </form>


          {/* Demo Credentials */}
          <div className="mt-7 pt-6 border-t border-gray-200">

            <p className="text-center text-xs font-semibold text-gray-500 mb-3">
              TEST LOGIN
            </p>

            <div className="space-y-2 text-xs text-gray-600">

              <div className="bg-purple-50 rounded-lg p-3">
                <p className="font-semibold text-purple-700">
                  Admin
                </p>

                <p>
                  Email: admin@shop.com
                </p>

                <p>
                  Password: Admin@123
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-gray-700">
                  Customer
                </p>

                <p>
                  Email: customer@shop.com
                </p>

                <p>
                  Password: Customer@123
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}