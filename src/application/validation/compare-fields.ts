import { FieldsDoNotMatchError } from '../errors/validation';
import { IValidator } from './validator';

export class CompareFieldsValidation implements IValidator {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompare: string,
    private readonly value: any,
    private readonly valueToCompare: any,
  ) {}

  validate(): Error | undefined {
    if (this.value !== this.valueToCompare) return new FieldsDoNotMatchError(this.fieldName, this.fieldToCompare);
  }
}
