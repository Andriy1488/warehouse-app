import React from 'react';
import styled from 'styled-components';

const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  background: #edf0f6;
  color: #30445e;
  font-size: 14px;
  font-weight: bold;
`;

export default function StockBadge({ quantity, unit }) {
  return <Badge>{quantity > 0 ? `У наявності: ${quantity} ${unit}` : 'Немає в наявності'}</Badge>;
}
