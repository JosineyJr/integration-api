import { CompareFieldsValidation } from './compare-fields';
import { EmailValidation } from './email';
import { Required, RequiredString } from './required';
import { TypeValidation } from './type';
import { IEmailValidator, IValidator } from './validator';

type ExpectedTypes = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: Array<IValidator> = [],
  ) {}

  static of({ value, fieldName }: { value: any; fieldName: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName);
  }

  required(): ValidationBuilder {
    if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.fieldName));
    } else {
      this.validators.push(new Required(this.value, this.fieldName));
    }
    return this;
  }

  email(emailValidator: IEmailValidator): ValidationBuilder {
    this.validators.push(new EmailValidation(this.fieldName, this.value, emailValidator));

    return this;
  }

  compareTo({ valueToCompare, fieldToCompare }: { valueToCompare: any; fieldToCompare: string }): ValidationBuilder {
    this.validators.push(new CompareFieldsValidation(this.fieldName, fieldToCompare, this.value, valueToCompare));

    return this;
  }

  beOfType(expectedType: ExpectedTypes): ValidationBuilder {
    this.validators.push(new TypeValidation(this.value, expectedType, this.fieldName));

    return this;
  }

  build(): Array<IValidator> {
    return this.validators;
  }
}
