import { httpStatusCodes } from '../../api/httpStatusCodes/index';
import type { Response } from '../../api/types';
import { logger } from '../../logger';

class DomainError extends Error {
  _status: number;
  
  constructor(message: string, status: number, name = 'Custom error') {
    super(message);
    this.name = name;
    this._status = status;
    Error.captureStackTrace(this, DomainError);
    logger.error({ Error: this.getResponse() })
  }

  getResponse(): Response {
    const response: Response = {
      data: this.stack,
      status: this._status,
      err: { msg: this.message, systemErr: this.name },
    };
    return response;
  }
}

class ResourceNotFoundError extends DomainError {
  constructor(resource: string) {
    super(`Resource ${resource} was not found`, httpStatusCodes.RESOURCE_NOT_FOUND, 'Not Found');
  }
};

class InsufficientPermissions extends DomainError {
  constructor() {
    super('Insufficent Permissions: there was an issue accessing the requested resource', httpStatusCodes.FORBIDDEN, 'Not Authorised');
  }
};

class InvalidArgument extends DomainError {
  constructor() {
    super('invalid argument passed to method', httpStatusCodes.INTERNAL_SERVER_ERROR, 'Server Error');
  }
}

class NotFound extends DomainError {
  constructor() {
    super('Firebase no matching record found', httpStatusCodes.INTERNAL_SERVER_ERROR, 'Server Error');
  }
}

class GenericError extends DomainError {
  constructor(error: string) {
    super(error, httpStatusCodes.INTERNAL_SERVER_ERROR, 'Generic');
  }
};

export { DomainError,
  ResourceNotFoundError,
  InsufficientPermissions,
  GenericError,
  InvalidArgument, 
  NotFound,
};
