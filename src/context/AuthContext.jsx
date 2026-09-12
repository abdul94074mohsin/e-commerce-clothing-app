import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shop_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Temporary React-only admin account
    if (
      email === 'admin@shop.com' &&
      password === 'Admin@123'
    ) {
      const adminUser = {
        email,
        role: 'admin',
        name: 'Shop Admin'
      };

      setUser(adminUser);
      localStorage.setItem('shop_user', JSON.stringify(adminUser));

      return true;
    }

    // Temporary React-only customer account
    if (
      email === 'customer@shop.com' &&
      password === 'Customer@123'
    ) {
      const customerUser = {
        email,
        role: 'user',
        name: 'Customer'
      };

      setUser(customerUser);
      localStorage.setItem('shop_user', JSON.stringify(customerUser));

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shop_user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}