const teamRouter = require('express').Router();
require('express-async-errors');
const jwt = require('jsonwebtoken');
const Team = require('../models/Team');

teamRouter.post('/teams', async (request, response) => {
  const { name, members } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY);
  const { id: userId, name: userName } = decodedToken;

  const newTeam = {
    name,
    members: members || [],
    createdBy: { id: userId, name: userName },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const team = new Team(newTeam);
  await team.save();

  return response.status(200).send({ message: 'Team created successfully!' });
});

teamRouter.get('/teams', async (request, response) => {
  const teams = await Team.find({}); // populate members later
  return response.status(200).json(teams);
});

teamRouter.get('/teams/:id', async (request, response) => {
  const { id } = request.params;
  const team = await Team.findById(id);
  if (!team) {
    return response
      .status(400)
      .send({ message: 'No team by the id is found.' });
  }
  return response.status(200).json(team);
});

module.exports = teamRouter;
