import { PedidoModel } from '@/domain/models';

export namespace GetAllPedidosRepository {
  export type Output = Array<PedidoModel>;
}

export interface IGetAllPedidosRepository {
  getAll: () => Promise<GetAllPedidosRepository.Output>;
}
