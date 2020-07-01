/* eslint-disable node/no-unpublished-require */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');
const { generatePasswordHash } = require('../utils/helper');
const { usersInDb } = require('./testHelper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await generatePasswordHash('hssshsecret');
  const user = new User({ name: 'root', email: 'test@test.com', passwordHash });
  await user.save();
});

test('Token is returned after a user logs in successfully', async () => {
  const userToBeLoggedIn = {
    email: 'test@test.com',
    password: 'hssshsecret'
  };

  const response = await api
    .post('/auth/signin')
    .send(userToBeLoggedIn)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body.token).toBeDefined();
});

test('User creation is successful with a new user', async () => {
  const usersAtStart = await usersInDb();

  const newUser = {
    name: 'Akhil',
    email: 'akhil@me.com',
    password: '123456789'
  };

  await api
    .post('/auth/signup')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const users = usersAtEnd.map((user) => user.name);
  expect(users).toContain(newUser.name);
});

test('Sign up fails if password is less than 3 characters', async (done) => {
  const invalidUser = {
    name: 'Akhil',
    email: 'ak@me.com',
    password: '12'
  };

  const response = await api
    .post('/auth/signup')
    .send(invalidUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(response.text).toContain('Password has to be more than 3 characters');
  done();
});

afterAll(() => {
  mongoose.connection.close();
});
