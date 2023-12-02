export type ValidField =  { isValid: boolean, message: string };
export type ValidateStates = 'valid' | 'invalid';
export type ValidationTypes = 'string' | 'number';
export const defaultValidField: ValidField = { isValid: true, message: '' };

export type ValidationProperties = {
  minLength?: number;
  maxLength?: number;
  type?: ValidationTypes;
  required?: boolean;
}