import { IObjectToXml } from '@/data/protocols/data-conversion';
import { PedidoModel } from '@/domain/models';
import { CreatePedido, ICreatePedido } from '@/domain/models/bling/http/create-pedido';
import { IHttpGetClient, IHttpPostClient } from './client';
import env from '@/main/config/env';
import { GetAllPedidos, IGetAllPedidos } from '@/domain/models/bling/http/get-all-pedidos';
import { GetPedidoByNumero, IGetPedidoByNumero } from '@/domain/models/bling/http';

export class BlingApi implements ICreatePedido, IGetAllPedidos, IGetPedidoByNumero {
  constructor(
    private readonly httpPostClient: IHttpPostClient,
    private readonly convertToXml: IObjectToXml,
    private readonly httpGetClient: IHttpGetClient,
  ) {}

  async create({ dealsData, apiKey }: CreatePedido.Input): Promise<CreatePedido.Output> {
    const pedidoObject: PedidoModel = {
      cliente: { nome: 'user', email: 'email' },
      itens: {
        item: [{ descricao: dealsData.title, qtde: 1, vlr_unit: dealsData.value, vlr_desconto: 0, codigo: '001' }],
      },
      parcelas: { parcela: [{ vlr: dealsData.value, data: dealsData.add_time.toString() }] },
      obs: dealsData.status,
    } as PedidoModel;

    const pedidoXml = this.convertToXml.convert({ pedidoObject });

    const result = await this.httpPostClient.post({
      url: 'https://bling.com.br/Api/v2/pedido/json/',
      params: { apikey: apiKey || env.blingApiKey, xml: pedidoXml },
    });

    return { pedido: result.retorno.pedidos ? result.retorno.pedidos[0] : undefined };
  }

  async getAllPedidos({ apiKey }: GetAllPedidos.Input): Promise<GetAllPedidos.Output> {
    const result = await this.httpGetClient.get({ url: `https://bling.com.br/Api/v2/pedidos/json/?apikey=${apiKey}` });

    return { pedidos: result.retorno.pedidos };
  }

  async getPedidoByNumero({ numero, apiKey }: GetPedidoByNumero.Param): Promise<GetPedidoByNumero.Result> {
    const result = await this.httpGetClient.get({
      url: `https://bling.com.br/Api/v2/pedido/${numero}/json/?apikey=${apiKey}`,
    });

    return { pedido: result.retorno.pedidos[0].pedido };
  }
}
