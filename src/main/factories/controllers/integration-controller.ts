import { Controller, IntegrationController } from '@/application/controllers';
import { BullJobsAdapter } from '@/infra/jobs';
import { makeLogControllerDecorator } from '../decorators';
import { makePipeDriveApi } from '../http';
import { makeBlingApi } from '../http/bling-api';
import { makeDbAddPedido } from '../use-cases/add-pedido-repository';

export const makeIntegrationController = (): Controller => {
  const pipeDriveApi = makePipeDriveApi();
  const blingApi = makeBlingApi();
  const pedidosBull = new BullJobsAdapter('pedidos');
  const controller = new IntegrationController(
    pipeDriveApi,
    pipeDriveApi,
    blingApi,
    makeDbAddPedido(),
    blingApi,
    pedidosBull,
  );

  return makeLogControllerDecorator(controller);
};
