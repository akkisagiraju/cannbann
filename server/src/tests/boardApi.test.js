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
  test('boards are returned as JSON', async (done) => {
    await api
      .get('/api/boards')
      .set('Authorization', testToken)
      .expect(200)
      .expect('Content-type', /application\/json/);

    done();
  });
});
