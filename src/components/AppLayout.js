import React from 'react';
import styled from 'styled-components';
import SiteHeader from './SiteHeader';
import GlobalStyle from '../styles/GlobalStyle';

const Main = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 36px 24px 60px;
`;

export default function AppLayout({ title, links, children }) {
  return (
    <>
      <GlobalStyle />
      <SiteHeader title={title} links={links} />
      <Main id="main-content">{children}</Main>
    </>
  );
}
