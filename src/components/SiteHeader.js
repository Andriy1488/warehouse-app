import React from 'react';
import styled from 'styled-components';
import MainNav from './MainNav';

const Header = styled.header`
  background: #17345c;
  color: white;
`;

const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Brand = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
`;

export default function SiteHeader({ title, links }) {
  return (
    <Header>
      <HeaderContent>
        <Brand>{title}</Brand>
        <MainNav links={links} />
      </HeaderContent>
    </Header>
  );
}
