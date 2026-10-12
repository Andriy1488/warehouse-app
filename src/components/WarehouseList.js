import React from 'react';
import { CardGrid } from '../styles/ui';
import WarehouseCard from './WarehouseCard';
import EmptyState from './EmptyState';

export default function WarehouseList({ items = [] }) {
  if (items.length === 0) return <EmptyState message="Складів поки немає." />;
  return (
    <CardGrid>
      {items.map((warehouse) => (
        <WarehouseCard key={warehouse.id} warehouse={warehouse} />
      ))}
    </CardGrid>
  );
}
