import { DealsModel } from '../../pipedrive';
import { PedidoModel } from '../pedido';

export namespace CreatePedido {
  export type Input = { dealsData: DealsModel; userName: string; email: string; apiKey?: string };
  export type Output = PedidoModel | undefined;
}

export interface ICreatePedido {
  create: (dealsData: CreatePedido.Input) => Promise<CreatePedido.Output>;
}
