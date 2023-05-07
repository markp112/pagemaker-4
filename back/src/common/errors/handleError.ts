import { FirebaseError } from '@firebase/util';
import { DomainError, GenericError, InsufficientPermissions } from '.';

const errorMap = {
  'permission-denied': () => new InsufficientPermissions(),
  'generic': (err: Error) => new GenericError(err.message)
};

function handleError(err: Error | FirebaseError): DomainError {
  if(isTypeOfFirebaseError(err)) {
    throw handleFireBaseError(err);
  } else {
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
