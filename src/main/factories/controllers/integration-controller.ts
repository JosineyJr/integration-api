import { Controller, IntegrationController } from '@/application/controllers';
import { BullJobsAdapter } from '@/infra/jobs';
import { makeLogControllerDecorator } from '../decorators';
import { makePipeDriveApi } from '../http';
import { makeBlingApi } from '../http/bling-api';

export const makeIntegrationController = (): Controller => {
  const pipeDriveApi = makePipeDriveApi();
  const blingApi = makeBlingApi();
  const pedidosBull = new BullJobsAdapter('pedidos');
  const controller = new IntegrationController(pipeDriveApi, pipeDriveApi, blingApi, blingApi, pedidosBull);

  return makeLogControllerDecorator(controller);
};
