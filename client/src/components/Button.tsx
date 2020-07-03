import styled from 'styled-components';

interface ButtonProps {
  info?: boolean;
  bold?: boolean;
}

const Button = styled.button`
  color: #fff;
  font-family: inherit;
  font-weight: ${(props: ButtonProps) => (props.bold ? 700 : 400)};
  font-size: 1em;
  background-color: ${(props: ButtonProps) =>
    props.info ? '#5AAC44' : '#FFF'};
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
`;

export default Button;
