import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import User from '../models/user';
import BadRequestError from '../errors/bad-request-error';
import validateRequest from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';

const router = express.Router();

const signUpRouter = router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 charactes'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new BadRequestError('Email Already in Use'));
    }
    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { signUpRouter };
