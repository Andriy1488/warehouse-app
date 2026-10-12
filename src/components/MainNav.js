import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MenuLink = styled(NavLink)`
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  &.active { background: white; color: #17345c; }
  &:hover { text-decoration: underline; }
`;

export default function MainNav({ links }) {
  return (
    <Nav aria-label="Основна навігація">
      {links.map((link) => (
        <MenuLink key={link.to} to={link.to} end={link.to === '/'}>
          {link.label}
        </MenuLink>
      ))}
    </Nav>
  );
}
