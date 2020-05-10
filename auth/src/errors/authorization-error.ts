import { CustomError } from './custom-error';

export class AuthorizationError extends CustomError {
  statusCode = 401;
  constructor (message: string) {
    super(message);
    // Only because we are building a built in class
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  serializeErrors = () => {
    return [
      { 
        message: this.message
      }
    ]
  }
}