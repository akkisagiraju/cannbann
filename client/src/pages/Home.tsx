import React from 'react';
import styled from 'styled-components';
import { MdAddBox } from 'react-icons/md';
import Container from '../styles/Container';
import Button from '../styles/Button';
import axios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Grid from '../styles/Grid';
import ModalContainer from '../components/Modal';

interface BoardProps {
  realboard?: boolean;
  justifySelf?: string;
}

interface BoardObject {
  id: string;
  title: string;
}

const HomeContainer = styled(Container)`
  flex-direction: column;
  position: relative;
  h1 {
    margin: 0;
  }
`;

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1200px;
  padding: 25px 75px;
  box-sizing: border-box;
`;

const Board = styled(Container)`
  flex-direction: column;
  align-content: space-around;
  height: 200px;
  width: 300px;
  background-color: #c4c4c4;
  border-radius: 8px;
  justify-self: ${(props: BoardProps) =>
    props.justifySelf ? props.justifySelf : 'start'};
`;

const Home: React.FC = () => {
  const [addingBoard, setAddingBoard] = React.useState<boolean>(false);
  const [boardName, setBoardName] = React.useState<string>('');
  const [boards, setBoards] = React.useState<BoardObject[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const { user } = useAuth();

  const getAllBoards = React.useCallback(async () => {
    const response = await axios.get('/api/boards', {
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    });
    console.log(response.data);
    setBoards(response.data);
  }, []);

  React.useEffect(() => {
    getAllBoards();
  }, [getAllBoards]);

  const createBoard = async () => {
    const response = await axios.post(
      '/api/boards',
      { title: boardName },
      {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      }
    );
    console.log(response);
    setAddingBoard(false);
    setBoardName('');
    getAllBoards();
  };

  return (
    <>
      <div id="modal" />
      <HomeContainer className="main-container">
        <BoardsContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h1>Browse Boards</h1>
            <Button
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => setIsModalOpen(true)}
            >
              <span>Add board</span>{' '}
              <MdAddBox style={{ marginLeft: 4, height: 18, width: 18 }} />
            </Button>
          </div>
          <Grid>
            {boards.map((b, index) => (
              <Board key={b.id}>{b.title}</Board>
            ))}
          </Grid>
        </BoardsContainer>
        {isModalOpen ? (
          <ModalContainer setOpen={setIsModalOpen}>Hello</ModalContainer>
        ) : null}
      </HomeContainer>
    </>
  );
};

export default Home;
