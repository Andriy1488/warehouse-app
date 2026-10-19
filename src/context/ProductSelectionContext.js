import React, { createContext, useContext, useState } from 'react';

const ProductSelectionContext = createContext(null);

export function ProductSelectionProvider({ children }) {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <ProductSelectionContext.Provider
      value={{ selectedProductId, setSelectedProductId }}
    >
      {children}
    </ProductSelectionContext.Provider>
  );
}

export function useProductSelection() {
  const context = useContext(ProductSelectionContext);

  if (context === null) {
    throw new Error('useProductSelection має використовуватися всередині ProductSelectionProvider');
  }

  return context;
}