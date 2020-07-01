const Board = require('../models/Board');
const User = require('../models/User');
const { generatePasswordHash } = require('../utils/helper');

const initialBoards = [
  {
    title: 'Test Board 1',
    backgroundColor: 'green',
    list: [],
    members: [],
    createdBy: {
      id: '',
      name: ''
    }
  },
  {
    title: 'Test Board 2',
    backgroundColor: 'blue',
    list: [],
    members: [],
    createdBy: {
      id: '',
      name: ''
    }
  }
];

const boardsInDb = async () => {
  const boards = await Board.find({});
  return boards.map((board) => board.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const saveTestUserToDb = async () => {
  const passwordHash = await generatePasswordHash('hssshsecret');
  const user = new User({ name: 'root', email: 'test@me.com', passwordHash });
  await user.save();
};

const testUser = {
  email: 'test@me.com',
  password: 'hssshsecret'
};

module.exports = {
  initialBoards,
  boardsInDb,
  usersInDb,
  saveTestUserToDb,
  testUser
};
