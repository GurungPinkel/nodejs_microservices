import CustomError from './custom-error';

class DatabasaeRelatedError extends CustomError {
  statusCode = 500;
  reason = 'Error Connecting to database';

  constructor() {
    super('Database Related Error');

    // Only because we are building a built in class
    Object.setPrototypeOf(this, DatabasaeRelatedError.prototype);
  }

  serializeErrors = () => {
    return [
      {
        message: this.reason,
      },
    ];
  };
}
export default DatabasaeRelatedError;
