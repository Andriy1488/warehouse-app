import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  padding: 10px 18px;
  border: 0;
  border-radius: 8px;
  background: #1957b2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #124387; }
  &:disabled { background: #6b7c90; cursor: not-allowed; }
`;

export default function AppButton({ type = 'button', onClick, disabled = false, children }) {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
}
