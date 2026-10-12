import React from 'react';
import styled from 'styled-components';

const Summary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  & > p {
    flex: 1;
    min-width: 180px;
    margin: 0;
    padding: 20px;
    border-radius: 12px;
    background: #e6eefb;
  }
  strong { display: block; font-size: 28px; }
`;

export default function WarehouseSummary({ items }) {
  const capacity = items.reduce((sum, item) => sum + item.capacity, 0);
  const occupied = items.reduce((sum, item) => sum + item.occupied, 0);
  return (
    <Summary>
      <p>Складів<strong>{items.length}</strong></p>
      <p>Зайнято місць<strong>{occupied}</strong></p>
      <p>Вільно місць<strong>{capacity - occupied}</strong></p>
    </Summary>
  );
}
