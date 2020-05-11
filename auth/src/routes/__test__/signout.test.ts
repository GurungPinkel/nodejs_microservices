import request from 'supertest';

import app from '../../App';

it('should clear the cookie after signing out', async () => {
  const signup = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'mypassword',
    })
    .expect(201);

  expect(signup.get('Set-Cookie')).toBeDefined();

  const signin = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'mypassword',
    })
    .expect(201);
  expect(signin.get('Set-Cookie')).toBeDefined();

  const signout = await request(app)
    .post('/api/users/signout')
    .send()
    .expect(200);
  expect(signout.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
