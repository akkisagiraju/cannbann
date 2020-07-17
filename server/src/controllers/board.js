const boardRouter = require('express').Router();
require('express-async-errors');
const jwt = require('jsonwebtoken');
const Board = require('../models/Board');

boardRouter.post('/boards', async (request, response) => {
  const { title, backgroundColor } = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY);
  const { id: userId } = decodedToken;

  const boardItem = {
    title,
    backgroundColor: backgroundColor || 'blue',
    // team: team || {},
    // members: members || [],
    createdBy: userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const board = new Board(boardItem);
  await board.save();

  return response.status(200).send({ message: 'Board created successfully' });
});

boardRouter.get('/boards', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY);
  const { id } = decodedToken;
  console.log(id);
  const boards = await Board.find({ createdBy: id });
  console.log(boards);
  return response.status(200).json(boards);
});

boardRouter.get('/boards/:id', async (request, response) => {
  const { id } = request.params;
  const board = await Board.findById(id);
  if (!board) {
    return response.status(400).send({ message: 'No board by the id is found.' });
  }
  return response.status(200).json(board);
});

boardRouter.put('/boards/:id', async (request, response) => {
  const { id } = request.params;
  const keys = Object.keys(request.body);
  const updatedBoard = { updatedAt: new Date().toISOString };
  keys.forEach((key) => {
    if (request.body[`${key}`]) {
      updatedBoard[`${key}`] = request.body[`${key}`];
    }
  });

  await Board.findByIdAndUpdate(id, updatedBoard, { useFindAndModify: false });
  return response.status(200).send({ message: 'Board updated successfully!' });
});

boardRouter.delete('/boards/:id', async (request, response) => {
  const { id } = request.params;
  await Board.findByIdAndDelete(id);
  return response.status(200).send({ message: 'Board deleted successfully!' });
});

module.exports = boardRouter;
