import validator from 'validator';
import { IEmailValidator } from '@/application/protocols';

export class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
