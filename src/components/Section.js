import React from 'react';
import styled from 'styled-components';

const SectionBlock = styled.section`
  margin-top: 28px;
`;

export default function Section({ id, title, children }) {
  return (
    <SectionBlock id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </SectionBlock>
  );
}
