import { Controller, SignUpController } from '@/application/controllers';
import { EmailValidatorAdapter } from '@/infra/validators';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';
import { makeDbAddUser } from '../use-cases/add-user-factory';

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddUser(), new EmailValidatorAdapter());

  return makeLogControllerDecorator(controller);
};
