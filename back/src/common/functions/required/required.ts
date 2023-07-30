import { RequiredParamIsMissingError } from '../../errors'

function required(stringToCheck: string, paramaterName: string) {
  if(stringToCheck === '' || stringToCheck === undefined || stringToCheck === null) {
    throw new RequiredParamIsMissingError(paramaterName);
  }
}

export { required };
