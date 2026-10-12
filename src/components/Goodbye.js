import React from 'react';
import styled from 'styled-components';

const Message = styled.p`
  color: #6e39a4;
  font-weight: bold;
`;

export default function Goodbye() {
  return <Message>До побачення, React!</Message>;
}
