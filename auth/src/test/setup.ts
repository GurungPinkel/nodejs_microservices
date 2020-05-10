import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../App';

declare global {
  namespace NodeJS {
    interface Global {
      signin?(): Promise<string[]>
    }
  }
}


let mongo: any;

global.signin = async () => {
  const email = "mytest@email.com";
  const password = "myAwesomePassword";

  const response = await request(app)
  .post("/api/users/signup")
  .send({
    email,
    password
  }).expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
}

beforeAll(async() => {
  process.env.JWT_KEY = 'fakejwtkey';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
})

beforeEach(async() => {

  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async() => {
  await mongo.stop();
  await mongoose.connection.close();
})