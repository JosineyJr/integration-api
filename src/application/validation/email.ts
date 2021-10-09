import { InvalidParamError } from '../errors/validation';
import { IEmailValidator, IValidator } from './validator';

export class EmailValidation implements IValidator {
  constructor(
    private readonly fieldName: string,
    private readonly email: string,
    private readonly emailValidator: IEmailValidator,
  ) {}

  validate(): Error | undefined {
    const isValid = this.emailValidator.isValid(this.email);
    if (!isValid) return new InvalidParamError(this.fieldName);
  }
}
