import styled from 'styled-components';

interface CardProps {
  flex?: boolean;
  column?: boolean;
}

const Card = styled.div`
  display: ${(props: CardProps) => (props.flex ? 'flex' : 'block')};
  flex-direction: ${(props: CardProps) => (props.column ? 'column' : 'row')};
  background-color: #fff;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  padding: 25px 40px;
  font-family: inherit;
`;

export default Card;
