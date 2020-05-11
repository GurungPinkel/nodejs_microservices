import request from 'supertest';

import app from '../../App';

it('should return 201 on successful signup', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'mypassword',
    })
    .expect(201);
});

it('should return 400 if email and password is not provided', async () => {
  return await request(app).post('/api/users/signup').send().expect(400);
});

it('should return 400 if email is invalid', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'mypassword',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: null,
      password: 'mypassword',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test',
      password: 'mypassword',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test',
      password: 'mypassword',
    })
    .expect(400);
});

it('should return 400 if password is invalid', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: null })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'my',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'myp',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'm',
    })
    .expect(400);
});

it('should not create users with the same email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'mypassword',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'mypassword',
    })
    .expect(400);
});

it('should expect cookie after a successful signup', async () => {
  const response = await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'mypassword',
  });
  expect(response.get('Set-Cookie')).toBeDefined();
});
