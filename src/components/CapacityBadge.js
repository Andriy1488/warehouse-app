import React from 'react';
import styled from 'styled-components';

const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  background: ${({ $full }) => ($full ? '#fce5e5' : '#e4f3e9')};
  color: ${({ $full }) => ($full ? '#962626' : '#205937')};
  font-size: 14px;
  font-weight: bold;
`;

export default function CapacityBadge({ occupied, capacity }) {
  if (capacity <= 0) return <Badge $full>Місткість не задано</Badge>;
  const percent = Math.round((occupied / capacity) * 100);
  const full = occupied >= capacity;
  return (
    <Badge $full={full}>
      {full ? 'Склад заповнений' : 'Є вільні місця'} · {percent}%
    </Badge>
  );
}
