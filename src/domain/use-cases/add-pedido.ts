import { PedidoModel } from '../models';

export namespace AddPedido {
  export type Params = PedidoModel;
  export type Result = boolean;
}

export interface IAddPedido {
  add: (pedido: PedidoModel) => Promise<AddPedido.Result>;
}
