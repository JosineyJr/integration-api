/* eslint-disable no-restricted-syntax */
import { IValidator } from './validator';

export class ValidationComposite implements IValidator {
  constructor(private readonly validators: Array<IValidator>) {}

  validate(): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate();
      if (error !== undefined) return error;
    }
  }
}
