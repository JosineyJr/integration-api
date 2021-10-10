/* eslint-disable no-param-reassign */
import { IAddPedidoRepository } from '@/data/protocols';
import {
  GetAllPedidosRepository,
  IGetAllPedidosRepository,
} from '@/data/protocols/database/pedido/get-all-pedidos.repository';
import { PedidoModel } from '@/domain/models';
import { AddPedido } from '@/domain/use-cases';
import { QueryBuilder } from '.';
import { MongoHelper } from './mongo-helper';

export class PedidoMongoRepository implements IAddPedidoRepository, IGetAllPedidosRepository {
  async add(pedido: PedidoModel): Promise<AddPedido.Result> {
    pedido.totalvenda = parseFloat(pedido.totalvenda.toString());

    console.log(typeof pedido.totalvenda);

    const pedidosCollection = MongoHelper.getCollection('pedidos');
    const added = await pedidosCollection.insertOne(pedido);
    return !!added;
  }

  async getAll(): Promise<GetAllPedidosRepository.Output> {
    const pedidosCollection = MongoHelper.getCollection('pedidos');
    const query = new QueryBuilder()
      .group({
        _id: '$data',
        totalvenda: { $sum: '$totalvenda' },
      })
      .project({ _id: '$_id', data: '$_id', totalvenda: '$totalvenda' })
      .build();

    const pedidosResult = await pedidosCollection.aggregate(query).toArray();

    console.log(pedidosResult);

    return pedidosResult as Array<PedidoModel>;
  }
}
