import app from './App';
import mongoose from 'mongoose';

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