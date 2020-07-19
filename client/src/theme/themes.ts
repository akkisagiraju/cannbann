import { createGlobalStyle } from 'styled-components';

export interface Palette {
  primaryColor: String;
  primaryBackground: String;
}

export interface Typography {
  fontSize: String;
}

export interface Theme {
  palette: Palette;
  typography: Typography;
}

export const lightTheme: Theme = {
  palette: {
    primaryColor: '#092042',
    primaryBackground: '#2E42B0'
  },
  typography: {
    fontSize: '14px'
  }
};

export const GlobalStyle = createGlobalStyle`
  body {
    color: #092042;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
`;
