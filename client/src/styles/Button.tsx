import styled from 'styled-components';

interface ButtonProps {
  bold?: boolean;
  outline?: boolean;
}

export const Button = styled.button`
  color: ${(props: ButtonProps) => (props.outline ? '#2E42B0' : '#FFF')};
  font-family: inherit;
  font-weight: ${(props: ButtonProps) => (props.bold ? 700 : 400)};
  font-size: 1em;
  background-color: ${(props: ButtonProps) =>
    props.outline ? '#FFF' : '#2E42B0'};
  border: 1px solid #2e42b0;
  min-width: 80px;
  padding: 6px 8px;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
  cursor: pointer;
`;

export const TextButton = styled.button`
  color: #2e42b0;
  box-shadow: none;
  border: none;
  font-size: 1em;
  font-weight: 700;
`;

export const ButtonGroup = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;
