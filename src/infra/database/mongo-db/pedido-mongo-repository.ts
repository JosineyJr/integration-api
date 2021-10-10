import { IAddPedidoRepository } from '@/data/protocols';
import { PedidoModel } from '@/domain/models';
import { AddPedido } from '@/domain/use-cases';
import { MongoHelper } from './mongo-helper';

export class PedidoMongoRepository implements IAddPedidoRepository {
  async add(pedido: PedidoModel): Promise<AddPedido.Result> {
    const pedidosCollection = MongoHelper.getCollection('pedidos');
    const added = await pedidosCollection.insertOne(pedido);
    return !!added;
  }
}
