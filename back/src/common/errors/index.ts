import { httpStatusCodes } from '../../api/httpStatusCodes/index';
import type { Response } from '../../api/types';
import { logger } from '../../logger';

class DomainError extends Error {
  _status: number;

  constructor(message: string, status: number) {
    super(message);
    this._status = status;
    Error.captureStackTrace(this, this.constructor);
    logger.info(message);
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
  constructor(resource: string) {
    super(`Resource ${resource} was not found`, httpStatusCodes.RESOURCE_NOT_FOUND);
  }
};

class InsufficientPermissions extends DomainError {
  constructor() {
    super('Insufficent Permissions: there was an issue accessing the requested resource', httpStatusCodes.FORBIDDEN)
  }
}

class GenericError extends DomainError {
  constructor(error: string) {
    super(error, httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {DomainError, ResourceNotFoundError, InsufficientPermissions, GenericError };
