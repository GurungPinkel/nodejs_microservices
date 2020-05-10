import { Request, Response, NextFunction} from 'express';
import AuthorizationError from '../errors/authorization-error';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if(!req.currentUser) {
    throw new AuthorizationError("Not Authorized");
  }
  next();
}


export default requireAuth;