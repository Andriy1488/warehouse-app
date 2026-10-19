import { useState } from 'react';

export default function useProductFilters(products) {
  const [query, setQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const visibleProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    const totalQuantity = product.placements.reduce(
      (sum, placement) => sum + placement.quantity,
      0
    );

    return matchesSearch && (!inStockOnly || totalQuantity > 0);
  });

  return {
    query,
    setQuery,
    inStockOnly,
    setInStockOnly,
    visibleProducts,
  };
}