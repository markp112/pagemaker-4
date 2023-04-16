import { FirebaseError } from '@firebase/util';
import { logger } from '@logger/index';
import { DomainError, GenericError, InsufficientPermissions } from '.';

const errorMap = {
  'permission-denied': () => new InsufficientPermissions(),
};

function handleError(err: Error | FirebaseError): DomainError {
  if(isTypeOfFirebaseError(err)) {
    return handleFireBaseError(err);
  } else {
    logger.info(err.message);
    logger.info(err);
    return new GenericError(err.message);
  }
}

function handleFireBaseError(err: FirebaseError): DomainError {
  logger.info(err.code);
  return errorMap[err.code]();
} 

function isTypeOfFirebaseError(error: FirebaseError | Error): error is FirebaseError {
  return error instanceof FirebaseError;
}

export { handleError };