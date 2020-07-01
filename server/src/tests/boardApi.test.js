/* eslint-disable node/no-unpublished-require */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Board = require('../models/Board');
const testHelper = require('./testHelper');

const api = supertest(app);

let testToken = '';

beforeAll(async () => {
  await testHelper.saveTestUserToDb();
  const response = await api.post('/auth/signin').send(testHelper.testUser);
  testToken = `Bearer ${response.body.token}`;
});

beforeEach(async () => {
  await Board.deleteMany({});

  let board = new Board(testHelper.initialBoards[0]);
  await board.save();

  board = new Board(testHelper.initialBoards[1]);
  await board.save();
});

describe('where some boards are saved initially', () => {
  test('returns 401 error if there is no Auth token', async (done) => {
    await api.get('/api/boards').expect(401);
    done();
  });

  test('boards are returned as JSON', async (done) => {
    await api
      .get('/api/boards')
      .set('Authorization', testToken)
      .expect(200)
      .expect('Content-type', /application\/json/);

    done();
  });
});

describe('when a new board is created', () => {
  test('the number of boards in the db is incremented by one', async () => {
    const boardsAtStart = await Board.find({});
    const newBoard = new Board({
      title: 'Random Board'
    });
    await newBoard.save();
    const boardsAtEnd = await Board.find({});
    expect(boardsAtEnd).toHaveLength(boardsAtStart.length + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
