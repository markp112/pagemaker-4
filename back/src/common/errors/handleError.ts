import { FirebaseError } from '@firebase/util';
import { BadRequest, GenericError, InsufficientPermissions, InvalidArgument, ResourceNotFoundError, SiteExists } from '.';
import { Response } from '@api/types';
import { logger } from '@logger/pino';
import { AxiosError } from 'axios';
import { constructResponse } from '@common/functions/constructResponse';

const errorMap = {
  'permission-denied': () => new InsufficientPermissions(),
  'invalid-argument': () => new InvalidArgument(), 
  'generic': (err: Error) => new GenericError(err.message),
  'ERR_BAD_REQUEST': (err: Error) => new BadRequest(err.message),
  'Request failed with status code 409': () => new SiteExists(),
  'Request failed with status code 404': (err: Error) => new ResourceNotFoundError(err.message),
  'Request failed with status code 400': (err: Error) => new BadRequest(err.message),
};

function handleError(err: Error | FirebaseError | AxiosError): Response {
  logger.error(err);
  if (isTypeOfAxiosError(err)) {
    return handleAxiosError(err);
  }
  if(isTypeOfFirebaseError(err)) {
    return handleFireBaseError(err);
  } else {
    const error = errorMap.generic(err);
    return constructResponse<Error>(error, error._status); 
  }
}

function handleFireBaseError(err: FirebaseError): Response {
  const error = errorMap[err.code]();
  return constructResponse<Error>(error, error._status);
}

function handleAxiosError(err: AxiosError): Response {
  const error = errorMap[err.message]();
  return constructResponse<Error>(error, error._status);
}

function isTypeOfFirebaseError(error: FirebaseError | Error): error is FirebaseError {
  return 'code' in error; 
}

function isTypeOfAxiosError(error: AxiosError | Error): error is AxiosError {
  return 'config' in error;
}

export { handleError };
