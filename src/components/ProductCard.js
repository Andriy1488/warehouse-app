import React, { useState } from 'react';
import { Card, MutedText } from '../styles/ui';
import StockBadge from './StockBadge';
import EmptyState from './EmptyState';
import AppButton from './AppButton';
import { Link } from 'react-router-dom';



export default function ProductCard({ product, selected, onSelect }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  <MutedText>Артикул: {product.sku}</MutedText>

  const quantity = product.placements.reduce(
    (sum, placement) => sum + placement.quantity,
    0
  );

  return (
    <Card>
      <h3>{product.name}</h3>
      <MutedText>Артикул: {product.sku}</MutedText>

      <p>
        <StockBadge quantity={quantity} unit={product.unit} />
      </p>
      <p>
        <Link to={`/products/${product.id}`}>Детальніше про товар</Link>
      </p>

      <p>{selected ? '✓ Товар вибрано' : 'Товар не вибрано'}</p>

      <AppButton onClick={() => onSelect(selected ? null : product.id)}>
        {selected ? 'Скасувати вибір' : 'Вибрати для розміщення'}
      </AppButton>

      <div style={{ marginTop: 12 }}>
        <AppButton onClick={() => setDetailsOpen((previous) => !previous)}>
          {detailsOpen ? 'Приховати розміщення' : 'Показати розміщення'}
        </AppButton>
      </div>

      {detailsOpen && (
        <div style={{ marginTop: 16 }}>
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
        </div>
      )}
    </Card>
  );
}