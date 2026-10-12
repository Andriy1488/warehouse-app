import React from 'react';
import { Card, MutedText } from '../styles/ui';
import StockBadge from './StockBadge';
import EmptyState from './EmptyState';

export default function ProductCard({ product }) {
  const quantity = product.placements.reduce((sum, placement) => sum + placement.quantity, 0);
  return (
    <Card>
      <h3>{product.name}</h3>
      <MutedText>Артикул: {product.sku}</MutedText>
      <p><StockBadge quantity={quantity} unit={product.unit} /></p>
      {product.placements.length === 0 ? (
        <EmptyState message="Товар ще не розміщено на складах." />
      ) : (
        <ul>
          {product.placements.map((placement) => (
            <li key={placement.warehouseId}>
              {placement.warehouseName}: {placement.quantity} {product.unit}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
