import { FirebaseError } from '@firebase/util';
import { DomainError, GenericError, InsufficientPermissions, InvalidArgument, NotFound } from '.';
import { logger } from '@logger/pino';

const FIREBASE_NOT_FOUND = '5';

const errorMap = {
  'permission-denied': () => new InsufficientPermissions(),
  'invalid-argument': () => new InvalidArgument(), 
  'generic': (err: Error) => new GenericError(err.message),
  '5': () => new NotFound(),
};

function handleError(err: Error | FirebaseError): DomainError {
  console.log('%c⧭', 'color: #cc0088', err);
  if(isTypeOfFirebaseError(err)) {
    throw handleFireBaseError(err);
  } else {
    logger.error(err);
    throw errorMap.generic(err); 
  }
}

function handleFireBaseError(err: FirebaseError): DomainError {
  console.log('%c⧭', 'color: #735656', err);
  throw errorMap[err.code]();
} 

function isTypeOfFirebaseError(error: FirebaseError | Error): error is FirebaseError {
  return 'code' in error; 
}

export { handleError };
