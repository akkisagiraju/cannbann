const boardRouter = require('express').Router();
const Board = require('../models/Board');

boardRouter.post('/board', async (request, response) => {
  const { name, background, orgId, members } = response.body;

  const boardItem = {
    name,
    background: background || 'blue',
    orgId: orgId || '',
    members: members || [],
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString()
  };

  const board = new Board(boardItem);
  await board.save();

  return response.status(200).send({ message: 'Board created successfully' });
});
