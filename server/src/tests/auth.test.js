/* eslint-disable node/no-unpublished-require */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');

const api = supertest(app);

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

beforeEach(async () => {
  await User.deleteMany({});

  const SALT_ROUNDS = 10;
  const TEST_PASSWORD = 'hssshsecret';

  const passwordHash = await bcrypt.hash(TEST_PASSWORD, SALT_ROUNDS);
  const user = new User({ name: 'root', email: 'test@test.com', passwordHash });

  await user.save();
});

test('User creation is successful with a new user', async () => {
  const usersAtStart = await usersInDb();

  const newUser = {
    name: 'Akhil',
    email: 'akhil@me.com',
    password: '123456789'
  };

  await api
    .post('/api/signup')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const users = usersAtEnd.map((user) => user.name);
  expect(users).toContain(newUser.name);
});

afterAll(async () => {
  await mongoose.connection.close();
});
