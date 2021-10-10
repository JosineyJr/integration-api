import { Controller, IntegrationController } from '@/application/controllers';
import { makeLogControllerDecorator } from '../decorators';
import { makePipeDriveApi } from '../http';
import { makeBlingApi } from '../http/bling-api';

export const makeIntegrationController = (): Controller => {
  const pipeDriveApi = makePipeDriveApi();
  const blingApi = makeBlingApi();
  const controller = new IntegrationController(pipeDriveApi, pipeDriveApi, blingApi);

  return makeLogControllerDecorator(controller);
};
