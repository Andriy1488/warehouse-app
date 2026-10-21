import { useSearchParams } from 'react-router-dom';

export default function useProductFilters(products) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const inStockOnly = searchParams.get('inStock') === '1';

  function setQuery(value) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      if (value.trim()) {
        next.set('q', value);
      } else {
        next.delete('q');
      }

      return next;
    }, { replace: true });
  }

  function setInStockOnly(value) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      if (value) {
        next.set('inStock', '1');
      } else {
        next.delete('inStock');
      }

      return next;
    });
  }

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