import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { lightTheme } from '../theme/themes';
import useAuth from '../hooks/useAuth';

const Nav = styled.div`
  padding: 0 100px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.palette.primaryBackground};
  height: 60px;
  color: #fff;
`;

Nav.defaultProps = {
  theme: lightTheme
};

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const logoutHandler = (): void => {
    history.push('/');
    logout();
  };

  return (
    <Nav>
      <h1>Kanban</h1>
      <Link onClick={logoutHandler}>Logout</Link>
    </Nav>
  );
};

export default Navbar;
