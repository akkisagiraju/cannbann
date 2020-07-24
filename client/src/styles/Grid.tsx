import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  padding: 25px 0px;
  overflow: auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

export default Grid;
