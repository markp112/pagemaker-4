import { FirebaseError } from '@firebase/util';
import { DomainError, GenericError, InsufficientPermissions, InvalidArgument } from '.';
import { logger } from '@logger/pino';

const errorMap = {
  'permission-denied': () => new InsufficientPermissions(),
  'invalid-argument': () => new InvalidArgument(), 
  'generic': (err: Error) => new GenericError(err.message)
};

function handleError(err: Error | FirebaseError): DomainError {
  if(isTypeOfFirebaseError(err)) {
    throw handleFireBaseError(err);
  } else {
    logger.error(err);
    throw errorMap.generic(err); 
  }
}

function handleFireBaseError(err: FirebaseError): DomainError {
  throw errorMap[err.code]();
} 

function isTypeOfFirebaseError(error: FirebaseError | Error): error is FirebaseError {
  return 'code' in error; 
}

export { handleError };
