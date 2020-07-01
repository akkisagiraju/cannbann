const listRouter = require('express').Router();
require('express-async-errors');
const jwt = require('jsonwebtoken');
const List = require('../models/List');
const Card = require('../models/Card');

listRouter.post('/lists', async (request, response) => {
  const { title, boardId } = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY);
  const { id: userId, name: userName } = decodedToken;

  const newListItem = {
    title,
    boardId,
    createdBy: {
      id: userId,
      name: userName
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const list = new List(newListItem);
  await list.save();

  return response.status(200).send({ message: 'List created successfully!' });
});

listRouter.get('/lists', async (request, response) => {
  const lists = await List.find({}).populate({ path: 'cards', model: 'Card' });
  return response.status(200).json(lists);
});

listRouter.get('/lists/:id', async (request, response) => {
  const { id } = request.params;
  const list = await List.findById(id);
  if (!list) {
    return response
      .status(400)
      .send({ message: 'No list by the id is found.' });
  }
  return response.status(200).json(list);
});

listRouter.put('/lists/:id', async (request, response) => {
  const { id } = request.params;
  const { title } = request.body;
  const updatedList = {
    title,
    updatedAt: new Date().toISOString()
  };

  await List.findByIdAndUpdate(id, updatedList, { useFindAndModify: false });
  return response.status(200).send({ message: 'List updated successfully!' });
});

listRouter.delete('/lists/:id', async (request, response) => {
  const { id } = request.params;

  await List.findByIdAndDelete(id);
  await Card.deleteMany({ listId: id });
  return response.status(200).send({ message: 'List deleted successfully!' });
});

module.exports = listRouter;
