import { IObjectToXml } from '@/data/protocols/data-conversion';
import { PedidoModel } from '@/domain/models';
import { CreatePedido, ICreatePedido } from '@/domain/models/bling/http/create-pedido';
import { IHttpPostClient } from './client';
import env from '@/main/config/env';

export class BlingApi implements ICreatePedido {
  constructor(private readonly httpPostClient: IHttpPostClient, private readonly convertToXml: IObjectToXml) {}

  async create({ dealsData, apiKey }: CreatePedido.Input): Promise<CreatePedido.Output> {
    const pedidoObject: PedidoModel = {
      cliente: { nome: 'user', email: 'email' },
      itens: {
        item: [{ descricao: dealsData.title, qtde: 1, vlr_unit: dealsData.value, vlr_desconto: 0, codigo: '001' }],
      },
      parcelas: { parcela: [{ vlr: dealsData.value, data: dealsData.add_time.toString() }] },
      obs: dealsData.status,
    };

    const pedidoXml = this.convertToXml.convert({ pedidoObject });

    const result = await this.httpPostClient.post({
      url: 'https://bling.com.br/Api/v2/pedido/json/',
      params: { apikey: apiKey || env.blingApiKey, xml: pedidoXml },
    });

    return { pedido: result.retorno.pedidos[0] };
  }
}
