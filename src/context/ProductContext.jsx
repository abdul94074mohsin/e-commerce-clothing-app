import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productsList, setProductsList] = useState(() => {
    const saved = localStorage.getItem('app_products');

    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Products ko localStorage mein save karna
  useEffect(() => {
    try {
      localStorage.setItem(
        'app_products',
        JSON.stringify(productsList)
      );
    } catch (error) {
      console.error('Unable to save products:', error);
      alert(
        'Storage limit reached. Large product images cannot be saved in browser storage.'
      );
    }
  }, [productsList]);

  // =========================
  // ADD PRODUCT
  // =========================
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      originalPrice:
        Number(newProduct.originalPrice) ||
        Number(newProduct.price) * 2,
      rating: 5.0,
      reviewsCount: 0
    };

    setProductsList((prev) => [
      productWithId,
      ...prev
    ]);
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  const updateProduct = (productId, updatedProduct) => {
    setProductsList((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              ...updatedProduct,
              id: productId,
              price: Number(updatedProduct.price),
              originalPrice:
                Number(updatedProduct.originalPrice) ||
                Number(updatedProduct.price) * 2
            }
          : product
      )
    );
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = (productId) => {
    setProductsList((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        productsList,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () =>
  useContext(ProductContext);