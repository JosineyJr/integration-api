import { IEmailValidator, IValidator } from '@/application/protocols';
import { IAddUser } from '@/domain/use-cases';
import { ok } from '../helpers';
import { ValidationBuilder } from '../validation/builder';
import { Controller } from './controller';

// eslint-disable-next-line import/export
export class SignUpController extends Controller {
  constructor(private readonly addUser: IAddUser, private readonly emailValidator: IEmailValidator) {
    super();
  }

  async perform({ email, name, password }: SignUpController.Request) {
    const user = await this.addUser.add({ email, name, password });

    return ok(user);
  }

  override buildValidators({
    email,
    password,
    name,
    passwordConfirmation,
  }: SignUpController.Request): Array<IValidator> {
    return [
      ...ValidationBuilder.of({ fieldName: 'email', value: email }).required().email(this.emailValidator).build(),
      ...ValidationBuilder.of({ fieldName: 'password', value: password })
        .required()
        .compareTo({ valueToCompare: passwordConfirmation, fieldToCompare: 'passwordConfirmation' })
        .build(),
      ...ValidationBuilder.of({ fieldName: 'passwordConfirmation', value: passwordConfirmation }).required().build(),
      ...ValidationBuilder.of({ fieldName: 'name', value: name }).required().build(),
    ];
  }
}

// eslint-disable-next-line import/export
export namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    roleId: number;
  };
}
