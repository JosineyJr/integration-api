import { Controller, IntegrationController } from '@/application/controllers';
import { makeLogControllerDecorator } from '../decorators';
import { makePipeDriveApi } from '../http';

export const makeIntegrationController = (): Controller => {
  const pipeDriveApi = makePipeDriveApi();
  const controller = new IntegrationController(pipeDriveApi, pipeDriveApi);

  return makeLogControllerDecorator(controller);
};
