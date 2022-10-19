import { DomainError } from './customErrors';

type errorOrDomainError = Error | DomainError;

function isTypeOfDomainError(instance: errorOrDomainError): instance is DomainError {
  if ((instance as DomainError).getResponse()) {
    return true;
  } else {
    return false;
  }
}

export { isTypeOfDomainError };