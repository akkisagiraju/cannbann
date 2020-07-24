import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import { Container, HomeContainer, BoardsContainer } from '../styles/Container';
import { Button, ButtonGroup } from '../styles/Button';
import axios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Grid from '../styles/Grid';
import Modal from '../components/Modal';

interface BoardProps {
  realboard?: boolean;
  justifySelf?: string;
}

interface BoardObject {
  id: string;
  title: string;
}

const Board = styled(Container)`
  flex-direction: column;
  align-content: space-around;
  height: 200px;
  width: 100%;
  background-color: #c4c4c4;
  border-radius: 8px;
  cursor: pointer;
  justify-self: ${(props: BoardProps) =>
    props.justifySelf ? props.justifySelf : 'start'};
`;

const StyledInput = styled.input`
  border: none;
  font-size: 24px;
  text-align: center;
  align-self: center;
`;

const Home: React.FC = () => {
  const [boardName, setBoardName] = React.useState<string>('');
  const [boards, setBoards] = React.useState<BoardObject[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const { user } = useAuth();
  const history = useHistory();

  const getAllBoards = React.useCallback(async () => {
    const response = await axios.get('/api/boards', {
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    });
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
    setBoardName('');
    getAllBoards();
    setIsModalOpen(false);
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
              <Board onClick={() => history.push(`/board/${b.id}`)} key={b.id}>
                {b.title}
              </Board>
            ))}
          </Grid>
        </BoardsContainer>
        <Modal open={isModalOpen} setOpen={setIsModalOpen}>
          <StyledInput
            type="text"
            name="board-name"
            value={boardName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setBoardName(event.target.value)
            }
            placeholder="Enter board name..."
          />
          <ButtonGroup>
            <Button outline onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createBoard}>Add</Button>
          </ButtonGroup>
        </Modal>
      </HomeContainer>
    </>
  );
};

export default Home;
