import { Controller } from '@/application/controllers';
import { LoginController } from '@/application/controllers/login-controller';
import { EmailValidatorAdapter } from '@/infra/validators';
import { makeLogControllerDecorator } from '../decorators';
import { makeDbAuthentication } from '../use-cases/authentication';

export const makeLoginController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter();
  const controller = new LoginController(makeDbAuthentication(), emailValidator);

  return makeLogControllerDecorator(controller);
};
