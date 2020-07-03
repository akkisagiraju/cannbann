import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '../theme/themes';

const NavContainer = styled.div`
  background-color: ${(props) => props.theme.palette.primaryBackground};
`;

NavContainer.defaultProps = {
  theme: lightTheme
};

const TopBar = () => {
  return (
    <NavContainer>
      <button>Press me</button>
    </NavContainer>
  );
};

export default TopBar;
