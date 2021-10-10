import { IGetAllPedidosRepository } from '@/data/protocols/database/pedido/get-all-pedidos.repository';
import { ok } from '../helpers';
import { HttpResponse } from '../protocols';
import { Controller } from './controller';

export class IntegratedController extends Controller {
  constructor(private readonly getAllPedidos: IGetAllPedidosRepository) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async perform(httpRequest: any): Promise<HttpResponse> {
    const pedidos = await this.getAllPedidos.getAll();

    return ok(pedidos);
  }
}
