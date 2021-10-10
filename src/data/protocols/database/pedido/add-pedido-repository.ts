import { PedidoModel } from '@/domain/models';
import { AddPedido } from '@/domain/use-cases';

export interface IAddPedidoRepository {
  add: (pedido: PedidoModel) => Promise<AddPedido.Result>;
}
