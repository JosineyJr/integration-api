import { HttpResponse, IController } from '@/application/protocols';
import { IAddUser } from '@/domain/use-cases';
import { ok } from '../helpers';

// eslint-disable-next-line import/export
export class SignUpController implements IController {
  constructor(private readonly addUser: IAddUser) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    const { email, password, name } = request;
    const user = await this.addUser.add({ email, name, password });

    return ok(user);
  }
}

// eslint-disable-next-line import/export
export namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}
