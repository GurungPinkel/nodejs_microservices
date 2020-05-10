import request from 'supertest';

import app from '../../App';

beforeEach( async() =>{
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password:'mypassword'
  }).expect(201);
});

it('should return status code 200 and cookie when logged in successfully', async () => {
  const response = await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password:'mypassword'
  });
  expect(response.get('Set-Cookie')).toBeDefined();
  expect(response.status).toEqual(201);
})

it('should fail when trying to login with invalid email', async () => {

  await request(app)
  .post('/api/users/signin')
  .send({
    email: null,
    password:'mypassword'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.coms',
    password:'mypassword'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test',
    password:'mypassword'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test',
    password:'mypassword'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'st@test.com1',
    password:'mypassword'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({    
    password:'mypassword'
  }).expect(400);


});

it('should fail when trying to login with invalid password', async () => {

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password:'mys'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password:'test@test.com'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password:'-'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password:'mypa'
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password:''
  }).expect(400);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',    
  }).expect(400);
});