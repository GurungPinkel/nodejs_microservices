import express, {Request, Response, NextFunction} from 'express';
import  { body } from 'express-validator';
import validateRequest from '../middlewares/validate-request'
import User from '../models/user';
import BadRequestError from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

const signInRouter = router.post("/api/users/signin", [
  body('email')
  .isEmail()
  .withMessage("Invalid Email"),
  body('password')
  .trim()
  .notEmpty()
  .withMessage("Invalid Password")
],validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({email});

  if( !existingUser ) {
    req.session = null;
    return next(new BadRequestError("Invalid Credentials!"));
  }
  
  const isPasswordMatch = Password.compare(existingUser.password, password);

  if(!isPasswordMatch){
    req.session = null;
    return next(new BadRequestError("Invalid Credentials!"));
  }
  
  //Generate JWT
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!
  );

  req.session = {
    jwt: userJwt
  };

  return res.status(201).send(existingUser);
});

export {
  signInRouter
};