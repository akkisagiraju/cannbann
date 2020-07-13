import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '../theme/themes';

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.palette.primaryBackground};
  height: 60px;
  color: #fff;
`;

Nav.defaultProps = {
  theme: lightTheme
};

const Navbar: React.FC = () => {
  return (
    <Nav>
      <h1>Kanban</h1>
      <p>Logout</p>
    </Nav>
  );
};

export default Navbar;
