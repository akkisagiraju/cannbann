import styled from 'styled-components';

interface ButtonProps {
  info?: boolean;
  bold?: boolean;
  outline?: boolean;
}

const Button = styled.button`
  color: ${(props: ButtonProps) => (props.outline ? '#5AAC44' : '#FFF')};
  font-family: inherit;
  font-weight: ${(props: ButtonProps) => (props.bold ? 700 : 400)};
  font-size: 1em;
  background-color: ${(props: ButtonProps) =>
    props.info ? '#5AAC44' : '#FFF'};
  border: none;
  padding: 6px 8px;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
`;

export default Button;
