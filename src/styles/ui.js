import styled from 'styled-components';

export const CardGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Card = styled.li`
  padding: 24px;
  border: 1px solid #dbe3ee;
  border-radius: 12px;
  background: white;
`;

export const MutedText = styled.p`
  color: #52647c;
`;
