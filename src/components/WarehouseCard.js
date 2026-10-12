import React from 'react';
import { Card, MutedText } from '../styles/ui';
import CapacityBadge from './CapacityBadge';

export default function WarehouseCard({ warehouse }) {
  return (
    <Card>
      <h3>{warehouse.name}</h3>
      <MutedText>{warehouse.address}</MutedText>
      <p>Зайнято: {warehouse.occupied} з {warehouse.capacity} місць</p>
      <p>Вільно: {warehouse.capacity - warehouse.occupied} місць</p>
      <CapacityBadge occupied={warehouse.occupied} capacity={warehouse.capacity} />
    </Card>
  );
}
