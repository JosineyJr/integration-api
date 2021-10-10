import { IEmailValidator, IValidator } from '@/application/protocols';
import { IAddUser } from '@/domain/use-cases';
import { created } from '../helpers';
import { ValidationBuilder } from '../validation/builder';
import { Controller } from './controller';

// eslint-disable-next-line import/export
export class SignUpController extends Controller {
  constructor(private readonly addUser: IAddUser, private readonly emailValidator: IEmailValidator) {
    super();
  }

  async perform({ email, name, password, roleId }: SignUpController.Request) {
    const user = await this.addUser.add({ email, name, password, roleId });

    return created(user);
  }

  override buildValidators({
    email,
    password,
    name,
    passwordConfirmation,
    roleId,
  }: SignUpController.Request): Array<IValidator> {
    return [
      ...ValidationBuilder.of({ fieldName: 'email', value: email }).required().email(this.emailValidator).build(),
      ...ValidationBuilder.of({ fieldName: 'password', value: password })
        .required()
        .compareTo({ valueToCompare: passwordConfirmation, fieldToCompare: 'passwordConfirmation' })
        .beOfType('string')
        .build(),
      ...ValidationBuilder.of({ fieldName: 'passwordConfirmation', value: passwordConfirmation })
        .required()
        .beOfType('string')
        .build(),
      ...ValidationBuilder.of({ fieldName: 'name', value: name }).required().beOfType('string').build(),
      ...ValidationBuilder.of({ fieldName: 'roleId', value: roleId }).required().beOfType('number').build(),
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
