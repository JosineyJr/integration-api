import { PedidoModel } from '../pedido';

export namespace GetAllPedidos {
  export type Input = { apiKey?: string };
  export type Output = { pedidos: Array<{ pedido: PedidoModel }> };
}

export interface IGetAllPedidos {
  getAllPedidos: (inputData: GetAllPedidos.Input) => Promise<GetAllPedidos.Output>;
}
