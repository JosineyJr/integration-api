import { DbAddPedido } from '@/data/use-cases/db-add-pedido';
import { IAddPedido } from '@/domain/use-cases';
import { PedidoMongoRepository } from '@/infra/database';

export const makeDbAddPedido = (): IAddPedido => {
  const pedidoMongoRepository = new PedidoMongoRepository();
  return new DbAddPedido(pedidoMongoRepository);
};
