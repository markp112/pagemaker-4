import { FirebaseError } from '@firebase/util';
import { BadRequest, DomainError, GenericError, InsufficientPermissions, InvalidArgument, SiteExists } from '.';
import { logger } from '@logger/pino';
import { Axios, AxiosError } from 'axios';

const errorMap = {
  'permission-denied': () => new InsufficientPermissions(),
  'invalid-argument': () => new InvalidArgument(), 
  'generic': (err: Error) => new GenericError(err.message),
  'ERR_BAD_REQUEST': (err: Error) => new BadRequest(err.message),
  'Request failed with status code 409': () => new SiteExists(),
};

function handleError(err: Error | FirebaseError | AxiosError): DomainError {
  if (isTypeOfAxiosError(err)) {
    throw handleAxiosError(err);
  }
  if(isTypeOfFirebaseError(err)) {
    throw handleFireBaseError(err);
  } else {
    logger.error(err);
    throw errorMap.generic(err); 
  }
}

function handleFireBaseError(err: FirebaseError): DomainError {
  console.log('%c⧭', 'color: #607339', err), 'error';
  logger.error(err.code);
  throw errorMap[err.code]();
}

function handleAxiosError(err: AxiosError): DomainError {
  console.log(err);
  throw errorMap[err.message]();
}

function isTypeOfFirebaseError(error: FirebaseError | Error): error is FirebaseError {
  return 'code' in error; 
}

function isTypeOfAxiosError(error: AxiosError | Error): error is AxiosError {
  return 'config' in error;
}

export { handleError };
