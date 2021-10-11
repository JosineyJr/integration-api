import { PedidoModel } from '@/domain/models';
import { AddPedido, IAddPedido } from '@/domain/use-cases';
import { IAddPedidoRepository } from '../protocols';

export class DbAddPedido implements IAddPedido {
  constructor(private addPedidoRepository: IAddPedidoRepository) {}

  async add(pedido: PedidoModel): Promise<AddPedido.Result> {
    const added = await this.addPedidoRepository.add(pedido);

    return !!added;
  }
}
