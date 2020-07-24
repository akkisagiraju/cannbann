import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HomeContainer = styled(Container)`
  flex-direction: column;
  position: relative;
  h1 {
    margin: 0;
  }
`;

export const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1200px;
  padding: 25px 75px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 25px 40px;
  }

  @media (max-width: 450px) {
    width: 100%;
    padding: 25px 30px;
  }
`;

export const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 25px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 25px 40px;
  }

  @media (max-width: 450px) {
    width: 100%;
    padding: 25px 30px;
  }
`;
