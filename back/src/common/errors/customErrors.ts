import type { Response } from '../../api/types';
import { logger } from '../../logger';

class DomainError extends Error {
  _status: number;

  constructor(message: string, status: number) {
    super(message);
    this._status = status;
    Error.captureStackTrace(this, this.constructor);
    logger.error(message);
  }

  getResponse(): Response {
    const response: Response = {
      data: this.stack,
      status: this._status,
      err: {msg: this.message, systemErr: this.name }
    };
    return response;
  }
}

class ResourceNotFoundError extends DomainError {
  constructor(resource: string, status: string) {
    super(`Resource ${resource} was not found`, 404);
  }
}

class GenericError extends DomainError {
  constructor(error: string) {
    super(error, 500);
  }
};

export { ResourceNotFoundError, GenericError };
