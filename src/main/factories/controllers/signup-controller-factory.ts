import { SignUpController } from '@/application/controllers';
import { IController } from '@/application/protocols';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';
import { makeDbAddUser } from '../use-cases/add-user-factory';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(makeDbAddUser());

  return makeLogControllerDecorator(controller);
};
