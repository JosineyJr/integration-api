import { PedidoModel } from '../pedido';

export namespace GetPedidoByNumero {
  export type Param = { numero: string; apiKey: string };
  export type Result = { pedido: PedidoModel };
}

export interface IGetPedidoByNumero {
  getPedidoByNumero: (data: GetPedidoByNumero.Param) => Promise<GetPedidoByNumero.Result>;
}
