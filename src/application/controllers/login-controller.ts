/* eslint-disable import/export */
import { IAuthentication } from '@/domain/use-cases';
import { ok, unauthorized } from '../helpers';
import { HttpResponse, IEmailValidator, IValidator } from '../protocols';
import { ValidationBuilder } from '../validation';
import { Controller } from './controller';

export class LoginController extends Controller {
  constructor(private readonly authentication: IAuthentication, private readonly emailValidator: IEmailValidator) {
    super();
  }

  async perform({ email, password }: LoginController.Request): Promise<HttpResponse> {
    const authenticate = await this.authentication.auth({ email, password });
    if (!authenticate) return unauthorized();

    return ok(authenticate);
  }

  override buildValidators({ email, password }: LoginController.Request): Array<IValidator> {
    return [
      ...ValidationBuilder.of({ fieldName: 'email', value: email }).required().email(this.emailValidator).build(),
      ...ValidationBuilder.of({ fieldName: 'password', value: password }).required().beOfType('string').build(),
    ];
  }
}

export namespace LoginController {
  export type Request = {
    email: string;
    password: string;
  };
}
