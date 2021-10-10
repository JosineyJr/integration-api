import { DealsModel } from '../../pipedrive';
import { PedidoModel } from '../pedido';

export namespace CreatePedido {
  export type Input = { dealsData: DealsModel, apiKey?: string };
  export type Output = { pedido: PedidoModel | undefined };
}

export interface ICreatePedido {
  create: (dealsData: CreatePedido.Input) => Promise<CreatePedido.Output>;
}
