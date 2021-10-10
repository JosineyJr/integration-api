import { Controller, IntegratedController } from '@/application/controllers';
import { PedidoMongoRepository } from '@/infra/database';
import { makeLogControllerDecorator } from '../decorators';

export const makeIntegratedController = (): Controller => {
  const pedidoMongoRepository = new PedidoMongoRepository();
  const controller = new IntegratedController(pedidoMongoRepository);

  return makeLogControllerDecorator(controller);
};
