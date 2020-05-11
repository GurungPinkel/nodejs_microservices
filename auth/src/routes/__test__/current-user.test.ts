import request from 'supertest';

import app from '../../App';

it('should return the details of the current user', async () => {
  const signup = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'mypassword',
    })
    .expect(201);

  const cookie = signup.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('should return null if user is not logged in', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
