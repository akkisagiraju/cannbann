const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('Basic test', () => {
  test('get /user returns 200 status', async () => {
    await api.get('/user').expect(200);
  });
});
