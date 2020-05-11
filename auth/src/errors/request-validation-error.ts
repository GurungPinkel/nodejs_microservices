import { ValidationError } from 'express-validator';
import CustomError from './custom-error';

class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Request Validation Error');
    // Only because we are building a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors = () => {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  };
}

export default RequestValidationError;
