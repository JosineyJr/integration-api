import { Controller, IntegrationController } from '@/application/controllers';
import { makeLogControllerDecorator } from '../decorators';
import { makePipeDriveApi } from '../http';
import { makeBlingApi } from '../http/bling-api';
import { makeDbAddPedido } from '../use-cases/add-pedido-repository';

export const makeIntegrationController = (): Controller => {
  const pipeDriveApi = makePipeDriveApi();
  const blingApi = makeBlingApi();
  const controller = new IntegrationController(pipeDriveApi, pipeDriveApi, blingApi, makeDbAddPedido(), blingApi);

  return makeLogControllerDecorator(controller);
};
