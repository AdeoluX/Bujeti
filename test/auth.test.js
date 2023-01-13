const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
// const { generateToken } = require('../src/utils/tokenManagement');
// const httpStatus = require('http-status');
// const mongoose = require('mongoose');
//
describe('Authentication', () => {
  test('should log in provider', async () => {
    const res = await request.post('/api/v2/auth/provider-login').send({
      email: 'bolajibalogun@gmail.com',
      password: '123456789',
    });
    //   .set(`Authorization`, `Bearer ${token.access_token}`)

    // console.log(res.body);
    expect(res.statusCode).toEqual(200);
  });

  test('should log in admin', async () => {
    const res = await request.post('/api/v2/auth/admin-login').send({
      email: 'admin@gmail.com',
      password: '123456789',
    });
    //   .set(`Authorization`, `Bearer ${token.access_token}`)

    // console.log(res.body);
    expect(res.statusCode).toEqual(200);
  });
  it('should register provider', async () => {
    const res = await request.post('/api/v2/auth/provider-signup').send({
      email: 'juwontayo@gmail.com',
      password: 'qwertyuiop[]',
      confirmPassword: 'qwertyuiop[]',
      name: 'Juwon',
      phone: '08089622403',
      bio: 'lorem ipsum',
    });
    //   .set(`Authorization`, `Bearer ${token.access_token}`)

    // console.log(res.body);
    expect(res.statusCode).toEqual(200);
  });
});

// /get-my-prayers
