import { IncorrectFieldTypeError } from '../errors/validation';
import { IValidator } from './validator';

export class TypeValidation implements IValidator {
  constructor(readonly value: any, readonly expectedType: string, readonly fieldName: string) {}

  validate(): Error | undefined {
    const fieldType = typeof this.value;
    if (fieldType !== 'undefined' && fieldType !== this.expectedType) {
      return new IncorrectFieldTypeError(fieldType, this.expectedType, this.fieldName);
    }
  }
}
