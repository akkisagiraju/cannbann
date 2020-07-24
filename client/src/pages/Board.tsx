import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { useHistory, useParams } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import axios from '../config/axios';
import useAuth from '../hooks/useAuth';
import { HomeContainer, ListsContainer } from '../styles/Container';
import { Button, ButtonGroup } from '../styles/Button';
import Grid from '../styles/Grid';
import Modal from '../components/Modal';

interface ListObject {
  id: string;
  title: string;
}

const StyledInput = styled.input`
  border: none;
  font-size: 24px;
  text-align: center;
  align-self: center;
`;

const Board: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [lists, setLists] = React.useState<ListObject[]>([]);
  const [listName, setListName] = React.useState<string>('');

  const { user } = useAuth();
  const history = useHistory();
  const { id } = useParams();

  const getAllLists = React.useCallback(
    async (id) => {
      const response = await axios.get('/api/lists', {
        params: { boardId: id },
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      });
      setLists(response.data);
    },
    [id]
  );

  React.useEffect(() => {
    getAllLists(id);
  }, [getAllLists]);

  const handleDragEnd = React.useCallback(() => {
    console.log('hello');
  }, []);

  const createList = async () => {
    const response = await axios.post(
      '/api/lists',
      { title: listName, boardId: id },
      {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      }
    );
    console.log(response);
    setListName('');
    setIsModalOpen(false);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div id="modal" />
      <HomeContainer className="main-container">
        <ListsContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h1>Board Name here</h1>
            <Button
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => setIsModalOpen(true)}
            >
              <span>Add List</span>{' '}
              <MdAddBox style={{ marginLeft: 4, height: 18, width: 18 }} />
            </Button>
          </div>
          <Grid />
        </ListsContainer>
        <Modal open={isModalOpen} setOpen={setIsModalOpen}>
          <StyledInput
            type="text"
            name="list-name"
            value={listName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setListName(event.target.value)
            }
            placeholder="Enter list name..."
          />
          <ButtonGroup>
            <Button outline onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createList}>Add</Button>
          </ButtonGroup>
        </Modal>
      </HomeContainer>
    </DragDropContext>
  );
};

export default Board;
