import React from 'react';
import { CardGrid } from '../styles/ui';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

export default function ProductList({ items = [] }) {
  if (items.length === 0) return <EmptyState message="Товарів поки немає." />;
  return (
    <CardGrid>
      {items.map((product) => <ProductCard key={product.id} product={product} />)}
    </CardGrid>
  );
}
