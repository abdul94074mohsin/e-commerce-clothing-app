import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productsList, setProductsList] = useState(() => {
    const saved = localStorage.getItem('app_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('app_products', JSON.stringify(productsList));
  }, [productsList]);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) * 2,
      rating: 5.0,
      reviewsCount: 0
    };
    setProductsList((prev) => [productWithId, ...prev]);
  };

  return (
    <ProductContext.Provider value={{ productsList, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);