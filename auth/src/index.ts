import express from 'express';
import cookieSession from 'cookie-session';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import {errorHandler} from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));
// const routers = 

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', () => {
  throw new NotFoundError();
})

app.use(errorHandler);

const start =  () => {
  if( !process.env.JWT_KEY ){
    throw new Error("JWT Key must be defined");
  }
  mongoose.connect('mongodb://auth-mongo-service:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  }).then(
    () => { 
      console.log("connected!!");
      app.listen(3000 , () => {
        console.log("Auth is listening on port 3000!!");
      });
    },
    err => { console.log("Error Mongoose ");}
  );  
}

start();