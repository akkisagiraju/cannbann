const jwt = require('jsonwebtoken');
const boardRouter = require('express').Router();
const Board = require('../models/Board');
const logger = require('../utils/logger');

boardRouter.post('/boards', async (request, response) => {
  const { title, backgroundColor, teamId, members } = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY);
  const { id: userId, name: userName } = decodedToken;

  const boardItem = {
    title,
    backgroundColor: backgroundColor || 'blue',
    teamId: teamId || '',
    members: members || [],
    createdBy: { id: userId, name: userName },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const board = new Board(boardItem);
  await board.save();

  return response.status(200).send({ message: 'Board created successfully' });
});

boardRouter.get('/boards', async (request, response) => {
  const boards = await Board.find({});
  return response.status(200).json(boards);
});

boardRouter.get('/boards/:id', async (request, response) => {
  const { id } = request.params;
  const board = await Board.findById(id);
  if (!board) {
    return response
      .status(400)
      .send({ message: 'No board by the id is found.' });
  }
  return response.status(200).json(board);
});

boardRouter.delete('/boards/:id', async (request, response) => {
  const { id } = request.params;
  await Board.findByIdAndDelete(id);
  return response.status(200).send({ message: 'Board deleted successfully!' });
});

module.exports = boardRouter;
