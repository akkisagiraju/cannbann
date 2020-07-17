import React from 'react';
import styled from 'styled-components';
import Container from '../styles/Container';
import Button from '../styles/Button';
import axios from '../config/axios';
import useAuth from '../hooks/useAuth';

interface BoardProps {
  realboard?: boolean;
}

interface BoardObject {
  id: string;
  title: string;
}

const HomeContainer = styled(Container)`
  flex-direction: column;
`;

const BoardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`;

const Board = styled(Container)`
  flex-direction: column;
  align-content: space-around;
  height: 150px;
  width: 250px;
  background-color: #fff;
  border: ${(props: BoardProps) =>
    props.realboard ? 'none' : '2px solid #5AAC44'};
  border-radius: 8px;
`;

const Home: React.FC = () => {
  const [addingBoard, setAddingBoard] = React.useState<boolean>(false);
  const [boardName, setBoardName] = React.useState<string>('');
  const [boards, setBoards] = React.useState<BoardObject[]>([]);
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
    <HomeContainer>
      <h1>Browse Boards</h1>
      <BoardsContainer>
        <Board>
          <Button bold outline onClick={() => setAddingBoard(true)}>
            Add a new board
          </Button>
        </Board>
        {addingBoard ? (
          <Board>
            <input
              type="text"
              value={boardName}
              placeholder="Enter board name"
              style={{
                border: 'none',
                textAlign: 'center',
                fontFamily: 'inherit',
                fontSize: 16,
                padding: 8
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBoardName(e.target.value)
              }
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '60%',
                marginTop: 16
              }}
            >
              <Button bold outline onClick={() => setAddingBoard(false)}>
                Cancel
              </Button>
              <Button bold onClick={createBoard}>
                Create
              </Button>
            </div>
          </Board>
        ) : null}
        {boards.map((b) => (
          <Board key={b.id}>{b.title}</Board>
        ))}
      </BoardsContainer>
    </HomeContainer>
  );
};

export default Home;
